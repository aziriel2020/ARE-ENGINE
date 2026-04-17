import { PublicNav } from '@/components/nav/public-nav';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'System Docs — ARE-E',
  description: 'ARE-E system documentation for generation workflows, API integration, and production deployment.',
};

const ENDPOINTS = [
  { method: 'POST', path: '/api/generate', desc: 'Run full generation pipeline (SSE stream)', plan: 'FREE+' },
  { method: 'POST', path: '/api/generate/score', desc: 'Score and audit generated content', plan: 'FREE+' },
  { method: 'POST', path: '/api/generate/regenerate', desc: 'Targeted section regeneration', plan: 'FREE+' },
  { method: 'POST', path: '/api/dna', desc: 'Create artist profile context', plan: 'FREE+' },
  { method: 'GET', path: '/api/blueprints', desc: 'List generated packages', plan: 'FREE+' },
  { method: 'POST', path: '/api/api-keys', desc: 'Create API keys for integrations', plan: 'PRO+' },
  { method: 'POST', path: '/api/webhooks', desc: 'Register webhook endpoints', plan: 'STUDIO+' },
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
      <main style={{ maxWidth: '980px', margin: '0 auto', padding: '64px 24px' }}>
        <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '36px', letterSpacing: '-0.02em', marginBottom: '12px' }}>
          ARE-E System + Execution Docs
        </h1>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
          Core promise: Artist + Theme in, full professional package out. The system supports multilingual generation, every genre/sub-genre class, and solo/duet/trio/band structures.
        </p>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '12px' }}>Engine foundation</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '10px' }}>
            The generation methodology is documented in the <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>/GRAL</code> folder, including quickstart, manual, integration, vocabulary, and perfection references.
          </p>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            Flagship generation is orchestrated through Gemini 3.1 Pro to maximize reasoning depth, compositional coherence, and structured package quality.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '16px' }}>Authentication</h2>
          <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`curl https://are-e.app/api/generate \\
  -H "x-are-api-key: are_k_your_key_here" \\
  -H "content-type: application/json" \\
  -d '{"prompt":"Artist: Hans Zimmer style cinematic hybrid. Theme: redemption after collapse."}'`}
          </pre>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '20px' }}>API endpoints</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '70px 240px 1fr 80px', gap: '16px', padding: '8px 16px' }}>
              {['METHOD', 'PATH', 'DESCRIPTION', 'PLAN'].map((h) => (
                <span key={h} className="table-header">{h}</span>
              ))}
            </div>
            {ENDPOINTS.map((ep, i) => (
              <div key={i} className="table-row" style={{ display: 'grid', gridTemplateColumns: '70px 240px 1fr 80px', gap: '16px', padding: '12px 16px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', fontWeight: 700, color: METHOD_COLORS[ep.method] ?? 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                  {ep.method}
                </span>
                <code style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-primary)' }}>{ep.path}</code>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ep.desc}</span>
                <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: ep.plan.startsWith('FREE') ? 'var(--text-tertiary)' : ep.plan.startsWith('PRO') ? 'var(--accent)' : 'var(--info)' }}>
                  {ep.plan}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '16px' }}>Minimal request body</h2>
          <pre style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '20px', fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--accent)', overflowX: 'auto', margin: 0 }}>
{`{
  "prompt": "Artist: [reference]. Theme: [story/emotion].",
  "modelTier": "flagship"
}`}
          </pre>
        </section>
      </main>
      <Footer />
    </>
  );
}
