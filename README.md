# ARE-E V3.0 — Opus Supreme

**Domain-specific creative intelligence for lyric generation.**  
Multi-model AI pipeline · 28-Law quality scoring · Vocal DNA identity system

---

## Overview

ARE-E (Artistic Rendering Engine) generates professional-grade song blueprints by fusing a 4-stage AI pipeline with a proprietary 28-Law quality scoring framework. Every output is evaluated against the artist's Vocal DNA — a 7-vector identity profile capturing lexical, emotional, rhythmic, thematic, sonic, structural, and influence dimensions.

### Key features

| Feature | Detail |
|---|---|
| **Multi-model routing** | Gemini 2.5 Pro (flagship) → Gemini 2.5 Flash (fast) → Claude Sonnet 4.6 (fallback) |
| **Vocal DNA** | 7-vector artist identity profile, versioned, stored in JSONB |
| **28-Law scoring** | Weighted quality rubric: S ≥ 95 / A ≥ 85 / B ≥ 70 / C ≥ 60 / F < 60 |
| **4-stage pipeline** | Intent decomp → streaming generation → quality scoring → targeted re-gen |
| **Context caching** | Gemini context cache pins knowledge base + DNA between calls |
| **Streaming SSE** | Server-Sent Events with section-typed chunks + keep-alive heartbeat |
| **Plan gating** | FREE (5 gens/mo) · PRO (200) · STUDIO (1000) · ENTERPRISE (unlimited) |
| **Dual auth** | Clerk session OR `x-are-api-key` header |

---

## Tech stack

- **Framework**: Next.js 14.2 App Router (all routes `force-dynamic`)
- **Language**: TypeScript 5 strict mode — zero `any`
- **Database**: Prisma 6 + SQLite (local) / PostgreSQL via Supabase (production)
- **Auth**: Clerk v5 (session + API key dual auth)
- **AI**: `@google/genai` + `@anthropic-ai/sdk`
- **Rate limiting**: Upstash Redis + `@upstash/ratelimit`
- **Payments**: Stripe (checkout + billing portal + webhooks)
- **Error tracking**: Sentry (disabled in test mode)
- **UI**: Radix UI + Tailwind CSS + Lucide Icons + Framer Motion
- **Testing**: Vitest + jsdom + Testing Library
- **CI/CD**: GitHub Actions → Vercel

---

## Project structure

```
are-engine/
├── prisma/
│   ├── schema.prisma          # Data models
│   └── seed.ts                # Dev seed data (JCAY + 3 blueprints)
├── src/
│   ├── app/
│   │   ├── api/               # 20+ API routes
│   │   │   ├── generate/      # POST (SSE stream), /score, /regenerate
│   │   │   ├── blueprints/    # CRUD
│   │   │   ├── dna/           # Vocal DNA CRUD
│   │   │   ├── usage/         # Usage stats + cost breakdown
│   │   │   ├── api-keys/      # API key management
│   │   │   ├── webhooks/      # Webhook endpoints + deliveries
│   │   │   ├── billing/       # Stripe checkout + portal
│   │   │   ├── admin/         # Stats, users, costs
│   │   │   └── health/        # Health check
│   │   ├── studio/            # Main app (generate, blueprints, DNA, analytics)
│   │   ├── (auth)/            # Clerk sign-in / sign-up
│   │   ├── onboarding/        # First-run flow
│   │   ├── admin/             # Admin dashboard
│   │   ├── pricing/           # Pricing page
│   │   └── docs/              # API docs
│   ├── components/
│   │   ├── landing/           # Marketing page sections
│   │   ├── nav/               # Navigation
│   │   ├── studio/            # Studio UI (sidebar, quality radar)
│   │   └── ui/                # Toast, shared primitives
│   └── lib/
│       ├── engine/            # AI router, generator, quality scorer, context cache
│       ├── schemas/           # Zod: vocal-dna, blueprint, api
│       ├── constants/         # Plans, 28 Laws
│       ├── prompts/           # System + generation + scoring prompts
│       ├── mocks/             # Test-mode mock data (DNA, blueprints, usage, streaming)
│       ├── api/               # Auth, rate-limit, plan-gate, errors, audit
│       ├── webhooks/          # Delivery engine
│       └── config/env.ts      # Env + IS_TEST_MODE flag
├── .github/workflows/ci.yml   # Lint → Test → Build → Deploy
├── sentry.client.config.ts
├── sentry.server.config.ts
├── sentry.edge.config.ts
└── vercel.json
```

---

## Getting started

### Prerequisites

- Node 20+
- A Clerk project (publishable key + secret key)
- Optional: Gemini API key, Anthropic API key, Supabase project, Stripe account

### Local setup

