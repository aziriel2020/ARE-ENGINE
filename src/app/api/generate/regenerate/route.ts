/**
 * POST /api/generate/regenerate
 * Re-generate failed sections of an existing blueprint.
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { checkRateLimit } from '@/lib/api/rate-limit';
import { ERR } from '@/lib/api/errors';
import { auditLog } from '@/lib/api/audit';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { scoreBlueprint } from '@/lib/engine/quality-scorer';
import { MOCK_BLUEPRINT_1 } from '@/lib/mocks/mock-blueprint';
import { MOCK_DNA_JCAY } from '@/lib/mocks/mock-dna';
import { RegenerateRequestSchema } from '@/lib/schemas/api';
import { buildSectionRegenerationPrompt } from '@/lib/prompts/section-regeneration';
import { MODELS } from '@/lib/engine/ai-router';
import { logError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  const rl = await checkRateLimit(authCtx.userId, authCtx.plan, 'regenerate');
  if (!rl.allowed) return ERR.rateLimited();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = RegenerateRequestSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { blueprintId, failedLawIds } = parsed.data;

  if (IS_TEST_MODE) {
    return NextResponse.json({ blueprintId, qualityReport: MOCK_BLUEPRINT_1.qualityReport });
  }

  const blueprint = await prisma.blueprint.findFirst({
    where: { id: blueprintId, userId: authCtx.userId },
    include: { dnaProfile: true },
  });

  if (!blueprint) return ERR.notFound('Blueprint');
  if (blueprint.regenerationCount >= 2) {
    return ERR.badRequest('Maximum re-generation cycles reached (2). Accept or discard this blueprint.');
  }

  const dna = blueprint.dnaProfile
    ? (JSON.parse(JSON.stringify(blueprint.dnaProfile.dna)) as typeof MOCK_DNA_JCAY)
    : MOCK_DNA_JCAY;

  const failedLaws = ((blueprint.qualityReport as { laws?: { lawId: number; score: number; passed: boolean; reasoning: string; lawName: string; failedExcerpt?: string }[] }) ?.laws ?? []).filter((l) => failedLawIds.includes(l.lawId));

  try {
    await prisma.blueprint.update({ where: { id: blueprintId }, data: { status: 'REGENERATING' } });

    const prompt = buildSectionRegenerationPrompt({
      originalBlueprint: blueprint.content,
      failedLaws,
      dna,
      regenerationCycle: blueprint.regenerationCount + 1,
    });

    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    const response = await ai.models.generateContent({
      model: MODELS.fast.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { maxOutputTokens: 8192, temperature: 0.75 },
    });

    const revisedContent = response.text ?? blueprint.content;
    const report = await scoreBlueprint(blueprintId, revisedContent, dna);

    await prisma.blueprint.update({
      where: { id: blueprintId },
      data: {
        content: revisedContent,
        qualityReport: report as object,
        grade: report.grade,
        regenerationCount: { increment: 1 },
        status: 'COMPLETE',
      },
    });

    void auditLog(authCtx.userId, 'blueprint.regenerated', request, { blueprintId, grade: report.grade });
    return NextResponse.json({ blueprintId, qualityReport: report, content: revisedContent });
  } catch (err) {
    logError('regenerate: failed', { userId: authCtx.userId, metadata: { blueprintId, error: String(err) } });
    await prisma.blueprint.update({ where: { id: blueprintId }, data: { status: 'FAILED' } }).catch(() => {/* non-critical */});
    return ERR.serverError('Re-generation failed');
  }
}
