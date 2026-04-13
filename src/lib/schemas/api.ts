import { z } from 'zod';

// ── Generate ──────────────────────────────────────────────────────────────────

export const GenerateRequestSchema = z.object({
  prompt: z.string().min(10).max(2000),
  dnaProfileId: z.string().cuid().optional(),
  modelTier: z.enum(['flagship', 'fast']).optional(),
  idempotencyKey: z.string().optional(),
});

export type GenerateRequest = z.infer<typeof GenerateRequestSchema>;

export const ScoreRequestSchema = z.object({
  blueprintId: z.string().cuid(),
});

export type ScoreRequest = z.infer<typeof ScoreRequestSchema>;

export const RegenerateRequestSchema = z.object({
  blueprintId: z.string().cuid(),
  failedLawIds: z.array(z.number().int().min(1).max(28)).min(1),
});

export type RegenerateRequest = z.infer<typeof RegenerateRequestSchema>;

// ── Blueprints ────────────────────────────────────────────────────────────────

export const ListBlueprintsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  grade: z.enum(['S', 'A', 'B', 'C', 'F']).optional(),
  dnaProfileId: z.string().cuid().optional(),
  sortBy: z.enum(['createdAt', 'grade', 'title']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ListBlueprintsQuery = z.infer<typeof ListBlueprintsQuerySchema>;

export const UpdateBlueprintSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  feedback: z.string().max(1000).optional(),
});

export type UpdateBlueprint = z.infer<typeof UpdateBlueprintSchema>;

// ── DNA ───────────────────────────────────────────────────────────────────────

export const CreateDNAProfileSchema = z.object({
  name: z.string().min(1).max(100),
  lyricsSamples: z.array(z.string()).min(1).max(5).optional(),
  styleDescription: z.string().max(2000).optional(),
  isDefault: z.boolean().default(false),
});

export type CreateDNAProfile = z.infer<typeof CreateDNAProfileSchema>;

// ── API Keys ──────────────────────────────────────────────────────────────────

export const CreateApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  permissions: z
    .array(
      z.enum([
        'generate',
        'blueprints:read',
        'blueprints:write',
        'dna:read',
        'dna:write',
        'usage:read',
      ])
    )
    .default(['generate', 'blueprints:read']),
  ipWhitelist: z.array(z.string().min(7).max(45)).default([]), // IPv4/IPv6 addresses
  expiresAt: z.string().datetime().optional(),
});

export type CreateApiKey = z.infer<typeof CreateApiKeySchema>;

// ── Webhooks ──────────────────────────────────────────────────────────────────

export const WebhookEventTypeEnum = z.enum([
  'BLUEPRINT_COMPLETED',
  'BLUEPRINT_FAILED',
  'QUOTA_WARNING',
  'QUOTA_EXCEEDED',
  'DNA_UPDATED',
]);

export const CreateWebhookSchema = z.object({
  url: z.string().url(),
  events: z.array(WebhookEventTypeEnum).min(1),
});

export type CreateWebhook = z.infer<typeof CreateWebhookSchema>;

export const UpdateWebhookSchema = z.object({
  url: z.string().url().optional(),
  events: z.array(WebhookEventTypeEnum).min(1).optional(),
  isActive: z.boolean().optional(),
});

export type UpdateWebhook = z.infer<typeof UpdateWebhookSchema>;

// ── Billing ───────────────────────────────────────────────────────────────────

export const CheckoutSessionSchema = z.object({
  plan: z.enum(['PRO', 'STUDIO', 'ENTERPRISE']),
});

export type CheckoutSession = z.infer<typeof CheckoutSessionSchema>;

// ── Common ────────────────────────────────────────────────────────────────────

export interface ApiError {
  error: string;
  code: string;
  details?: unknown;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
