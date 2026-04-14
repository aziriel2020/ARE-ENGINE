import { describe, it, expect } from 'vitest';
import {
  LAWS,
  calcAggregateScore,
  scoreToGrade,
  getLawsByCategory,
  TOTAL_WEIGHT,
} from '@/lib/constants/laws';

describe('28 Laws — LAWS array', () => {
  it('contains exactly 28 laws', () => {
    expect(LAWS).toHaveLength(28);
  });

  it('all law IDs are unique', () => {
    const ids = LAWS.map((l) => l.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(28);
  });

  it('law IDs run 1 to 28', () => {
    const ids = LAWS.map((l) => l.id).sort((a, b) => a - b);
    for (let i = 0; i < 28; i++) {
      expect(ids[i]).toBe(i + 1);
    }
  });

  it('all laws have positive weight', () => {
    LAWS.forEach((law) => {
      expect(law.weight).toBeGreaterThan(0);
    });
  });

  it('all laws belong to a valid category', () => {
    const validCategories = new Set([
      'vocabulary', 'rhythm', 'structure', 'craft',
      'persona', 'authenticity', 'artistry', 'technical',
    ]);
    LAWS.forEach((law) => {
      expect(validCategories.has(law.category)).toBe(true);
    });
  });

  it('TOTAL_WEIGHT is sum of all law weights', () => {
    const sum = LAWS.reduce((acc, l) => acc + l.weight, 0);
    expect(TOTAL_WEIGHT).toBe(sum);
  });
});

describe('28 Laws — getLawsByCategory()', () => {
  it('returns only laws for the requested category', () => {
    const vocabLaws = getLawsByCategory('vocabulary');
    vocabLaws.forEach((l) => expect(l.category).toBe('vocabulary'));
  });

  it('all 28 laws are covered across all categories', () => {
    const categories = ['vocabulary', 'rhythm', 'structure', 'craft', 'persona', 'authenticity', 'artistry', 'technical'] as const;
    const total = categories.reduce((acc, cat) => acc + getLawsByCategory(cat).length, 0);
    expect(total).toBe(28);
  });
});

describe('calcAggregateScore()', () => {
  it('returns 100 when all laws score 100', () => {
    const scores = LAWS.map((l) => ({ lawId: l.id, score: 100 }));
    expect(calcAggregateScore(scores)).toBe(100);
  });

  it('returns 0 when all laws score 0', () => {
    const scores = LAWS.map((l) => ({ lawId: l.id, score: 0 }));
    expect(calcAggregateScore(scores)).toBe(0);
  });

  it('returns a value between 0 and 100 for mixed scores', () => {
    const scores = LAWS.map((l, i) => ({ lawId: l.id, score: i % 2 === 0 ? 80 : 40 }));
    const result = calcAggregateScore(scores);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(100);
  });

  it('uses weighted average (not simple average)', () => {
    // Verify the function is weighted: a single weight-3 law scoring 100
    // should pull the aggregate higher than a weight-1 law scoring 100.
    // We check this by comparing full-score on a weight-3 law vs weight-1 law.
    const law3 = LAWS.find((l) => l.weight === 3)!;
    const law1 = LAWS.find((l) => l.weight === 1)!;

    const with3High = LAWS.map((l) => ({
      lawId: l.id,
      score: l.id === law3.id ? 100 : 0,
    }));
    const with1High = LAWS.map((l) => ({
      lawId: l.id,
      score: l.id === law1.id ? 100 : 0,
    }));
    expect(calcAggregateScore(with3High)).toBeGreaterThan(calcAggregateScore(with1High));
  });
});

describe('scoreToGrade()', () => {
  it('S grade for 95+', () => {
    expect(scoreToGrade(95)).toBe('S');
    expect(scoreToGrade(100)).toBe('S');
  });

  it('A grade for 85-94', () => {
    expect(scoreToGrade(85)).toBe('A');
    expect(scoreToGrade(94)).toBe('A');
  });

  it('B grade for 70-84', () => {
    expect(scoreToGrade(70)).toBe('B');
    expect(scoreToGrade(84)).toBe('B');
  });

  it('C grade for 60-69', () => {
    expect(scoreToGrade(60)).toBe('C');
    expect(scoreToGrade(69)).toBe('C');
  });

  it('F grade for below 60', () => {
    expect(scoreToGrade(59)).toBe('F');
    expect(scoreToGrade(0)).toBe('F');
  });
});
