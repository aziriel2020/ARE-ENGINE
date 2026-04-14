import { describe, it, expect } from 'vitest';
import { VocalDNASchema } from '@/lib/schemas/vocal-dna';
import { MOCK_DNA_JCAY, MOCK_DNA_DEFAULT } from '@/lib/mocks/mock-dna';

describe('VocalDNASchema — validation', () => {
  it('validates MOCK_DNA_JCAY without errors', () => {
    const result = VocalDNASchema.safeParse(MOCK_DNA_JCAY);
    expect(result.success).toBe(true);
  });

  it('validates MOCK_DNA_DEFAULT without errors', () => {
    const result = VocalDNASchema.safeParse(MOCK_DNA_DEFAULT);
    expect(result.success).toBe(true);
  });

  it('rejects a DNA with missing artistName', () => {
    const invalid = { ...MOCK_DNA_JCAY, artistName: '' };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects a DNA with slangDensity > 1', () => {
    const invalid = {
      ...MOCK_DNA_JCAY,
      lexical: { ...MOCK_DNA_JCAY.lexical, slangDensity: 1.5 },
    };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects a DNA with slangDensity < 0', () => {
    const invalid = {
      ...MOCK_DNA_JCAY,
      lexical: { ...MOCK_DNA_JCAY.lexical, slangDensity: -0.1 },
    };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects thematic with fewer than 2 core themes', () => {
    const invalid = {
      ...MOCK_DNA_JCAY,
      thematic: { ...MOCK_DNA_JCAY.thematic, coreThemes: ['only one'] },
    };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('rejects thematic with more than 7 core themes', () => {
    const invalid = {
      ...MOCK_DNA_JCAY,
      thematic: {
        ...MOCK_DNA_JCAY.thematic,
        coreThemes: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
      },
    };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('requires version to be a positive integer', () => {
    const invalid = { ...MOCK_DNA_JCAY, version: 0 };
    const result = VocalDNASchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });

  it('parses valid intensityRange tuple correctly', () => {
    const result = VocalDNASchema.safeParse(MOCK_DNA_JCAY);
    if (result.success) {
      const [min, max] = result.data.emotional.intensityRange;
      expect(min).toBeGreaterThanOrEqual(1);
      expect(max).toBeLessThanOrEqual(10);
      expect(min).toBeLessThanOrEqual(max);
    }
  });
});
