/**
 * 4-Stage Blueprint Generation Pipeline
 *
 * Stage 1: Intent Decomposition  (fast model)
 * Stage 2: Blueprint Generation  (flagship + context cache, SSE streamed)
 * Stage 3: Quality Scoring       (fast model)
 * Stage 4: Targeted Re-generation (fast model, max 2 cycles, if grade < B)
 *
 * In TEST_MODE every external call is replaced with mock data + realistic delays.
 */

import { IS_TEST_MODE } from '@/lib/config/env';
import { logError, logInfo } from '@/lib/logger';
import { MODELS, calcCostUsd, getFallbackModel } from './ai-router';
import { createOrGetContextCache } from './context-cache';
import { scoreBlueprint, rescore } from './quality-scorer';
import {
  buildIntentDecompositionPrompt,
  buildBlueprintGenerationPrompt,
  BLUEPRINT_SYSTEM_PROMPT,
  getKnowledgeBase,
} from '@/lib/prompts/blueprint-generation';
import { buildSectionRegenerationPrompt } from '@/lib/prompts/section-regeneration';
import {
  MOCK_BLUEPRINT_STREAM,
  MOCK_INTENT,
  MOCK_FULL_BLUEPRINT,
} from '@/lib/mocks/mock-streaming';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';
import type { DecomposedIntent, QualityReport, StreamChunk } from '@/lib/schemas/blueprint';

export interface GenerationContext {
  userId: string;
  blueprintId: string;
  dnaProfileId?: string;
  dna: VocalDNA;
  userPrompt: string;
  modelTier?: 'flagship' | 'fast';
}

export interface GenerationResult {
  intent: DecomposedIntent;
  content: string;
  productionNotes: string;
  sunoPrompt: string;
  qualityReport: QualityReport;
  modelUsed: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  totalCostUsd: number;
  regenerationCount: number;
}

type StreamCallback = (chunk: StreamChunk) => void;

// ── Stage 1: Intent Decomposition ─────────────────────────────────────────────

export async function decomposeIntent(
  userPrompt: string,
  dna: VocalDNA
): Promise<DecomposedIntent> {
  if (IS_TEST_MODE) {
    await delay(300);
    return MOCK_INTENT;
  }

  const prompt = buildIntentDecompositionPrompt(userPrompt, dna);

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: MODELS.fast.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        responseMimeType: 'application/json',
        maxOutputTokens: 1024,
        temperature: 0.3,
      },
    });

    const raw = response.text ?? '{}';
    const parsed = JSON.parse(raw) as DecomposedIntent;
    return parsed;
  } catch (err) {
    logError('generator: intent decomposition failed', {
      metadata: { error: String(err) },
    });
    return MOCK_INTENT;
  }
}

// ── Stage 2: Blueprint Generation (streaming) ─────────────────────────────────

export async function generateBlueprintStream(
  intent: DecomposedIntent,
  ctx: GenerationContext,
  onChunk: StreamCallback
): Promise<{ content: string; inputTokens: number; outputTokens: number; cachedTokens: number; modelUsed: string }> {
  if (IS_TEST_MODE) {
    return streamMockBlueprint(onChunk);
  }

  const knowledgeBase = getKnowledgeBase();
  const dnaJson = JSON.stringify(ctx.dna);

  // Try to get/create a context cache for this persona
  const cacheName = ctx.dnaProfileId
    ? await createOrGetContextCache(
        knowledgeBase,
        dnaJson,
        BLUEPRINT_SYSTEM_PROMPT,
        ctx.userId,
        ctx.dnaProfileId
      )
    : null;

  const userTurnPrompt = buildBlueprintGenerationPrompt(intent, ctx.dna);
  const modelConfig = ctx.modelTier ? MODELS[ctx.modelTier] : MODELS.flagship;

  try {
    return await streamFromGemini(userTurnPrompt, modelConfig.model, cacheName, onChunk);
  } catch (err: unknown) {
    const statusCode = (err as { status?: number }).status ?? 500;
    const fallback = getFallbackModel(modelConfig.tier);

    if (fallback) {
      logError('generator: flagship failed, falling back to Claude', {
        metadata: { statusCode, error: String(err) },
      });
      return await streamFromClaude(userTurnPrompt, onChunk);
    }

    throw err;
  }
}

