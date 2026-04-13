import { z } from 'zod';

const envSchema = z.object({
  ARE_E_TEST_MODE: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  // Clerk (required even in test — free dev tier)
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  // Everything else: optional in test mode, required in prod
  GEMINI_API_KEY: z.string().optional(),
  ANTHROPIC_API_KEY: z.string().optional(),
  DATABASE_URL: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  // Next.js public vars
  NEXT_PUBLIC_APP_URL: z.string().default('http://localhost:3000'),
});

// Validate at module load time — fail fast if env is misconfigured
function parseEnv() {
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => i.path.join('.'))
      .join(', ');
    throw new Error(`Invalid environment variables: ${missing}`);
  }
  return result.data;
}

export const env = parseEnv();
export const IS_TEST_MODE = env.ARE_E_TEST_MODE;
