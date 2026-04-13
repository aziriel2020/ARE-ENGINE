/**
 * POST /api/generate
 * Start blueprint generation — returns SSE stream.
 */

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/api/auth';
import { checkRateLimit } from '@/lib/api/rate-limit';
import { canGenerate, incrementGenerationCount } from '@/lib/api/plan-gate';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { runPipeline } from '@/lib/engine/generator';
import { MOCK_DNA_JCAY } from '@/lib/mocks/mock-dna';
import { MOCK_BLUEPRINT_1 } from '@/lib/mocks/mock-blueprint';
import type { StreamChunk } from '@/lib/schemas/blueprint';
import { GenerateRequestSchema } from '@/lib/schemas/api';
import { logError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  const rl = await checkRateLimit(authCtx.userId, authCtx.plan, 'generate');
  if (!rl.allowed) return ERR.rateLimited();

  // Parse body
  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = GenerateRequestSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { prompt, dnaProfileId } = parsed.data;

  // Plan gate
  const limitErr = await canGenerate(authCtx.userId, authCtx.plan);
  if (limitErr) return ERR.planLimit(limitErr);

  // Resolve DNA profile
  let dna = MOCK_DNA_JCAY;
  if (!IS_TEST_MODE && dnaProfileId) {
    const profile = await prisma.vocalDNAProfile.findFirst({
      where: { id: dnaProfileId, userId: authCtx.userId },
    });
    if (!profile) return ERR.notFound('DNA profile');
    try { dna = JSON.parse(JSON.stringify(profile.dna)) as typeof dna; }
    catch { return ERR.serverError('Invalid DNA profile data'); }
  }

  // Create blueprint record
  const blueprintId = IS_TEST_MODE
    ? MOCK_BLUEPRINT_1.id
    : (await prisma.blueprint.create({
        data: {
          userId: authCtx.userId,
          dnaProfileId: dnaProfileId ?? null,
          title: prompt.slice(0, 80),
          userPrompt: prompt,
          intent: {},
          content: '',
          modelUsed: 'pending',
          status: 'GENERATING',
        },
      }).then((b) => b.id));

  void auditLog(authCtx.userId, 'blueprint.generation_started', request, { blueprintId, prompt: prompt.slice(0, 100) });

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (chunk: StreamChunk) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
      };

      try {
        const result = await runPipeline(
          { userId: authCtx.userId, blueprintId: String(blueprintId), dnaProfileId, dna, userPrompt: prompt },
          send
        );

        // Persist result
        if (!IS_TEST_MODE) {
          await prisma.blueprint.update({
            where: { id: String(blueprintId) },
            data: {
              title: result.intent.theme.slice(0, 80),
              intent: result.intent as object,
              content: result.content,
              productionNotes: result.productionNotes,
              sunoPrompt: result.sunoPrompt,
              status: 'COMPLETE',
              grade: result.qualityReport.grade,
              qualityReport: result.qualityReport as object,
              modelUsed: result.modelUsed,
              inputTokens: result.inputTokens,
              outputTokens: result.outputTokens,
              cachedTokens: result.cachedTokens,
              totalCostUsd: result.totalCostUsd,
              regenerationCount: result.regenerationCount,
            },
          });
          await incrementGenerationCount(authCtx.userId, authCtx.plan);
        }

        send({ section: 'complete', content: JSON.stringify({ blueprintId, grade: result.qualityReport.grade }) });
        void auditLog(authCtx.userId, 'blueprint.generation_completed', request, { blueprintId, grade: result.qualityReport.grade });
      } catch (err) {
        logError('generate: pipeline error', { userId: authCtx.userId, metadata: { error: String(err) } });
        send({ section: 'error', content: 'Generation failed. Please try again.' });
        if (!IS_TEST_MODE) {
          await prisma.blueprint.update({
            where: { id: String(blueprintId) },
            data: { status: 'FAILED' },
          }).catch(() => {/* non-critical */});
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type':  'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection':    'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  });
}