```bash
git clone https://github.com/aziriel2020/are-engine
cd are-engine
npm ci

# Copy and fill in env vars
cp .env.example .env.local

# Generate Prisma client + create local SQLite DB
npx prisma generate
npx prisma db push

# Seed dev data (JCAY + 3 blueprints)
npm run db:seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | SQLite: `file:./dev.db` · PostgreSQL: `postgresql://...` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key |
| `GEMINI_API_KEY` | Prod | Google Gemini API key |
| `ANTHROPIC_API_KEY` | Prod | Anthropic Claude API key (fallback) |
| `UPSTASH_REDIS_REST_URL` | Prod | Upstash Redis URL for rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | Prod | Upstash Redis token |
| `STRIPE_SECRET_KEY` | Prod | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Prod | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Prod | Stripe publishable key |
| `STRIPE_PRO_PRICE_ID` | Prod | Stripe price ID for PRO plan |
| `STRIPE_STUDIO_PRICE_ID` | Prod | Stripe price ID for STUDIO plan |
| `SENTRY_DSN` | Prod | Sentry DSN (Sentry disabled if unset) |
| `ARE_E_TEST_MODE` | CI | Set `true` to bypass all external services |

---

## Test mode

Set `ARE_E_TEST_MODE=true` to run the full app without real API keys. All AI calls, DB writes, and payment flows are replaced with deterministic mock data.

This is used in CI and lets you develop the UI without billing.

---

## Development commands

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run test          # Vitest unit tests (61 tests, 5 suites)
npm run test:watch    # Watch mode
npm run lint          # ESLint
npm run type-check    # tsc --noEmit
npm run db:generate   # Re-generate Prisma client after schema changes
npm run db:push       # Push schema to local DB (no migration file)
npm run db:studio     # Open Prisma Studio
npm run db:seed       # Seed dev data
```

---

## API reference

See [`docs/API.md`](docs/API.md) for the full REST API reference.

Quick summary:

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/generate` | Start generation (SSE stream) |
| `POST` | `/api/generate/score` | Score an existing blueprint |
| `POST` | `/api/generate/regenerate` | Re-generate failing sections |
| `GET` | `/api/blueprints` | List blueprints |
| `GET` | `/api/blueprints/:id` | Get blueprint |
| `DELETE` | `/api/blueprints/:id` | Delete blueprint |
| `GET/POST` | `/api/dna` | List / create Vocal DNA profiles |
| `GET/PUT/DELETE` | `/api/dna/:id` | Get / update / delete profile |
| `GET` | `/api/usage` | Current usage stats |
| `GET` | `/api/usage/history` | 12-month history |
| `GET` | `/api/usage/costs` | Per-blueprint cost breakdown |
| `GET/POST` | `/api/api-keys` | List / create API keys |
| `DELETE` | `/api/api-keys/:id` | Revoke API key |
| `GET` | `/api/health` | Health check |

**Authentication**: `Authorization: Bearer <clerk-session-token>` or `x-are-api-key: <key>`.

---

## SSE streaming protocol

`POST /api/generate` returns `text/event-stream`. Each event is:

```
data: {"section":"verse_1","content":"..text chunk.."}\n\n
```

Section values: `verse_1` · `verse_2` · `verse_3` · `chorus` · `bridge` · `outro` · `intro` · `production_notes` · `suno_prompt` · `complete` · `error`

The `complete` event payload contains `{ blueprintId, qualityReport }`.

Keep-alive comments (`: heartbeat`) are sent every 8 seconds to prevent proxy timeouts.

---

## Quality scoring — 28 Laws

The scoring engine evaluates every blueprint against 28 weighted laws grouped into 5 categories:

| Category | Laws | Weight |
|---|---|---|
| Core Identity | 1–4 | 3× |
| DNA Adherence | 5–10 | 2× |
| Lexical | 11–17 | 1× |
| Emotional / Rhythmic | 18–23 | 1× |
| Thematic / Influence | 24–28 | 1× |

Grade thresholds: **S** ≥ 95 · **A** ≥ 85 · **B** ≥ 70 · **C** ≥ 60 · **F** < 60

Blueprints graded C or F automatically trigger up to 2 targeted re-generation cycles.

---

## Vocal DNA schema

```jsonc
{
  "version": 1,
  "artistName": "JCAY",
  "lexical":    { "vocabularyTier", "slangDensity", "bannedWords", ... },
  "emotional":  { "primaryAxis", "intensityRange", "angerExpression", ... },
  "rhythmic":   { "defaultFlow", "bpm_range", "rhymeScheme", ... },
  "thematic":   { "coreThemes", "recurringSymbols", "avoidedTopics", ... },
  "sonic":      { "primaryGenres", "instrumentalAffinities", ... },
  "structural": { "preferredStructure", "avgVerseLines", "chorusStyle", ... },
  "influences": { "directInfluences", "antiInfluences", "culturalRoots" }
}
```

Full Zod schema: [`src/lib/schemas/vocal-dna.ts`](src/lib/schemas/vocal-dna.ts)

---

## CI/CD

GitHub Actions runs on push to `main`/`develop` and on PRs to `main`:

1. **Lint & Type Check** — ESLint + `tsc --noEmit`
2. **Unit Tests** — Vitest with SQLite (all external services mocked)
3. **Production Build** — `next build`
4. **Deploy Preview** — Vercel preview (PRs only)
5. **Deploy Production** — Vercel production (main only)

---

## License

Private — all rights reserved.
