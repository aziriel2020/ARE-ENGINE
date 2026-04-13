export type PlanName = 'FREE' | 'PRO' | 'STUDIO' | 'ENTERPRISE';
export type ModelTier = 'flagship' | 'fast';
export type ExportFormat = 'txt' | 'md' | 'pdf' | 'docx' | 'json' | 'api';
export type SupportLevel = 'community' | 'email' | 'priority' | 'dedicated';

export interface PlanLimits {
  generationsPerMonth: number; // -1 = unlimited
  dnaProfiles: number; // -1 = unlimited
  apiKeys: number; // -1 = unlimited
  webhooks: number; // -1 = unlimited
  modelTier: ModelTier;
  qualityScoring: boolean;
  blueprintHistory: boolean;
  exportFormats: ExportFormat[];
  supportLevel: SupportLevel;
  price: number; // cents per month
  trialDays: number;
}

export const PLAN_LIMITS: Record<PlanName, PlanLimits> = {
  FREE: {
    generationsPerMonth: 5,
    dnaProfiles: 1,
    apiKeys: 0,
    webhooks: 0,
    modelTier: 'fast',
    qualityScoring: false,
    blueprintHistory: false,
    exportFormats: ['txt'],
    supportLevel: 'community',
    price: 0,
    trialDays: 0,
  },
  PRO: {
    generationsPerMonth: 100,
    dnaProfiles: 5,
    apiKeys: 2,
    webhooks: 0,
    modelTier: 'flagship',
    qualityScoring: true,
    blueprintHistory: true,
    exportFormats: ['txt', 'md', 'pdf'],
    supportLevel: 'email',
    price: 29900, // $299/mo in cents
    trialDays: 14,
  },
  STUDIO: {
    generationsPerMonth: 500,
    dnaProfiles: 20,
    apiKeys: 10,
    webhooks: 5,
    modelTier: 'flagship',
    qualityScoring: true,
    blueprintHistory: true,
    exportFormats: ['txt', 'md', 'pdf', 'docx', 'json'],
    supportLevel: 'priority',
    price: 79900, // $799/mo
    trialDays: 14,
  },
  ENTERPRISE: {
    generationsPerMonth: -1, // unlimited
    dnaProfiles: -1,
    apiKeys: -1,
    webhooks: -1,
    modelTier: 'flagship',
    qualityScoring: true,
    blueprintHistory: true,
    exportFormats: ['txt', 'md', 'pdf', 'docx', 'json', 'api'],
    supportLevel: 'dedicated',
    price: 299900, // $2999/mo
    trialDays: 30,
  },
} as const;

/** Check if a plan is at or above a target plan in the hierarchy */
export function planAtLeast(userPlan: PlanName, required: PlanName): boolean {
  const order: PlanName[] = ['FREE', 'PRO', 'STUDIO', 'ENTERPRISE'];
  return order.indexOf(userPlan) >= order.indexOf(required);
}

/** Format a price in cents to display string */
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Free';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(cents / 100);
}
