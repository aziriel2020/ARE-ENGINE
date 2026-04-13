/**
 * Gemini Context Cache Manager
 *
 * Caches the large static context (knowledge base + vocal DNA) so repeated
 * generations for the same persona cost ~10% of the first call.
 *
 * Cache lifecycle:
 *   - Created on first generation for a (userId, dnaProfileId) pair
 *   - Default TTL: 1 hour. Extended to 24h if session is active.
 *   - Cache name stored in memory (process-level) — scales fine on Vercel
 *     since each invocation may get a cold start. Persistent cache lookup
 *     falls back to re-creation gracefully.
 *
 * In TEST_MODE: no real Gemini calls; cache is a no-op Map.
 */

import { IS_TEST_MODE } from '@/lib/config/env';
import { logError, logInfo } from '@/lib/logger';

interface CacheEntry {
  cacheName: string;       // Gemini cache resource name
  expiresAt: number;       // Unix ms
  dnaProfileId: string;
  userId: string;
}

// In-process cache registry (not shared across invocations — that's fine,
// cold starts just re-create the cache which is a single Gemini API call)
const cacheRegistry = new Map<string, CacheEntry>();

const DEFAULT_TTL_SECONDS = 3_600;       // 1 hour
const EXTENDED_TTL_SECONDS = 86_400;     // 24 hours

/** Build the registry key for a user+DNA combo */
function cacheKey(userId: string, dnaProfileId: string): string {
  return `${userId}::${dnaProfileId}`;
}

/**
 * Get an existing valid cache entry, or null if expired/missing.
 */
export function getCacheEntry(
  userId: string,
  dnaProfileId: string
): CacheEntry | null {
  if (IS_TEST_MODE) return null;

  const key = cacheKey(userId, dnaProfileId);
  const entry = cacheRegistry.get(key);
  if (!entry) return null;

  if (Date.now() >= entry.expiresAt) {
    cacheRegistry.delete(key);
    return null;
  }

  return entry;
}

/**
 * Store a new cache entry after successful Gemini cache creation.
 */
export function storeCacheEntry(
  userId: string,
  dnaProfileId: string,
  cacheName: string,
  ttlSeconds = DEFAULT_TTL_SECONDS
): CacheEntry {
  const entry: CacheEntry = {
    cacheName,
    expiresAt: Date.now() + ttlSeconds * 1000,
    dnaProfileId,
    userId,
  };
  cacheRegistry.set(cacheKey(userId, dnaProfileId), entry);
  return entry;
}

/**
 * Extend TTL on an existing cache entry (for active sessions).
 */
export function extendCacheEntry(
  userId: string,
  dnaProfileId: string
): void {
  const key = cacheKey(userId, dnaProfileId);
  const entry = cacheRegistry.get(key);
  if (entry) {
    entry.expiresAt = Date.now() + EXTENDED_TTL_SECONDS * 1000;
    cacheRegistry.set(key, entry);
  }
}

/**
 * Invalidate a cache entry (e.g. when DNA profile is updated).
 */
export function invalidateCacheEntry(
  userId: string,
  dnaProfileId: string
): void {
  cacheRegistry.delete(cacheKey(userId, dnaProfileId));
}

/**
 * Create a Gemini context cache for a given knowledge base + DNA context.
 *
 * @param knowledgeBase  Full text of knowledge base (ARE_1 + ARE_2 + ARE_3)
 * @param vocalDNAJson   JSON string of the VocalDNA object
 * @param systemPrompt   The generation system prompt
 * @param userId
 * @param dnaProfileId
 * @returns The Gemini cache name (resource identifier) or null on failure
 */
export async function createOrGetContextCache(
  knowledgeBase: string,
  vocalDNAJson: string,
  systemPrompt: string,
  userId: string,
  dnaProfileId: string
): Promise<string | null> {
  if (IS_TEST_MODE) return 'mock-cache-name';

  // Check for existing valid cache
  const existing = getCacheEntry(userId, dnaProfileId);
  if (existing) {
    extendCacheEntry(userId, dnaProfileId);
    logInfo('context-cache: cache hit', { userId, metadata: { dnaProfileId } });
    return existing.cacheName;
  }

  try {
    const { GoogleGenAI } = await import('@google/genai');
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    const contextContent = `${knowledgeBase}\n\n---VOCAL DNA---\n${vocalDNAJson}`;

    const cache = await ai.caches.create({
      model: 'gemini-2.5-pro-preview-05-06',
      config: {
        contents: [
          { role: 'user', parts: [{ text: contextContent }] },
        ],
        systemInstruction: systemPrompt,
        ttl: `${DEFAULT_TTL_SECONDS}s`,
      },
    });

    const entry = storeCacheEntry(userId, dnaProfileId, cache.name!, DEFAULT_TTL_SECONDS);
    logInfo('context-cache: cache created', {
      userId,
      metadata: { dnaProfileId, cacheName: entry.cacheName },
    });

    return cache.name ?? null;
  } catch (err) {
    logError('context-cache: failed to create cache', {
      userId,
      metadata: { error: String(err) },
    });
    return null;
  }
}
