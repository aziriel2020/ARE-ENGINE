/**
 * AI Router — selects the correct model for each task type.
 *
 * Routing rules (from spec):
 *   blueprint generation   → flagship (Gemini 3.1 Pro)
 *   quality scoring        → fast    (Gemini 2.5 Flash)
 *   DNA extraction         → flagship
 *   section re-generation  → fast
 *   flagship 429/500       → fallback (Claude Sonnet 4.6)
 *   fallback fails         → throw, log to Sentry
 */

export type ModelTier = 'flagship' | 'fast' | 'fallback';
export type TaskType =
  | 'blueprint_generation'
  | 'quality_scoring'
  | 'dna_extraction'
  | 'section_regeneration'
  | 'intent_decomposition';

export interface ModelConfig {
  tier: ModelTier;
  provider: 'gemini' | 'anthropic';
  model: string;
  inputCostPer1M: number;   // USD
  outputCostPer1M: number;  // USD
  maxOutputTokens: number;
  supportsContextCache: boolean;
}

export const MODELS: Record<ModelTier, ModelConfig> = {
  flagship: {
    tier: 'flagship',
    provider: 'gemini',
    model: 'gemini-2.5-pro-preview-05-06',
    inputCostPer1M: 2.00,
    outputCostPer1M: 12.00,
    maxOutputTokens: 8192,
    supportsContextCache: true,
  },
  fast: {
    tier: 'fast',
    provider: 'gemini',
    model: 'gemini-2.5-flash-preview-04-17',
    inputCostPer1M: 0.30,
    outputCostPer1M: 2.50,
    maxOutputTokens: 8192,
    supportsContextCache: true,
  },
  fallback: {
    tier: 'fallback',
    provider: 'anthropic',
    model: 'claude-sonnet-4-6',
    inputCostPer1M: 3.00,
    outputCostPer1M: 15.00,
    maxOutputTokens: 8192,
    supportsContextCache: false,
  },
};

/** Map each task to its default model tier */
const TASK_TO_TIER: Record<TaskType, ModelTier> = {
  blueprint_generation: 'flagship',
  quality_scoring: 'fast',
  dna_extraction: 'flagship',
  section_regeneration: 'fast',
  intent_decomposition: 'fast',
};

/** Errors that should trigger fallback to the next tier */
const RETRYABLE_HTTP_CODES = new Set([429, 500, 502, 503, 504]);

export interface RoutedModel {
  config: ModelConfig;
  isFallback: boolean;
}

/**
 * Select the model config for a given task.
 * Optionally force a specific tier (for plan-based restrictions).
 */
export function selectModel(
  task: TaskType,
  forceTier?: ModelTier
): ModelConfig {
  const tier = forceTier ?? TASK_TO_TIER[task];
  return MODELS[tier];
}

/**
 * Calculate the cost in USD for a generation.
 */
export function calcCostUsd(
  model: ModelConfig,
  inputTokens: number,
  outputTokens: number,
  cachedTokens = 0
): number {
  // Cached tokens cost ~10% of normal input tokens (Gemini pricing)
  const billableInputTokens = inputTokens - cachedTokens;
  const inputCost =
    (billableInputTokens / 1_000_000) * model.inputCostPer1M +
    (cachedTokens / 1_000_000) * (model.inputCostPer1M * 0.1);
  const outputCost = (outputTokens / 1_000_000) * model.outputCostPer1M;
  return Math.round((inputCost + outputCost) * 1_000_000) / 1_000_000; // 6 decimal precision
}

/**
 * Determine if an HTTP status code should trigger a fallback to the
 * next model tier.
 */
export function shouldFallback(statusCode: number): boolean {
  return RETRYABLE_HTTP_CODES.has(statusCode);
}

/**
 * Get the fallback model for a given tier.
 * flagship → fallback (Claude)
 * fast     → fallback (Claude)
 * fallback → null (no further fallback)
 */
export function getFallbackModel(currentTier: ModelTier): ModelConfig | null {
  if (currentTier === 'fallback') return null;
  return MODELS.fallback;
}
