/**
 * DNA Extraction Prompt
 *
 * Two-pass extraction:
 *   Pass 1 — Gemini 3.1 Pro analyzes samples → raw DNA JSON
 *   Pass 2 — Zod validation. If fail → targeted re-prompt with error messages
 *
 * The goal: deterministic, reproducible 7-vector fingerprint from raw artist input.
 */

import type { VocalDNA } from '@/lib/schemas/vocal-dna';

interface ExtractionInput {
  artistName: string;
  lyricsSamples?: string[];    // 1-5 lyrics samples
  styleDescription?: string;  // free-text artist description
}

/**
 * Build the Pass 1 extraction prompt.
 */
export function buildDNAExtractionPrompt(input: ExtractionInput): string {
  const sampleSection = input.lyricsSamples && input.lyricsSamples.length > 0
    ? `## LYRICS SAMPLES (${input.lyricsSamples.length} provided)\n${input.lyricsSamples
        .map((s, i) => `### Sample ${i + 1}\n${s}`)
        .join('\n\n')}`
    : '';

  const descSection = input.styleDescription
    ? `## ARTIST STYLE DESCRIPTION\n${input.styleDescription}`
    : '';

  return `You are a musicologist and lyric analyst specializing in artist identity decomposition.

## TASK
Analyze the provided material for artist "${input.artistName}" and extract their Vocal DNA —
a deterministic 7-vector creative fingerprint. Be precise and specific. Generic defaults are wrong.

${sampleSection}

${descSection}

## OUTPUT FORMAT
Respond with ONLY valid JSON matching this exact structure. No preamble, no markdown fences.

{
  "version": 1,
  "createdAt": "${new Date().toISOString()}",
  "updatedAt": "${new Date().toISOString()}",
  "artistName": "${input.artistName}",
  "lexical": {
    "vocabularyTier": "street" | "literary" | "mixed" | "abstract" | "conversational",
    "avgSentenceLength": <3-30>,
    "slangDensity": <0.0-1.0>,
    "metaphorFrequency": "rare" | "moderate" | "dense" | "dominant",
    "bannedWords": ["word1", "word2"],
    "signatureExpressions": ["phrase1", "phrase2"],
    "languageMix": { "<lang_code>": <0.0-1.0> }
  },
  "emotional": {
    "primaryAxis": "melancholic" | "aggressive" | "euphoric" | "introspective" | "defiant" | "tender" | "nihilistic",
    "secondaryAxis": "<same options or omit>",
    "intensityRange": [<min 1-10>, <max 1-10>],
    "vulnerabilityThreshold": <0.0-1.0>,
    "angerExpression": "explosive" | "cold" | "sarcastic" | "suppressed",
    "joyExpression": "restrained" | "childlike" | "dark-humor" | "triumphant"
  },
  "rhythmic": {
    "defaultFlow": "syncopated" | "on-beat" | "triplet" | "freeform" | "staccato" | "legato",
    "bpm_range": [<min 60-200>, <max 60-200>],
    "syllableDensity": "sparse" | "moderate" | "dense" | "machinegun",
    "pausePattern": "breath-natural" | "dramatic-silence" | "no-pause" | "irregular",
    "rhymeScheme": "AABB" | "ABAB" | "ABBA" | "freeform" | "internal-dominant" | "multisyllabic",
    "enjambment": true | false
  },
  "thematic": {
    "coreThemes": ["theme1", "theme2"],
    "recurringSymbols": ["symbol1", "symbol2"],
    "avoidedTopics": ["topic1"],
    "narrativeMode": "first-person-confessional" | "storyteller" | "observer" | "character-driven" | "stream-of-consciousness",
    "temporalOrientation": "nostalgic" | "present-tense" | "future-anxious" | "timeless"
  },
  "sonic": {
    "primaryGenres": ["genre1"],
    "subGenres": ["subgenre1"],
    "instrumentalAffinities": ["instrument1"],
    "productionEra": "vintage-analog" | "modern-clean" | "lo-fi-textured" | "experimental" | "hybrid",
    "vocalTexture": "raw-unprocessed" | "auto-tuned" | "layered-harmonies" | "spoken-word" | "whispered" | "shouted"
  },
  "structural": {
    "preferredStructure": "verse-chorus-verse" | "freeform" | "progressive-build" | "cyclic" | "narrative-arc",
    "avgVerseLines": <4-24>,
    "chorusStyle": "hook-driven" | "chant" | "melodic" | "spoken" | "instrumental-break" | "none",
    "bridgeFrequency": "always" | "sometimes" | "never",
    "outroStyle": "fade" | "abrupt" | "callback" | "ambient-dissolve" | "spoken-word",
    "songLengthPreference": "short-2min" | "standard-3min" | "extended-5min" | "epic-7min+"
  },
  "influences": {
    "directInfluences": [
      { "artist": "<name>", "dimension": "flow" | "lyrics" | "production" | "attitude" | "melody", "weight": <0.0-1.0> }
    ],
    "antiInfluences": ["artist_to_avoid"],
    "culturalRoots": ["cultural_context"]
  }
}

BE SPECIFIC. Every field must reflect the actual artist, not generic defaults.
If you lack enough information for a field, make your best inference from available data.`;
}

/**
 * Build the Pass 2 correction prompt when Zod validation fails.
 */
export function buildDNACorrectionPrompt(
  originalOutput: string,
  zodErrors: string
): string {
  return `The DNA JSON you produced has validation errors. Fix them and return corrected JSON only.

## VALIDATION ERRORS
${zodErrors}

## YOUR ORIGINAL OUTPUT
${originalOutput}

Return ONLY the corrected JSON. No explanation, no markdown fences.
Every field must exactly match the required schema types and constraints.`;
}

/**
 * Parse and validate the raw AI output into a typed VocalDNA.
 * Returns { dna, errors } — if errors is non-empty, Pass 2 is needed.
 */
export async function parseDNAOutput(
  rawOutput: string
): Promise<{ dna: VocalDNA | null; errors: string }> {
  const { VocalDNASchema } = await import('@/lib/schemas/vocal-dna');

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawOutput.trim());
  } catch {
    return { dna: null, errors: 'Response is not valid JSON.' };
  }

  const result = VocalDNASchema.safeParse(parsed);
  if (result.success) {
    return { dna: result.data, errors: '' };
  }

  const errorSummary = result.error.issues
    .map((i) => `${i.path.join('.')}: ${i.message}`)
    .join('\n');

  return { dna: null, errors: errorSummary };
}
