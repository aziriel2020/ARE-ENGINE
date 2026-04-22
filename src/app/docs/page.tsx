import { PublicNav } from '@/components/nav/public-nav';
import { Footer } from '@/components/landing/footer';

export const metadata = {
  title: 'System Docs — ANIMAENGINE',
  description: 'Premium system documentation for operators, developers, and production teams.',
};

const ENDPOINTS = [
  { method: 'POST', path: '/api/generate', desc: 'Flagship generation pipeline (SSE)', plan: 'FREE+' },
  { method: 'POST', path: '/api/generate/score', desc: 'Quality scoring and law verification', plan: 'FREE+' },
  { method: 'POST', path: '/api/generate/regenerate', desc: 'Targeted section re-generation', plan: 'FREE+' },
  { method: 'GET', path: '/api/usage', desc: 'Plan usage and generation limits', plan: 'FREE+' },
  { method: 'GET', path: '/api/usage/costs', desc: 'Per-generation model cost analytics', plan: 'FREE+' },
  { method: 'POST', path: '/api/api-keys', desc: 'Issue integration keys for automation', plan: 'PRO+' },
  { method: 'POST', path: '/api/webhooks', desc: 'Subscribe to generation events', plan: 'STUDIO+' },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'var(--info)',
  POST: 'var(--success)',
  PUT: 'var(--warning)',
  DELETE: 'var(--error)',
};

export default function DocsPage() {
  return (
    <>
      <PublicNav />
      <main style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: "url('/brand/cinematic-waves.svg')", backgroundSize: 'cover', backgroundPosition: 'center top', opacity: 0.5, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,8,12,0.52), rgba(6,8,12,0.96) 50%)', pointerEvents: 'none' }} />

        <section style={{ maxWidth: '1120px', margin: '0 auto', padding: '86px 24px 80px', position: 'relative' }}>
          <div style={{ marginBottom: '34px' }}>
            <h1 style={{ margin: '0 0 14px', fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(40px,7vw,74px)', letterSpacing: '-0.055em', lineHeight: 0.92 }}>
              System Docs for
              <br />
              <span style={{ background: 'linear-gradient(120deg,#C8FF00 0%, #8DFF2F 45%, #6AE6FF 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                elite production teams
              </span>
            </h1>
            <p style={{ margin: 0, maxWidth: '770px', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.8 }}>
              Artist + Theme in, professional package out. Use this page to integrate, automate, and operate ANIMAENGINE at creator, studio, or enterprise scale.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
            <div style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: '14px', padding: '20px', background: 'rgba(12,16,22,0.62)' }}>
              <h2 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px' }}>Core stack</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.75 }}>
                Generation methodology lives in <code style={{ color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>/GRAL</code>. Flagship orchestration runs through Gemini 3.1 Pro to maximize reasoning depth and package coherence.
              </p>
            </div>
            <div style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: '14px', padding: '20px', background: 'rgba(12,16,22,0.62)' }}>
              <h2 style={{ margin: '0 0 10px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '24px' }}>Quick auth</h2>
              <pre style={{ margin: 0, background: 'rgba(0,0,0,0.35)', border: '1px solid var(--border)', borderRadius: '8px', padding: '14px', color: 'var(--accent)', fontSize: '12px', overflowX: 'auto' }}>
{`curl https://animaengine.app/api/generate \\
  -H "x-are-api-key: are_k_your_key_here" \\
  -H "content-type: application/json" \\
  -d '{"prompt":"Artist: cinematic hybrid. Theme: redemption."}'`}
              </pre>
            </div>
          </div>

          <section style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 12px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '30px', letterSpacing: '-0.03em' }}>API Registry</h2>
            <div style={{ border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', background: 'rgba(9,11,15,0.6)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '80px 240px 1fr 80px', gap: '16px', padding: '10px 16px', borderBottom: '1px solid var(--border)' }}>
                {['METHOD', 'PATH', 'DESCRIPTION', 'PLAN'].map((h) => (
                  <span key={h} className="table-header">{h}</span>
                ))}
              </div>
              {ENDPOINTS.map((ep, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '80px 240px 1fr 80px', gap: '16px', padding: '12px 16px', borderBottom: i < ENDPOINTS.length - 1 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: METHOD_COLORS[ep.method] }}>{ep.method}</span>
                  <code style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', color: 'var(--text-primary)' }}>{ep.path}</code>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{ep.desc}</span>
                  <span style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-tertiary)' }}>{ep.plan}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ margin: '0 0 12px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '30px', letterSpacing: '-0.03em' }}>Minimal request body</h2>
            <pre style={{ margin: 0, border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: 'rgba(0,0,0,0.35)', color: 'var(--accent)', fontSize: '12px', overflowX: 'auto' }}>
{`{
  "prompt": "Artist: [reference]. Theme: [story/emotion].",
  "modelTier": "flagship"
}`}
            </pre>
          </section>
        </section>
      </main>
      <Footer />
    </>
  );
}