async function streamFromGemini(
  prompt: string,
  model: string,
  cacheName: string | null,
  onChunk: StreamCallback
): Promise<{ content: string; inputTokens: number; outputTokens: number; cachedTokens: number; modelUsed: string }> {
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

  const config: Record<string, unknown> = {
    maxOutputTokens: 8192,
    temperature: 0.85,
  };

  if (cacheName) {
    config['cachedContent'] = cacheName;
  }

  const streamResult = await ai.models.generateContentStream({
    model,
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    config,
  });

  let fullContent = '';
  let inputTokens = 0;
  let outputTokens = 0;
  let cachedTokens = 0;
  let currentSection = 'verse_1';

  for await (const chunk of streamResult) {
    const text = chunk.text ?? '';
    fullContent += text;

    // Parse section headers and emit typed chunks
    const detectedSection = detectSection(fullContent);
    if (detectedSection !== currentSection) {
      currentSection = detectedSection;
    }

    onChunk({ section: currentSection as StreamChunk['section'], content: text });

    // Accumulate token counts from the last chunk's usage metadata
    if (chunk.usageMetadata) {
      inputTokens = chunk.usageMetadata.promptTokenCount ?? inputTokens;
      outputTokens = chunk.usageMetadata.candidatesTokenCount ?? outputTokens;
      cachedTokens = chunk.usageMetadata.cachedContentTokenCount ?? cachedTokens;
    }
  }

  return { content: fullContent, inputTokens, outputTokens, cachedTokens, modelUsed: model };
}

async function streamFromClaude(
  prompt: string,
  onChunk: StreamCallback
): Promise<{ content: string; inputTokens: number; outputTokens: number; cachedTokens: number; modelUsed: string }> {
  const Anthropic = (await import('@anthropic-ai/sdk')).default;
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  const stream = await client.messages.stream({
    model: MODELS.fallback.model,
    max_tokens: 8192,
    system: BLUEPRINT_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: prompt }],
  });

  let fullContent = '';
  let currentSection: StreamChunk['section'] = 'verse_1';

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      const text = chunk.delta.text;
      fullContent += text;
      const detectedSection = detectSection(fullContent);
      if (detectedSection !== currentSection) {
        currentSection = detectedSection as StreamChunk['section'];
      }
      onChunk({ section: currentSection, content: text });
    }
  }

  const finalMsg = await stream.finalMessage();
  return {
    content: fullContent,
    inputTokens: finalMsg.usage.input_tokens,
    outputTokens: finalMsg.usage.output_tokens,
    cachedTokens: 0,
    modelUsed: MODELS.fallback.model,
  };
}

// ── Stage 3 + 4: Score → Re-generate ─────────────────────────────────────────

const MAX_REGENERATION_CYCLES = 2;

export async function runPipeline(
  ctx: GenerationContext,
  onChunk: StreamCallback
): Promise<GenerationResult> {
  logInfo('generator: pipeline start', {
    userId: ctx.userId,
    metadata: { blueprintId: ctx.blueprintId },
  });

  // Stage 1
  onChunk({ section: 'verse_1', content: '' }); // signal start
  const intent = await decomposeIntent(ctx.userPrompt, ctx.dna);

  // Stage 2
  const {
    content: rawContent,
    inputTokens,
    outputTokens,
    cachedTokens,
    modelUsed,
  } = await generateBlueprintStream(intent, ctx, onChunk);

  const { content, productionNotes, sunoPrompt } = parseBlueprintSections(rawContent);

  // Stage 3
  let qualityReport = await scoreBlueprint(ctx.blueprintId, content, ctx.dna);
  let finalContent = rawContent;
  let regenerationCount = 0;

  // Stage 4 — re-generate if grade < B (score < 70)
  while (
    qualityReport.grade !== 'S' &&
    qualityReport.grade !== 'A' &&
    qualityReport.grade !== 'B' &&
    regenerationCount < MAX_REGENERATION_CYCLES
  ) {
    regenerationCount++;
    logInfo('generator: triggering re-generation', {
      userId: ctx.userId,
      metadata: {
        cycle: regenerationCount,
        grade: qualityReport.grade,
        failedLaws: qualityReport.failedLaws,
      },
    });

    const failedLaws = qualityReport.laws.filter((l) => !l.passed);
    const revisedContent = await regenerateSections(
      finalContent,
      failedLaws,
      ctx.dna,
      regenerationCount
    );

    finalContent = revisedContent;

    // Re-score only the failed laws
    const rescored = await rescore(
      ctx.blueprintId,
      revisedContent,
      ctx.dna,
      failedLaws.map((l) => l.lawId)
    );

    // Merge rescored laws back into the report
    qualityReport = mergeLawScores(qualityReport, rescored);
  }

  const modelConfig =
    Object.values(MODELS).find((m) => m.model === modelUsed) ?? MODELS.flagship;
  const totalCostUsd = calcCostUsd(modelConfig, inputTokens, outputTokens, cachedTokens);

  logInfo('generator: pipeline complete', {
    userId: ctx.userId,
    metadata: {
      blueprintId: ctx.blueprintId,
      grade: qualityReport.grade,
      regenerationCount,
      totalCostUsd,
    },
  });

  return {
    intent,
    content: finalContent,
    productionNotes,
    sunoPrompt,
    qualityReport,
    modelUsed,
    inputTokens,
    outputTokens,
    cachedTokens,
    totalCostUsd,
    regenerationCount,
  };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

async function regenerateSections(
  originalBlueprint: string,
  failedLaws: import('@/lib/schemas/blueprint').LawScore[],
  dna: VocalDNA,
  cycle: number
): Promise<string> {
  if (IS_TEST_MODE) {
    await delay(500);
    return originalBlueprint; // Mock: return same content (will pass on rescore)
  }

  const prompt = buildSectionRegenerationPrompt({
    originalBlueprint,
    failedLaws,
    dna,
    regenerationCycle: cycle,
  });

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const response = await ai.models.generateContent({
      model: MODELS.fast.model,
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: { maxOutputTokens: 8192, temperature: 0.75 },
    });

    return response.text ?? originalBlueprint;
  } catch (err) {
    logError('generator: section regeneration failed', {
      metadata: { cycle, error: String(err) },
    });
    return originalBlueprint;
  }
}

