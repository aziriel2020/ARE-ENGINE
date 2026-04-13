import { PublicNav } from '@/components/nav/public-nav';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'API Docs — ARE-E',
  description: 'ARE-E API documentation. Generate blueprints, manage DNA profiles, and integrate with your workflow.',
};

const ENDPOINTS = [
  { method: 'POST', path: '/api/generate', auth: 'Bearer / API Key', desc: 'Start blueprint generation (SSE stream)', plan: 'FREE+' },
  { method: 'GET', path: '/api/blueprints', auth: 'Bearer / API Key', desc: 'List blueprints (paginated)', plan: 'FREE+' },
  { method: 'GET', path: '/api/blueprints/:id', auth: 'Bearer / API Key', desc: 'Get blueprint with quality report', plan: 'FREE+' },
  { method: 'POST', path: '/api/dna', auth: 'Bearer / API Key', desc: 'Create DNA profile from samples', plan: 'FREE+' },
  { method: 'GET', path: '/api/dna', auth: 'Bearer / API Key', desc: 'List DNA profiles', plan: 'FREE+' },
  { method: 'PUT', path: '/api/dna/:id', auth: 'Bearer / API Key', desc: 'Update DNA profile (new version)', plan: 'FREE+' },
  { method: 'GET', path: '/api/usage', auth: 'Bearer / API Key', desc: 'Current month usage', plan: 'FREE+' },
  { method: 'POST', path: '/api/api-keys', auth: 'Bearer (Clerk)', desc: 'Create API key', plan: 'PRO+' },
  { method: 'POST', path: '/api/webhooks', auth: 'Bearer (Clerk)', desc: 'Register webhook endpoint', plan: 'STUDIO+' },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'var(--info)',
  POST: 'var(--success)',
  PUT: 'var(--warning)',
  PATCH: 'var(--warning)',
  DELETE: 'var(--error)',
};

export default function DocsPage() {
  return (
    <>
      <PublicNav />
      <main style={{ maxWidth: '960px', margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '36px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          API Reference
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '48px' }}>
          ARE-E V3.0 REST API. All endpoints return JSON. Authentication via Clerk session
          (web) or <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', fontSize: '13px' }}>x-are-api-key</code> header (B2B).
        </p>

        {/* Auth */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Authentication
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Web app routes use Clerk session auth automatically. For B2B API access:
          </p>
          <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`curl https://are-e.app/api/blueprints \\
  -H "x-are-api-key: are_k_your_key_here"`}
          </pre>
        </section>

        {/* Rate limiting */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Rate Limiting
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Sliding window rate limiting via Upstash Redis. Limits are plan-based.
            Exceeded: <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--error)' }}>429 Too Many Requests</code> with{' '}
            <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-secondary)' }}>Retry-After</code> header.
          </p>
        </section>

        {/* Endpoints */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '20px' }}>
            Endpoints
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '60px 220px 1fr 80px', gap: '16px', padding: '8px 16px' }}>
              {['METHOD', 'PATH', 'DESCRIPTION', 'PLAN'].map((h) => (
                <span key={h} className="table-header">{h}</span>
              ))}
            </div>
            {ENDPOINTS.map((ep, i) => (
              <div
                key={i}
                className="table-row"
                style={{ display: 'grid', gridTemplateColumns: '60px 220px 1fr 80px', gap: '16px', padding: '12px 16px', alignItems: 'center' }}
              >
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', fontWeight: 700, color: METHOD_COLORS[ep.method] ?? 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                  {ep.method}
                </span>
                <code style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-primary)' }}>
                  {ep.path}
                </code>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ep.desc}</span>
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: ep.plan.startsWith('FREE') ? 'var(--text-tertiary)' : ep.plan.startsWith('PRO') ? 'var(--accent)' : 'var(--info)' }}>
                  {ep.plan}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Generate endpoint detail */}
        <section style={{ marginBottom: '48px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            POST /api/generate
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Streams blueprint generation via Server-Sent Events. Each chunk includes a section tag.
          </p>
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '12px' }}>Request Body</h3>
            <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`{
  "prompt": "Write a defiant trap track about...",
  "dnaProfileId": "dna_abc123",  // optional
  "modelTier": "flagship"        // "flagship" | "fast"
}`}
            </pre>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '12px' }}>SSE Stream Format</h3>
            <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`data: {"section": "verse_1", "content": "Téléphone éteint..."}
data: {"section": "chorus", "content": "Nuits froides..."}
data: {"section": "production_notes", "content": "Tempo: 92 BPM..."}
data: {"section": "suno_prompt", "content": "[rap français]..."}
data: {"section": "__complete__", "content": "{\"blueprintId\": \"bp_xyz\", \"qualityReport\": {...}}"}
data: [DONE]`}
            </pre>
          </div>
        </section>

        {/* Webhooks */}
        <section>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', letterSpacing: '-0.01em', marginBottom: '16px' }}>
            Webhooks
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            Webhook payloads are signed with HMAC-SHA256. Verify the{' '}
            <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>X-ARE-Signature</code> header.
          </p>
          <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`// Verify signature (Node.js)
const signature = crypto
  .createHmac('sha256', process.env.ARE_WEBHOOK_SECRET)
  .update(rawBody)
  .digest('hex');

if (signature !== req.headers['x-are-signature']) {
  return res.status(400).send('Invalid signature');
}

// Payload shape
{
  "id": "wh_1234567890_abc123",
  "type": "BLUEPRINT_COMPLETED",
  "timestamp": "2026-04-13T12:00:00.000Z",
  "data": {
    "blueprintId": "bp_xyz",
    "grade": "A",
    "aggregateScore": 88
  }
}`}
          </pre>
        </section>
      </main>
      <Footer />
    </>
  );
}
