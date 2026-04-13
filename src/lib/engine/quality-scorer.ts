/**
 * 28-Law Quality Scoring Engine
 *
 * Takes a generated blueprint (text) + source VocalDNA and evaluates it
 * against all 28 laws. Each law returns a 0-100 score and pass/fail.
 *
 * Scoring model: Gemini 2.5 Flash (cheaper, simpler classification task)
 * In TEST_MODE: returns a mock QualityReport with realistic scores.
 */

import { IS_TEST_MODE } from '@/lib/config/env';
import {
  LAWS,
  calcAggregateScore,
  scoreToGrade,
} from '@/lib/constants/laws';
import type { LawScore, QualityReport } from '@/lib/schemas/blueprint';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';
import { MODELS } from './ai-router';
import { logError, logInfo } from '@/lib/logger';
import { buildQualityScoringPrompt } from '@/lib/prompts/quality-scoring';

const PASS_THRESHOLD = 60;

/**
 * Score a blueprint against all 28 laws.
 */
export async function scoreBlueprint(
  blueprintId: string,
  blueprintText: string,
  dna: VocalDNA
): Promise<QualityReport> {
  if (IS_TEST_MODE) {
    return buildMockQualityReport(blueprintId);
  }

  const prompt = buildQualityScoringPrompt(blueprintText, dna);

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: MODELS.fast.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        maxOutputTokens: 4096,
        temperature: 0.1, // low temp for consistent scoring
      },
    });

    const rawJson = response.text ?? '{}';
    const parsed = JSON.parse(rawJson) as { laws: Array<{ id: number; score: number; reasoning: string; failedExcerpt?: string }> };

    const laws: LawScore[] = parsed.laws.map((item) => {
      const law = LAWS.find((l) => l.id === item.id);
      return {
        lawId: item.id,
        lawName: law?.name ?? `Law ${item.id}`,
        score: Math.max(0, Math.min(100, item.score)),
        passed: item.score >= PASS_THRESHOLD,
        reasoning: item.reasoning ?? '',
        failedExcerpt: item.failedExcerpt,
      };
    });

    return buildReport(blueprintId, laws);
  } catch (err) {
    logError('quality-scorer: scoring failed', {
      metadata: { blueprintId, error: String(err) },
    });
    // Graceful degradation: return neutral report so generation isn't blocked
    return buildMockQualityReport(blueprintId, 70);
  }
}

/**
 * Re-score only the failed laws (cheaper targeted pass).
 */
export async function rescore(
  blueprintId: string,
  updatedText: string,
  dna: VocalDNA,
  failedLawIds: number[]
): Promise<LawScore[]> {
  if (IS_TEST_MODE) {
    return failedLawIds.map((id) => {
      const law = LAWS.find((l) => l.id === id)!;
      return {
        lawId: id,
        lawName: law.name,
        score: 75,
        passed: true,
        reasoning: 'Mock re-score: section revised successfully.',
      };
    });
  }

  // Only ask the model to score the specific failed laws
  const targetLaws = LAWS.filter((l) => failedLawIds.includes(l.id));
  const prompt = buildQualityScoringPrompt(updatedText, dna, targetLaws.map((l) => l.id));

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: MODELS.fast.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        maxOutputTokens: 2048,
        temperature: 0.1,
      },
    });

    const rawJson = response.text ?? '{}';
    const parsed = JSON.parse(rawJson) as { laws: Array<{ id: number; score: number; reasoning: string; failedExcerpt?: string }> };

    return parsed.laws.map((item) => {
      const law = LAWS.find((l) => l.id === item.id);
      return {
        lawId: item.id,
        lawName: law?.name ?? `Law ${item.id}`,
        score: Math.max(0, Math.min(100, item.score)),
        passed: item.score >= PASS_THRESHOLD,
        reasoning: item.reasoning ?? '',
        failedExcerpt: item.failedExcerpt,
      };
    });
  } catch (err) {
    logError('quality-scorer: rescore failed', {
      metadata: { blueprintId, error: String(err) },
    });
    return [];
  }
}

// ── Internal helpers ──────────────────────────────────────────────────────────

function buildReport(blueprintId: string, laws: LawScore[]): QualityReport {
  const aggregateScore = calcAggregateScore(
    laws.map((l) => ({ lawId: l.lawId, score: l.score }))
  );
  const passedLaws = laws.filter((l) => l.passed).length;
  const failedLaws = laws.filter((l) => !l.passed).length;

  logInfo('quality-scorer: report built', {
    metadata: { blueprintId, aggregateScore, passedLaws, failedLaws },
  });

  return {
    blueprintId,
    aggregateScore,
    passedLaws,
    failedLaws,
    grade: scoreToGrade(aggregateScore),
    laws,
    regenerationTargets: laws
      .filter((l) => !l.passed)
      .map((l) => l.lawId),
  };
}

/** Deterministic mock report for TEST_MODE */
function buildMockQualityReport(
  blueprintId: string,
  baseScore = 82
): QualityReport {
  const laws: LawScore[] = LAWS.map((law) => {
    // Sprinkle some variance so the report looks real
    const variance = ((law.id * 7) % 20) - 10; // -10..+10
    const score = Math.max(0, Math.min(100, baseScore + variance));
    return {
      lawId: law.id,
      lawName: law.name,
      score,
      passed: score >= PASS_THRESHOLD,
      reasoning:
        score >= PASS_THRESHOLD
          ? `Blueprint satisfies ${law.name} with clear alignment to DNA parameters.`
          : `${law.name} needs improvement — specific section diverges from DNA profile.`,
      failedExcerpt:
        score < PASS_THRESHOLD
          ? '...excerpt from the problematic section...'
          : undefined,
    };
  });

  return buildReport(blueprintId, laws);
}
