export type LawCategory =
  | 'vocabulary'
  | 'rhythm'
  | 'structure'
  | 'craft'
  | 'persona'
  | 'authenticity'
  | 'artistry'
  | 'technical';

export interface Law {
  readonly id: number;
  readonly name: string;
  readonly weight: number;
  readonly category: LawCategory;
  readonly description: string;
  readonly failCriteria: string;
}

export const LAWS: readonly Law[] = [
  {
    id: 1,
    name: 'No AI Clichés',
    weight: 3,
    category: 'vocabulary',
    description:
      'The text must not contain phrases that are statistically overrepresented in AI-generated content.',
    failCriteria:
      'Presence of phrases like "in the shadows", "echoes of the past", "dance in the rain", "painted sky", "neon glow", or similar AI-generated boilerplate.',
  },
  {
    id: 2,
    name: 'Concrete Sensory Detail',
    weight: 3,
    category: 'vocabulary',
    description:
      'Lyrics must ground abstract emotions in specific, tangible sensory details.',
    failCriteria:
      'Purely abstract emotional statements without any concrete sensory anchoring.',
  },
  {
    id: 3,
    name: 'Brand-Name Specificity',
    weight: 2,
    category: 'vocabulary',
    description:
      'Where appropriate to the artist DNA, proper nouns and brand names create authenticity and specificity.',
    failCriteria:
      'Generic references where specific ones would be more authentic to the artist\'s world.',
  },
  {
    id: 4,
    name: 'Slant Rhyme Dominance',
    weight: 2,
    category: 'rhythm',
    description:
      'Imperfect/slant rhymes should dominate over perfect rhymes for naturalness.',
    failCriteria:
      'More than 60% perfect rhymes (moon/spoon, love/above, night/right).',
  },
  {
    id: 5,
    name: 'Internal Rhyme Density',
    weight: 2,
    category: 'rhythm',
    description:
      'Verses should contain internal rhyme schemes that create rhythmic complexity.',
    failCriteria:
      'Flat lines with no internal rhyme or sonic texture within the line.',
  },
  {
    id: 6,
    name: 'Syllable Flow Consistency',
    weight: 2,
    category: 'rhythm',
    description:
      'Syllable count per line should be consistent with the artist\'s rhythmic DNA signature.',
    failCriteria:
      'Wildly inconsistent syllable counts that break the established flow pattern.',
  },
  {
    id: 7,
    name: 'Enjambment Intelligence',
    weight: 1,
    category: 'rhythm',
    description:
      'Line breaks should be used purposefully to create emphasis or tension.',
    failCriteria:
      'Every line is end-stopped with no use of enjambment when DNA calls for it.',
  },
  {
    id: 8,
    name: 'Emotional Arc Presence',
    weight: 3,
    category: 'structure',
    description:
      'The song must trace a discernible emotional journey from opening to close.',
    failCriteria:
      'Flat emotional register throughout — same intensity from verse 1 to outro.',
  },
  {
    id: 9,
    name: 'Verse-Chorus Contrast',
    weight: 2,
    category: 'structure',
    description:
      'Verse and chorus must be sonically and emotionally distinct — not interchangeable.',
    failCriteria:
      'Verse and chorus feel like the same section with different words.',
  },
  {
    id: 10,
    name: 'Bridge Surprise Factor',
    weight: 1,
    category: 'structure',
    description:
      'If present, the bridge must introduce a genuinely new perspective or sonic element.',
    failCriteria:
      'Bridge that simply repeats the chorus theme with slight variation.',
  },
  {
    id: 11,
    name: 'Opening Line Hook',
    weight: 3,
    category: 'craft',
    description:
      'The first line of the song must be immediately arresting — it must create a question or tension.',
    failCriteria:
      'Opening line is bland, scene-setting, or starts with "I" + generic emotional statement.',
  },
  {
    id: 12,
    name: 'Show Dont Tell Ratio',
    weight: 3,
    category: 'craft',
    description:
      'Emotions must be shown through action and image, not stated directly.',
    failCriteria:
      'Direct emotional declarations (I feel, I am sad, my heart is broken) without concrete imagery.',
  },
  {
    id: 13,
    name: 'Physical Emotion Mapping',
    weight: 2,
    category: 'craft',
    description:
      'Abstract emotions must be mapped to physical body sensations or actions.',
    failCriteria:
      'Emotions named but never embodied in the physical world of the song.',
  },
  {
    id: 14,
    name: 'Dialogue Authenticity',
    weight: 1,
    category: 'craft',
    description:
      'Any quoted speech or internal monologue must feel natural and character-specific.',
    failCriteria:
      'Dialogue that sounds like no real person speaks, especially if overly formal.',
  },
  {
    id: 15,
    name: 'DNA Lexical Alignment',
    weight: 3,
    category: 'persona',
    description:
      'Vocabulary, sentence length, and language mix must match the DNA lexical fingerprint.',
    failCriteria:
      'Text uses vocabulary tier or language mix that contradicts the DNA profile.',
  },
  {
    id: 16,
    name: 'DNA Emotional Range Match',
    weight: 3,
    category: 'persona',
    description:
      'Emotional intensity and tone must fall within the DNA emotional range parameters.',
    failCriteria:
      'Emotional register falls outside the DNA intensity range or contradicts primary/secondary axes.',
  },
  {
    id: 17,
    name: 'DNA Rhythmic Signature',
    weight: 2,
    category: 'persona',
    description:
      'Flow, syllable density, and rhyme scheme must match the DNA rhythmic signature.',
    failCriteria:
      'Flow style or syllable density contradicts the DNA rhythmic profile.',
  },
  {
    id: 18,
    name: 'DNA Thematic Coherence',
    weight: 2,
    category: 'persona',
    description:
      'Themes and symbols must align with the DNA thematic obsessions. Avoided topics must be absent.',
    failCriteria:
      'Avoided topics present, or thematic content contradicts DNA core themes.',
  },
  {
    id: 19,
    name: 'DNA Anti-Influence Guard',
    weight: 2,
    category: 'persona',
    description:
      'The text must not exhibit stylistic markers of the DNA anti-influences.',
    failCriteria:
      'Recognizable stylistic features of artists listed in antiInfluences.',
  },
  {
    id: 20,
    name: 'No Forced Perfect Rhymes',
    weight: 2,
    category: 'authenticity',
    description:
      'The text must not sacrifice natural language for the sake of a rhyme.',
    failCriteria:
      'Unnatural word order, forced vocabulary choices, or grammatical contortion to achieve rhyme.',
  },
  {
    id: 21,
    name: 'No Greeting Card Lines',
    weight: 3,
    category: 'authenticity',
    description:
      'The text must not contain lines that could appear on a greeting card or inspirational poster.',
    failCriteria:
      'Generic inspirational lines, platitudes, or sentiments devoid of specificity.',
  },
  {
    id: 22,
    name: 'Cultural Specificity',
    weight: 2,
    category: 'authenticity',
    description:
      'References must be culturally specific and authentic to the artist\'s cultural roots.',
    failCriteria:
      'Culturally generic content when DNA cultural roots call for specificity.',
  },
  {
    id: 23,
    name: 'Temporal Grounding',
    weight: 1,
    category: 'authenticity',
    description:
      'The temporal orientation (nostalgic/present/future) must match the DNA temporal orientation.',
    failCriteria:
      'Temporal tone contradicts the DNA temporal orientation setting.',
  },
  {
    id: 24,
    name: 'Surprise Element Quota',
    weight: 2,
    category: 'artistry',
    description:
      'Each section must contain at least one unexpected image, turn of phrase, or perspective shift.',
    failCriteria:
      'Entirely predictable progression with no surprising element in any section.',
  },
  {
    id: 25,
    name: 'Metaphor Freshness',
    weight: 3,
    category: 'artistry',
    description:
      'Metaphors must be original. No recycled cultural stock metaphors.',
    failCriteria:
      'Dead metaphors (heart of stone, fire in my soul, storm in my eyes) or overused cultural tropes.',
  },
  {
    id: 26,
    name: 'Sound-Meaning Alignment',
    weight: 1,
    category: 'artistry',
    description:
      'Word sounds should reinforce semantic meaning (e.g., harsh consonants for harsh emotions).',
    failCriteria:
      'Sonic texture of words directly contradicts the emotional content.',
  },
  {
    id: 27,
    name: 'Re-readability Factor',
    weight: 2,
    category: 'artistry',
    description:
      'The text should reward re-reading — layers of meaning, subtle connections, earned callbacks.',
    failCriteria:
      'Purely surface-level text with no depth or reward for closer reading.',
  },
  {
    id: 28,
    name: 'Suno/AI-Gen Compatibility',
    weight: 2,
    category: 'technical',
    description:
      'Structure and formatting must be compatible with Suno or similar AI music generation tools.',
    failCriteria:
      'Missing section tags, overly long sections, or structural patterns Suno cannot parse.',
  },
] as const;

