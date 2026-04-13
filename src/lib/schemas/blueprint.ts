import { z } from 'zod';
import { VocalDNASchema } from './vocal-dna';

export const DecomposedIntentSchema = z.object({
  genre: z.string(),
  mood: z.array(z.string()),
  theme: z.string(),
  narrativeArc: z.string(),
  targetLength: z.string(),
  specificConstraints: z.array(z.string()),
  dnaOverrides: VocalDNASchema.partial().optional(),
});

export type DecomposedIntent = z.infer<typeof DecomposedIntentSchema>;

export const LawScoreSchema = z.object({
  lawId: z.number().int().min(1).max(28),
  lawName: z.string(),
  score: z.number().min(0).max(100),
  passed: z.boolean(),
  reasoning: z.string(),
  failedExcerpt: z.string().optional(),
});

export const QualityReportSchema = z.object({
  blueprintId: z.string(),
  aggregateScore: z.number().min(0).max(100),
  passedLaws: z.number().int().min(0).max(28),
  failedLaws: z.number().int().min(0).max(28),
  grade: z.enum(['S', 'A', 'B', 'C', 'F']),
  laws: z.array(LawScoreSchema),
  regenerationTargets: z.array(z.number().int()), // lawIds that failed
});

export type LawScore = z.infer<typeof LawScoreSchema>;
export type QualityReport = z.infer<typeof QualityReportSchema>;

export const BlueprintGradeEnum = z.enum(['S', 'A', 'B', 'C', 'F']);
export type BlueprintGrade = z.infer<typeof BlueprintGradeEnum>;

export const BlueprintStatusEnum = z.enum([
  'GENERATING',
  'SCORING',
  'REGENERATING',
  'COMPLETE',
  'FAILED',
]);
export type BlueprintStatus = z.infer<typeof BlueprintStatusEnum>;

export const StreamChunkSchema = z.object({
  section: z.enum([
    'verse_1',
    'verse_2',
    'verse_3',
    'chorus',
    'bridge',
    'outro',
    'intro',
    'production_notes',
    'suno_prompt',
    'complete',
    'error',
  ]),
  content: z.string(),
});

export type StreamChunk = z.infer<typeof StreamChunkSchema>;
