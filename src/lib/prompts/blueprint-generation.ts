/**
 * Blueprint Generation Prompts — 4-Stage Pipeline
 *
 * Stage 1: Intent Decomposition (fast model)
 * Stage 2: Blueprint Generation (flagship model + context cache)
 *
 * The Stage 2 prompt is the creative core. It incorporates:
 *   - The full 28-Law methodology as creative constraints
 *   - The artist's Vocal DNA as the stylistic filter
 *   - The decomposed intent as the specific directive
 */

import type { VocalDNA } from '@/lib/schemas/vocal-dna';
import type { DecomposedIntent } from '@/lib/schemas/blueprint';

// ── Stage 1: Intent Decomposition ─────────────────────────────────────────────

/**
 * Build the intent decomposition prompt.
 * Input: raw user request ("Write a melancholic rap about losing my best friend")
 * Output: structured DecomposedIntent JSON
 */
export function buildIntentDecompositionPrompt(
  userRequest: string,
  dna: VocalDNA
): string {
  return `You are a creative director for an AI music platform specializing in lyric blueprints.

## TASK
Decompose this user request into a structured creative brief. Analyze the request against
the artist's DNA to identify any implicit requirements or DNA-override signals.

## USER REQUEST
"${userRequest}"

## ARTIST DNA SUMMARY
- Name: ${dna.artistName}
- Primary genre: ${dna.sonic.primaryGenres.join(', ')}
- Primary emotional axis: ${dna.emotional.primaryAxis}
- Default flow: ${dna.rhythmic.defaultFlow}
- Narrative mode: ${dna.thematic.narrativeMode}
- Core themes: ${dna.thematic.coreThemes.join(', ')}

## OUTPUT FORMAT
Respond with ONLY valid JSON. No preamble, no markdown fences.

{
  "genre": "<inferred primary genre for this specific song>",
  "mood": ["<mood1>", "<mood2>"],
  "theme": "<one-sentence core thematic statement>",
  "narrativeArc": "<describe the emotional journey: start → peak → resolution>",
  "targetLength": "short-2min" | "standard-3min" | "extended-5min" | "epic-7min+",
  "specificConstraints": ["<any explicit user requirements>"],
  "dnaOverrides": {
    "<only include vectors the user explicitly wants different from their default DNA>"
  }
}`;
}

// ── Stage 2: Blueprint Generation ─────────────────────────────────────────────

/** The static system prompt cached with the knowledge base */
export const BLUEPRINT_SYSTEM_PROMPT = `You are ANIMAENGINE (ANIMAENGINE), a domain-specific creative intelligence
for songwriter blueprinting. Your purpose is singular: generate lyric blueprints that
sound authentically like the specific artist whose DNA you've been given.

## CORE PRINCIPLES
1. Every word choice must be filtered through the artist's DNA — not generic AI defaults.
2. The 28 Laws are your quality constraints. They are not suggestions.
3. Show, don't tell. Ground every emotion in concrete sensory detail.
4. The opening line must be arresting. It creates a question the song must answer.
5. You are not writing for mass appeal. You are writing for this artist's world.

## OUTPUT STRUCTURE
Your blueprint MUST follow this exact section order with these exact tags:
[VERSE 1]
...lyrics...

[CHORUS]
...lyrics...

[VERSE 2]
...lyrics...

[BRIDGE] (optional — only if DNA bridgeFrequency is "always" or "sometimes")
...lyrics...

[CHORUS]
...repeat or variation...

[OUTRO]
...lyrics...

[PRODUCTION NOTES]
...tempo, key, sonic palette recommendations...

[SUNO PROMPT]
...optimized prompt for Suno AI music generation, max 200 words...

## SUNO PROMPT FORMAT
Write the Suno prompt in this format:
"[genre], [tempo bpm], [key], [mood descriptors], [vocal style], [instrument palette], [production era]"
Then follow with specific section tags Suno recognizes.`;

/**
 * Build the Stage 2 user-turn prompt (the dynamic part sent with cache reference).
 */