function mergeLawScores(
  report: QualityReport,
  rescored: import('@/lib/schemas/blueprint').LawScore[]
): QualityReport {
  const { calcAggregateScore, scoreToGrade } = require('@/lib/constants/laws') as typeof import('@/lib/constants/laws');
  const rescoreMap = new Map(rescored.map((ls) => [ls.lawId, ls]));
  const updatedLaws = report.laws.map((ls) =>
    rescoreMap.has(ls.lawId) ? rescoreMap.get(ls.lawId)! : ls
  );
  const aggregateScore = calcAggregateScore(
    updatedLaws.map((l) => ({ lawId: l.lawId, score: l.score }))
  );
  return {
    ...report,
    laws: updatedLaws,
    aggregateScore,
    grade: scoreToGrade(aggregateScore),
    passedLaws: updatedLaws.filter((l) => l.passed).length,
    failedLaws: updatedLaws.filter((l) => !l.passed).length,
    regenerationTargets: updatedLaws.filter((l) => !l.passed).map((l) => l.lawId),
  };
}

function parseBlueprintSections(raw: string): {
  content: string;
  productionNotes: string;
  sunoPrompt: string;
} {
  const productionMatch = raw.match(/\[PRODUCTION NOTES\]([\s\S]*?)(?:\[SUNO PROMPT\]|$)/i);
  const sunoMatch = raw.match(/\[SUNO PROMPT\]([\s\S]*?)$/i);

  const productionNotes = productionMatch?.[1]?.trim() ?? '';
  const sunoPrompt = sunoMatch?.[1]?.trim() ?? '';

  // Content = everything except the last two meta-sections
  const content = raw
    .replace(/\[PRODUCTION NOTES\][\s\S]*$/i, '')
    .trim();

  return { content, productionNotes, sunoPrompt };
}

function detectSection(content: string): string {
  const lower = content.toLowerCase();
  if (lower.includes('[suno prompt]')) return 'suno_prompt';
  if (lower.includes('[production notes]')) return 'production_notes';
  if (lower.includes('[outro]')) return 'outro';
  if (lower.includes('[bridge]')) return 'bridge';
  if (lower.lastIndexOf('[chorus]') > lower.indexOf('[chorus]')) return 'chorus';
  if (lower.includes('[chorus]')) return 'chorus';
  if (lower.includes('[verse 3]')) return 'verse_3';
  if (lower.includes('[verse 2]')) return 'verse_2';
  return 'verse_1';
}

async function streamMockBlueprint(onChunk: StreamCallback): Promise<{
  content: string;
  inputTokens: number;
  outputTokens: number;
  cachedTokens: number;
  modelUsed: string;
}> {
  for (const chunk of MOCK_BLUEPRINT_STREAM) {
    await delay(chunk.delayMs);
    onChunk({ section: chunk.section as StreamChunk['section'], content: chunk.content });
  }

  return {
    content: MOCK_FULL_BLUEPRINT,
    inputTokens: 82_000,
    outputTokens: 3_200,
    cachedTokens: 80_000,
    modelUsed: MODELS.flagship.model,
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
