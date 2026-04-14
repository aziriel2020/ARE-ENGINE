import { describe, it, expect } from 'vitest';
import {
  MODELS,
  selectModel,
  calcCostUsd,
  shouldFallback,
  getFallbackModel,
} from '@/lib/engine/ai-router';

describe('AI Router — MODELS config', () => {
  it('defines all three tiers', () => {
    expect(MODELS.flagship).toBeDefined();
    expect(MODELS.fast).toBeDefined();
    expect(MODELS.fallback).toBeDefined();
  });

  it('flagship uses Gemini with context cache support', () => {
    expect(MODELS.flagship.provider).toBe('gemini');
    expect(MODELS.flagship.supportsContextCache).toBe(true);
  });

  it('fast uses Gemini at lower cost', () => {
    expect(MODELS.fast.provider).toBe('gemini');
    expect(MODELS.fast.inputCostPer1M).toBeLessThan(MODELS.flagship.inputCostPer1M);
  });

  it('fallback uses Anthropic Claude without context cache', () => {
    expect(MODELS.fallback.provider).toBe('anthropic');
    expect(MODELS.fallback.supportsContextCache).toBe(false);
  });

  it('flagship output is more expensive than fast', () => {
    expect(MODELS.flagship.outputCostPer1M).toBeGreaterThan(MODELS.fast.outputCostPer1M);
  });
});

describe('AI Router — selectModel()', () => {
  it('routes blueprint_generation to flagship', () => {
    expect(selectModel('blueprint_generation').tier).toBe('flagship');
  });

  it('routes quality_scoring to fast', () => {
    expect(selectModel('quality_scoring').tier).toBe('fast');
  });

  it('routes dna_extraction to flagship', () => {
    expect(selectModel('dna_extraction').tier).toBe('flagship');
  });

  it('routes section_regeneration to fast', () => {
    expect(selectModel('section_regeneration').tier).toBe('fast');
  });

  it('routes intent_decomposition to fast', () => {
    expect(selectModel('intent_decomposition').tier).toBe('fast');
  });

  it('respects forceTier override', () => {
    expect(selectModel('blueprint_generation', 'fast').tier).toBe('fast');
  });
});

describe('AI Router — calcCostUsd()', () => {
  it('calculates cost greater than zero for real tokens', () => {
    const cost = calcCostUsd(MODELS.flagship, 82_000, 4_000, 80_000);
    expect(cost).toBeGreaterThan(0);
  });

  it('cached requests cost less than uncached', () => {
    const uncached = calcCostUsd(MODELS.flagship, 82_000, 4_000, 0);
    const cached = calcCostUsd(MODELS.flagship, 82_000, 4_000, 80_000);
    expect(uncached).toBeGreaterThan(cached);
  });

  it('fast model is cheaper than flagship for same tokens', () => {
    const fastCost = calcCostUsd(MODELS.fast, 10_000, 2_000, 0);
    const flagshipCost = calcCostUsd(MODELS.flagship, 10_000, 2_000, 0);
    expect(fastCost).toBeLessThan(flagshipCost);
  });

  it('returns 0 for zero tokens', () => {
    expect(calcCostUsd(MODELS.fast, 0, 0)).toBe(0);
  });
});

describe('AI Router — shouldFallback()', () => {
  it('returns true for 429 (rate limit)', () => {
    expect(shouldFallback(429)).toBe(true);
  });

  it('returns true for 500 (server error)', () => {
    expect(shouldFallback(500)).toBe(true);
  });

  it('returns false for 200 (success)', () => {
    expect(shouldFallback(200)).toBe(false);
  });

  it('returns false for 400 (bad request)', () => {
    expect(shouldFallback(400)).toBe(false);
  });
});

describe('AI Router — getFallbackModel()', () => {
  it('flagship falls back to Claude', () => {
    const fallback = getFallbackModel('flagship');
    expect(fallback?.provider).toBe('anthropic');
  });

  it('fast falls back to Claude', () => {
    const fallback = getFallbackModel('fast');
    expect(fallback?.provider).toBe('anthropic');
  });

  it('fallback returns null (no further fallback)', () => {
    expect(getFallbackModel('fallback')).toBeNull();
  });
});
