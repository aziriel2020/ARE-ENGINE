import { z } from 'zod';

const envSchema = z.object({
  ARE_E_TEST_MODE: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
  // Clerk keys — required at runtime, optional during `next build`
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().default(''),
  CLERK_SECRET_KEY: z.string().default(''),
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

// Validate at module load — but don't throw for missing Clerk keys at build time.
// Clerk keys use empty-string defaults so the build succeeds; the Clerk SDK
// will throw its own descriptive error at runtime if they're still empty.
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