export function buildBlueprintGenerationPrompt(
  intent: DecomposedIntent,
  dna: VocalDNA
): string {
  const dnaOverrideText =
    intent.dnaOverrides && Object.keys(intent.dnaOverrides).length > 0
      ? `\n## DNA OVERRIDES FOR THIS SONG\nThe user wants these vectors different from the base DNA:\n${JSON.stringify(intent.dnaOverrides, null, 2)}`
      : '';

  const constraintsText =
    intent.specificConstraints.length > 0
      ? `\n## SPECIFIC USER CONSTRAINTS\n${intent.specificConstraints.map((c) => `- ${c}`).join('\n')}`
      : '';

  return `## GENERATION REQUEST

Generate a complete lyric blueprint for ${dna.artistName}.

**Emotional brief:** ${intent.theme}
**Narrative arc:** ${intent.narrativeArc}
**Mood:** ${intent.mood.join(', ')}
**Genre:** ${intent.genre}
**Target length:** ${intent.targetLength}
${constraintsText}
${dnaOverrideText}

## DNA ACTIVE PARAMETERS
- Vocabulary: ${dna.lexical.vocabularyTier} | Slang density: ${dna.lexical.slangDensity}
- Flow: ${dna.rhythmic.defaultFlow} | Syllable density: ${dna.rhythmic.syllableDensity}
- Rhyme scheme: ${dna.rhythmic.rhymeScheme} | Enjambment: ${dna.rhythmic.enjambment}
- Emotional primary: ${dna.emotional.primaryAxis} | Intensity: ${dna.emotional.intensityRange[0]}-${dna.emotional.intensityRange[1]}/10
- Narrative mode: ${dna.thematic.narrativeMode}
- Recurring symbols: ${dna.thematic.recurringSymbols.join(', ')}
- Avoided topics: ${dna.thematic.avoidedTopics.join(', ')}
- Banned words: ${dna.lexical.bannedWords.slice(0, 10).join(', ')}
- Anti-influences: ${dna.influences.antiInfluences.join(', ')}
- Language mix: ${Object.entries(dna.lexical.languageMix).map(([k, v]) => `${k}:${Math.round(v * 100)}%`).join(', ')}

## CRITICAL REQUIREMENTS
1. Opening line must be immediately arresting — creates a question
2. No AI clichés (neon glow, painted sky, dance in the rain, etc.)
3. Slant rhymes dominant — avoid perfect rhymes
4. Every emotion must be physically grounded
5. No greeting-card lines
6. Cultural specificity matching: ${dna.influences.culturalRoots.join(', ')}

Generate the full blueprint now. Follow the section structure exactly.`;
}

// ── Knowledge Base Placeholder ─────────────────────────────────────────────────

/**
 * Returns the combined knowledge base text (ARE_1 + ARE_2 + ARE_3).
 * In production this would load from actual files.
 * Phase 2 uses a condensed version of the methodology.
 */
export function getKnowledgeBase(): string {
  return `# ANIMAENGINE KNOWLEDGE BASE — 28-LAW METHODOLOGY

## THE VOCABULARY ARSENAL (ARE_1)
Forbidden AI phrases: "in the shadows", "echoes of the past", "painted sky",
"neon glow", "dance in the rain", "heart of stone", "fire in my soul",
"storm brewing", "breaking chains", "rise above", "born to fly",
"tears running down", "can't breathe without you", "you're my everything".

Strong sensory verbs: bleed, fracture, dissolve, ignite, collapse, scatter,
hollow, carve, suffocate, bloom, shatter, ache, simmer, coil.

Preferred sonic textures: dentals (d/t), sibilants (s/sh) for tension;
labials (b/p/m) for softness; fricatives (f/v) for aggression.

## THE STRUCTURAL INTELLIGENCE (ARE_2)
Verse vs Chorus principle: Verses are cinematic — close-up, specific, narrative.
Chorus is aerial — wider, emotionally crystallized, singable.
They must be tonally distinct. If both feel like verses, the chorus has failed.

Bridge principle: The bridge must reveal something the listener didn't expect.
A new perspective, a tonal shift, a confession withheld until now.

Opening line doctrine: The first line creates a contract with the listener.
It poses a question (implicit or explicit) that the song must answer.
Bad: "I wake up thinking of you" → answers nothing.
Good: "Your coat is still on my side of the closet" → poses 10 questions.

## THE DNA APPLICATION PROTOCOL (ARE_3)
Lexical alignment: Every vocabulary choice must pass through the artist's tier.
A "street" DNA artist never uses "melancholy" — they use "hollow" or "dead inside".
A "literary" DNA artist never uses "mad" — they use "incensed" or "hollowed out".

Emotional containment: Artists with low vulnerabilityThreshold keep raw emotion
just below the surface. They don't confess — they imply. Read between the lines.

Anti-influence guard: If an artist lists Drake as anti-influence, avoid:
metaphor-lite hooks, aspirational wealth imagery, relatable-guy narrative stance.`;
}
