/**
 * Quality Scoring Prompt
 *
 * Instructs Gemini 2.5 Flash to evaluate a blueprint against the 28 Laws.
 * Returns structured JSON. Temperature should be set to 0.1 for consistency.
 */

import { LAWS } from '@/lib/constants/laws';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';

/**
 * Build the scoring prompt.
 * @param blueprintText   Full generated blueprint text
 * @param dna             Artist's Vocal DNA (for DNA-specific laws)
 * @param onlyLawIds      If provided, only score these specific laws (for re-scoring)
 */
export function buildQualityScoringPrompt(
  blueprintText: string,
  dna: VocalDNA,
  onlyLawIds?: number[]
): string {
  const lawsToScore = onlyLawIds
    ? LAWS.filter((l) => onlyLawIds.includes(l.id))
    : LAWS;

  const lawDescriptions = lawsToScore
    .map(
      (l) =>
        `LAW ${l.id} — ${l.name} [weight: ${l.weight}] (${l.category})\n` +
        `  Description: ${l.description}\n` +
        `  Fail criteria: ${l.failCriteria}`
    )
    .join('\n\n');

  const dnaContext = JSON.stringify(dna, null, 2);

  return `You are a professional songwriting quality evaluator with deep expertise in lyric craft.

## TASK
Score the provided BLUEPRINT against each of the LAWS listed below.
For each law, provide:
- A score from 0 to 100 (100 = perfect compliance)
- A pass/fail verdict (pass = score >= 60)
- 1-2 sentence reasoning
- The specific failed excerpt if score < 60 (quote it directly from the blueprint)

## ARTIST VOCAL DNA
This is the artist's creative identity fingerprint. DNA-specific laws (15-19) must be
evaluated against these parameters:
\`\`\`json
${dnaContext}
\`\`\`

## LAWS TO EVALUATE
${lawDescriptions}

## BLUEPRINT TO SCORE
\`\`\`
${blueprintText}
\`\`\`

## OUTPUT FORMAT
Respond with ONLY valid JSON. No preamble, no explanation, no markdown fences.
Schema:
{
  "laws": [
    {
      "id": <law_id>,
      "score": <0-100>,
      "reasoning": "<1-2 sentences>",
      "failedExcerpt": "<direct quote from blueprint if score < 60, else omit>"
    }
  ]
}

Score ALL ${lawsToScore.length} laws. Be rigorous. The 28-Law system is the quality moat.`;
}