export const LAW_CATEGORIES: LawCategory[] = [
  'vocabulary',
  'rhythm',
  'structure',
  'craft',
  'persona',
  'authenticity',
  'artistry',
  'technical',
];

/** Get laws by category */
export function getLawsByCategory(category: LawCategory): Law[] {
  return LAWS.filter((l) => l.category === category) as Law[];
}

/** Get total weight for grade calculation */
export const TOTAL_WEIGHT = LAWS.reduce((sum, law) => sum + law.weight, 0);

/** Calculate weighted aggregate score from law scores */
export function calcAggregateScore(
  lawScores: Array<{ lawId: number; score: number }>
): number {
  const scored = lawScores
    .map((ls) => {
      const law = LAWS.find((l) => l.id === ls.lawId);
      if (!law) return { weighted: 0, weight: 0 };
      return { weighted: ls.score * law.weight, weight: law.weight };
    })
    .reduce(
      (acc, cur) => ({
        weighted: acc.weighted + cur.weighted,
        weight: acc.weight + cur.weight,
      }),
      { weighted: 0, weight: 0 }
    );

  if (scored.weight === 0) return 0;
  return Math.round(scored.weighted / scored.weight);
}

/** Determine grade from aggregate score */
export function scoreToGrade(
  score: number
): 'S' | 'A' | 'B' | 'C' | 'F' {
  if (score >= 95) return 'S';
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 60) return 'C';
  return 'F';
}
