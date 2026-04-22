/**
 * Section Re-generation Prompt
 *
 * Used when specific laws fail. Instead of re-generating the entire blueprint,
 * we surgically regenerate only the sections that caused failures.
 *
 * This runs on the fast model (Gemini 2.5 Flash) — shorter, targeted prompts.
 */

import { LAWS } from '@/lib/constants/laws';
import type { LawScore } from '@/lib/schemas/blueprint';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';

interface SectionRegenerationInput {
  originalBlueprint: string;
  failedLaws: LawScore[];
  dna: VocalDNA;
  regenerationCycle: number;  // 1 or 2
}

/**
 * Build the targeted section regeneration prompt.
 */
export function buildSectionRegenerationPrompt(
  input: SectionRegenerationInput
): string {
  const { originalBlueprint, failedLaws, dna, regenerationCycle } = input;

  const failedLawDetails = failedLaws
    .map((ls) => {
      const law = LAWS.find((l) => l.id === ls.lawId);
      return [
        `LAW ${ls.lawId} — ${ls.lawName} [score: ${ls.score}/100]`,
        `  Issue: ${ls.reasoning}`,
        ls.failedExcerpt ? `  Problematic text: "${ls.failedExcerpt}"` : '',
        `  Fix requirement: ${law?.failCriteria ?? 'See law description'}`,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n\n');

  const categorySet = new Set<string>();
  for (const ls of failedLaws) {
    const cat = LAWS.find((l) => l.id === ls.lawId)?.category;
    if (cat) categorySet.add(cat);
  }
  const affectedCategories = Array.from(categorySet);

  const dnaReminder = buildDNAReminder(dna);

  return `You are ANIMAENGINE, revising a lyric blueprint on regeneration cycle ${regenerationCycle}/2.

## TASK
Surgically fix the FAILED SECTIONS of the blueprint below. Only rewrite the sections
that contain the problematic text. Leave passing sections exactly as they are.

## FAILED LAWS TO FIX
${failedLawDetails}

## AFFECTED AREAS
Categories with failures: ${affectedCategories.join(', ')}

## DNA CONSTRAINTS (do not violate these)
${dnaReminder}

## ORIGINAL BLUEPRINT
${originalBlueprint}

## INSTRUCTIONS
1. Identify which section(s) contain the problematic text from the failed laws.
2. Rewrite ONLY those sections to fix the specific failures.
3. Keep the section tags ([VERSE 1], [CHORUS], etc.) exactly as they are.
4. Return the COMPLETE blueprint with your fixes applied.
5. Do not add any preamble or explanation — output the blueprint only.

If you cannot fix all failures in one pass, prioritize laws with highest weight.
High-weight laws (weight 3): No AI Clichés, Concrete Sensory Detail, Emotional Arc Presence,
Opening Line Hook, Show Don't Tell Ratio, DNA Lexical Alignment, DNA Emotional Range Match,
No Greeting Card Lines, Metaphor Freshness.`;
}

function buildDNAReminder(dna: VocalDNA): string {
  return [
    `- Artist: ${dna.artistName}`,
    `- Vocabulary tier: ${dna.lexical.vocabularyTier}`,
    `- Banned words: ${dna.lexical.bannedWords.slice(0, 8).join(', ')}`,
    `- Flow: ${dna.rhythmic.defaultFlow} | Rhyme: ${dna.rhythmic.rhymeScheme}`,
    `- Emotional primary: ${dna.emotional.primaryAxis}`,
    `- Avoided topics: ${dna.thematic.avoidedTopics.join(', ')}`,
    `- Anti-influences: ${dna.influences.antiInfluences.join(', ')}`,
  ].join('\n');
}
