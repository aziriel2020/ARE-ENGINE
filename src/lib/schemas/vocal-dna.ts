import { z } from 'zod';

export const LexicalFingerprintSchema = z.object({
  vocabularyTier: z.enum([
    'street',
    'literary',
    'mixed',
    'abstract',
    'conversational',
  ]),
  avgSentenceLength: z.number().min(3).max(30),
  slangDensity: z.number().min(0).max(1), // 0 = no slang, 1 = pure slang
  metaphorFrequency: z.enum(['rare', 'moderate', 'dense', 'dominant']),
  bannedWords: z.array(z.string()).max(50), // words this artist NEVER uses
  signatureExpressions: z.array(z.string()).max(20), // recurring phrases
  languageMix: z.record(z.string(), z.number()), // e.g. { "fr": 0.85, "en": 0.1, "ar": 0.05 }
});

export const EmotionalRangeSchema = z.object({
  primaryAxis: z.enum([
    'melancholic',
    'aggressive',
    'euphoric',
    'introspective',
    'defiant',
    'tender',
    'nihilistic',
  ]),
  secondaryAxis: z
    .enum([
      'melancholic',
      'aggressive',
      'euphoric',
      'introspective',
      'defiant',
      'tender',
      'nihilistic',
    ])
    .optional(),
  intensityRange: z.tuple([
    z.number().min(1).max(10),
    z.number().min(1).max(10),
  ]), // [min, max]
  vulnerabilityThreshold: z.number().min(0).max(1), // how easily the artist shows vulnerability
  angerExpression: z.enum(['explosive', 'cold', 'sarcastic', 'suppressed']),
  joyExpression: z.enum([
    'restrained',
    'childlike',
    'dark-humor',
    'triumphant',
  ]),
});

export const RhythmicSignatureSchema = z.object({
  defaultFlow: z.enum([
    'syncopated',
    'on-beat',
    'triplet',
    'freeform',
    'staccato',
    'legato',
  ]),
  bpm_range: z.tuple([
    z.number().min(60).max(200),
    z.number().min(60).max(200),
  ]),
  syllableDensity: z.enum(['sparse', 'moderate', 'dense', 'machinegun']),
  pausePattern: z.enum([
    'breath-natural',
    'dramatic-silence',
    'no-pause',
    'irregular',
  ]),
  rhymeScheme: z.enum([
    'AABB',
    'ABAB',
    'ABBA',
    'freeform',
    'internal-dominant',
    'multisyllabic',
  ]),
  enjambment: z.boolean(), // does the artist break lines mid-phrase?
});

export const ThematicObsessionsSchema = z.object({
  coreThemes: z.array(z.string()).min(2).max(7), // e.g. ["solitude", "betrayal", "urban night"]
  recurringSymbols: z.array(z.string()).max(10), // e.g. ["rain", "neon", "cigarette smoke"]
  avoidedTopics: z.array(z.string()).max(10), // topics this artist never touches
  narrativeMode: z.enum([
    'first-person-confessional',
    'storyteller',
    'observer',
    'character-driven',
    'stream-of-consciousness',
  ]),
  temporalOrientation: z.enum([
    'nostalgic',
    'present-tense',
    'future-anxious',
    'timeless',
  ]),
});

export const SonicPaletteSchema = z.object({
  primaryGenres: z.array(z.string()).min(1).max(3),
  subGenres: z.array(z.string()).max(5),
  instrumentalAffinities: z.array(z.string()).max(10), // e.g. ["lo-fi piano", "808 sub-bass", "analog synth"]
  productionEra: z.enum([
    'vintage-analog',
    'modern-clean',
    'lo-fi-textured',
    'experimental',
    'hybrid',
  ]),
  vocalTexture: z.enum([
    'raw-unprocessed',
    'auto-tuned',
    'layered-harmonies',
    'spoken-word',
    'whispered',
    'shouted',
  ]),
});

export const StructuralDNASchema = z.object({
  preferredStructure: z.enum([
    'verse-chorus-verse',
    'freeform',
    'progressive-build',
    'cyclic',
    'narrative-arc',
  ]),
  avgVerseLines: z.number().min(4).max(24),
  chorusStyle: z.enum([
    'hook-driven',
    'chant',
    'melodic',
    'spoken',
    'instrumental-break',
    'none',
  ]),
  bridgeFrequency: z.enum(['always', 'sometimes', 'never']),
  outroStyle: z.enum([
    'fade',
    'abrupt',
    'callback',
    'ambient-dissolve',
    'spoken-word',
  ]),
  songLengthPreference: z.enum([
    'short-2min',
    'standard-3min',
    'extended-5min',
    'epic-7min+',
  ]),
});

export const InfluenceMapSchema = z.object({
  directInfluences: z
    .array(
      z.object({
        artist: z.string(),
        dimension: z.enum([
          'flow',
          'lyrics',
          'production',
          'attitude',
          'melody',
        ]),
        weight: z.number().min(0).max(1),
      })
    )
    .max(10),
  antiInfluences: z.array(z.string()).max(5), // artists whose style to explicitly AVOID
  culturalRoots: z.array(z.string()).max(5), // e.g. ["banlieue-parisienne", "90s-east-coast", "chanson-française"]
});

export const VocalDNASchema = z.object({
  version: z.number().int().positive(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  artistName: z.string().min(1).max(100),
  lexical: LexicalFingerprintSchema,
  emotional: EmotionalRangeSchema,
  rhythmic: RhythmicSignatureSchema,
  thematic: ThematicObsessionsSchema,
  sonic: SonicPaletteSchema,
  structural: StructuralDNASchema,
  influences: InfluenceMapSchema,
});

export type LexicalFingerprint = z.infer<typeof LexicalFingerprintSchema>;
export type EmotionalRange = z.infer<typeof EmotionalRangeSchema>;
export type RhythmicSignature = z.infer<typeof RhythmicSignatureSchema>;
export type ThematicObsessions = z.infer<typeof ThematicObsessionsSchema>;
export type SonicPalette = z.infer<typeof SonicPaletteSchema>;
export type StructuralDNA = z.infer<typeof StructuralDNASchema>;
export type InfluenceMap = z.infer<typeof InfluenceMapSchema>;
export type VocalDNA = z.infer<typeof VocalDNASchema>;
