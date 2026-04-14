import { describe, it, expect } from 'vitest';
import { PLAN_LIMITS } from '@/lib/constants/plans';

describe('PLAN_LIMITS', () => {
  it('defines all four plans', () => {
    expect(PLAN_LIMITS.FREE).toBeDefined();
    expect(PLAN_LIMITS.PRO).toBeDefined();
    expect(PLAN_LIMITS.STUDIO).toBeDefined();
    expect(PLAN_LIMITS.ENTERPRISE).toBeDefined();
  });

  it('FREE plan has 5 generations/month', () => {
    expect(PLAN_LIMITS.FREE.generationsPerMonth).toBe(5);
  });

  it('FREE plan has no API keys', () => {
    expect(PLAN_LIMITS.FREE.apiKeys).toBe(0);
  });

  it('FREE plan has no webhooks', () => {
    expect(PLAN_LIMITS.FREE.webhooks).toBe(0);
  });

  it('PRO plan has more generations than FREE', () => {
    expect(PLAN_LIMITS.PRO.generationsPerMonth).toBeGreaterThan(
      PLAN_LIMITS.FREE.generationsPerMonth
    );
  });

  it('STUDIO plan has more DNA profiles than PRO', () => {
    expect(PLAN_LIMITS.STUDIO.dnaProfiles).toBeGreaterThan(
      PLAN_LIMITS.PRO.dnaProfiles
    );
  });

  it('ENTERPRISE has unlimited generations (-1)', () => {
    expect(PLAN_LIMITS.ENTERPRISE.generationsPerMonth).toBe(-1);
  });

  it('ENTERPRISE has unlimited DNA profiles (-1)', () => {
    expect(PLAN_LIMITS.ENTERPRISE.dnaProfiles).toBe(-1);
  });

  it('paid plans support quality scoring', () => {
    expect(PLAN_LIMITS.PRO.qualityScoring).toBe(true);
    expect(PLAN_LIMITS.STUDIO.qualityScoring).toBe(true);
    expect(PLAN_LIMITS.ENTERPRISE.qualityScoring).toBe(true);
  });

  it('FREE plan does not support quality scoring', () => {
    expect(PLAN_LIMITS.FREE.qualityScoring).toBe(false);
  });

  it('all plan prices are non-negative integers', () => {
    (['FREE', 'PRO', 'STUDIO', 'ENTERPRISE'] as const).forEach((plan) => {
      expect(PLAN_LIMITS[plan].price).toBeGreaterThanOrEqual(0);
      expect(Number.isInteger(PLAN_LIMITS[plan].price)).toBe(true);
    });
  });
});
