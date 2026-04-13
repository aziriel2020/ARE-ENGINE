/**
 * GET  /api/dna — list DNA profiles
 * POST /api/dna — create DNA profile (AI extraction from samples)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/api/auth';
import { checkRateLimit } from '@/lib/api/rate-limit';
import { canCreateDNAProfile } from '@/lib/api/plan-gate';
import { auditLog } from '@/lib/api/audit';
import { ERR } from '@/lib/api/errors';
import { IS_TEST_MODE } from '@/lib/config/env';
import { prisma } from '@/lib/db';
import { MOCK_DNA_JCAY, MOCK_DNA_DEFAULT, MOCK_DNA_PROFILES } from '@/lib/mocks/mock-dna';
import { CreateDNAProfileSchema } from '@/lib/schemas/api';
import { buildDNAExtractionPrompt, buildDNACorrectionPrompt, parseDNAOutput } from '@/lib/prompts/dna-extraction';
import { MODELS } from '@/lib/engine/ai-router';
import { invalidateCacheEntry } from '@/lib/engine/context-cache';
import { logError } from '@/lib/logger';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  if (IS_TEST_MODE) {
    return NextResponse.json({ data: MOCK_DNA_PROFILES, total: MOCK_DNA_PROFILES.length });
  }

  const profiles = await prisma.vocalDNAProfile.findMany({
    where: { userId: authCtx.userId },
    orderBy: { updatedAt: 'desc' },
    select: { id: true, name: true, version: true, isDefault: true, createdAt: true, updatedAt: true },
  });

  return NextResponse.json({ data: profiles, total: profiles.length });
}

export async function POST(request: NextRequest) {
  const authCtx = await requireAuth(request);
  if (!authCtx) return ERR.unauthorized();

  const rl = await checkRateLimit(authCtx.userId, authCtx.plan, 'dna');
  if (!rl.allowed) return ERR.rateLimited();

  let body: unknown;
  try { body = await request.json(); }
  catch { return ERR.badRequest('Invalid JSON body'); }

  const parsed = CreateDNAProfileSchema.safeParse(body);
  if (!parsed.success) return ERR.zodError(parsed.error.issues);

  const { name, lyricsSamples, styleDescription, isDefault } = parsed.data;

  const limitErr = await canCreateDNAProfile(authCtx.userId, authCtx.plan);
  if (limitErr) return ERR.planLimit(limitErr);

  if (IS_TEST_MODE) {
    return NextResponse.json({ id: 'dna_mock_001', name, dna: MOCK_DNA_JCAY, version: 1 }, { status: 201 });
  }

  if (!lyricsSamples?.length && !styleDescription) {
    return ERR.badRequest('Provide at least one lyrics sample or a style description');
  }

  // Extract DNA via AI (2-pass)
  let dna = MOCK_DNA_DEFAULT;
  try {
    const prompt = buildDNAExtractionPrompt({ artistName: name, lyricsSamples, styleDescription });
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: MODELS.flagship.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { maxOutputTokens: 2048, temperature: 0.3 },
    });

    let rawOutput = response.text ?? '{}';
    let { dna: extracted, errors } = await parseDNAOutput(rawOutput);

    // Pass 2 — correction
    if (errors && !extracted) {
      const correctionPrompt = buildDNACorrectionPrompt(rawOutput, errors);
      const correctionResponse = await ai.models.generateContent({
        model: MODELS.flagship.model,
        contents: [{ role: 'user', parts: [{ text: correctionPrompt }] }],
        config: { maxOutputTokens: 2048, temperature: 0.1 },
      });
      rawOutput = correctionResponse.text ?? rawOutput;
      const result2 = await parseDNAOutput(rawOutput);
      if (result2.dna) extracted = result2.dna;
    }

    if (extracted) dna = extracted;
  } catch (err) {
    logError('dna: extraction failed', { userId: authCtx.userId, metadata: { error: String(err) } });
    // Continue with default DNA
  }

  if (isDefault) {
    await prisma.vocalDNAProfile.updateMany({
      where: { userId: authCtx.userId, isDefault: true },
      data: { isDefault: false },
    });
  }

  const profile = await prisma.vocalDNAProfile.create({
    data: { userId: authCtx.userId, name, dna: dna as object, isDefault: isDefault ?? false },
  });

  void auditLog(authCtx.userId, 'dna.created', request, { profileId: profile.id });
  return NextResponse.json(profile, { status: 201 });
}
