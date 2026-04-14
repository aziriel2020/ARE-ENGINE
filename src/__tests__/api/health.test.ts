import { describe, it, expect } from 'vitest';
import { GET } from '@/app/api/health/route';

describe('GET /api/health', () => {
  it('returns a valid health response shape', async () => {
    const response = await GET();

    // In test mode without a real DB, status is 503 (degraded).
    // In production with DB, status is 200. Both are valid.
    expect([200, 503]).toContain(response.status);

    const data = await response.json() as {
      status: string;
      version: string;
      testMode: boolean;
      timestamp: string;
      services: { database: string };
    };
    expect(data.version).toBe('3.0.0');
    expect(data.testMode).toBe(true);
    expect(typeof data.timestamp).toBe('string');
    expect(data.services).toBeDefined();
    expect(['ok', 'degraded']).toContain(data.status);
  });

  it('reports testMode as true in test environment', async () => {
    const response = await GET();
    const data = await response.json() as { testMode: boolean };
    expect(data.testMode).toBe(true);
  });
});
