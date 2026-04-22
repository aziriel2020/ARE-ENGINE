# Vercel Deployment Guide (ANIMAENGINE)

This is a production checklist to deploy ANIMAENGINE on Vercel with Clerk, PostgreSQL, Gemini, Stripe, Upstash, and optional Sentry.

## 1) Create the Vercel project

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, **Add New → Project**.
3. Import this repository.
4. Confirm:
   - **Framework preset**: Next.js
   - **Install command**: `npm ci`
   - **Build command**: `prisma generate && next build`

> These defaults are already defined in `vercel.json`.

## 2) Set production environment variables

Set these in **Project Settings → Environment Variables** for **Production**:

### Required for core app

- `DATABASE_URL` (managed PostgreSQL connection string)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `GEMINI_API_KEY`

### Required for billing flows

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_PRO_PRICE_ID`
- `STRIPE_STUDIO_PRICE_ID`

### Required for rate limiting

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

### Optional (recommended)

- `ANTHROPIC_API_KEY` (fallback model)
- `SENTRY_DSN` (error monitoring)
- `NEXT_PUBLIC_APP_URL` (set to your production domain)

## 3) Configure external providers

## Clerk

- Add your production domain in Clerk allowed origins.
- Confirm redirect URLs for sign-in/sign-up match your Vercel domain.

## Stripe

- Add a webhook endpoint to:
  - `https://<your-domain>/api/webhooks/stripe`
- Subscribe at least to checkout/subscription lifecycle events used by your billing flow.
- Copy webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

## Upstash

- Create a Redis database.
- Copy REST URL/token into the two Upstash env vars.

## 4) Deploy

- Trigger a production deployment from Vercel dashboard (or push to your production branch if auto-deploy is enabled).

## 5) Post-deploy smoke tests

Run these after deployment:

1. Open landing page.
2. Open sign-in/sign-up pages.
3. Check health route:
   - `GET https://<your-domain>/api/health`
4. Create a test generation in the studio.
5. Verify Stripe checkout loads (if billing enabled).

## 6) Troubleshooting

- **Build fails with Prisma**: verify `DATABASE_URL` is present for Production environment.
- **Auth errors**: double-check Clerk publishable/secret keys and allowed domains.
- **Rate-limit failures**: verify Upstash env vars and network access.
- **Billing errors**: verify Stripe keys, price IDs, and webhook secret.

