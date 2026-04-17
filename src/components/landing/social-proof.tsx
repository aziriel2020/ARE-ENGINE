import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const TESTIMONIALS = [
  {
    quote: 'I gave it my artist reference and a theme. The first verse came back with a line I\'ve been trying to write for two years — the specific object, the exact feeling I couldn\'t name. I didn\'t change a word.',
    author: 'Malik D.',
    role: 'Songwriter / rapper',
    detail: 'Uses ARE for French and English',
    initials: 'MD',
    color: '#8B5CF6',
  },
  {
    quote: 'I produce for 14 artists. Before ARE, maintaining their individual voices meant hours of rewriting. Now I build a Vocal DNA per artist and the output sounds like them — not like me guessing what they\'d say.',
    author: 'Elias M.',
    role: 'Producer',
    detail: '80M+ streams, Studio plan',
    initials: 'EM',
    color: '#F59E0B',
  },
  {
    quote: 'The Suno prompts it generates are exactly what I needed. Full production spec, style tags, mood — everything. My track went from prompt to published in one afternoon. I\'ve never moved that fast.',
    author: 'Clara V.',
    role: 'AI music creator',
    detail: 'Suno + Udio, 200K plays',
    initials: 'CV',
    color: '#0EA5E9',
  },
  {
    quote: 'Quality control used to eat 30% of our A&R time. Now I can read the audit score before I read a single line. A song at 100/100 with Ghost Line confirmed goes straight to the A-list. That\'s a new workflow.',
    author: 'Sofia R.',
    role: 'A&R Manager',
    detail: 'Indie label, Enterprise plan',
    initials: 'SR',
    color: '#10B981',
  },
  {
    quote: 'The bridge made me uncomfortable. That\'s exactly why I knew it was the right line. ARE found the thing I was avoiding saying. That\'s the Ugly Emotion — and it\'s the best line in the song.',
    author: 'Jade T.',
    role: 'Singer-songwriter',
    detail: '45K monthly listeners',
    initials: 'JT',
    color: '#EC4899',
  },
  {
    quote: 'I\'ve been writing in French and English my entire career. ARE is the first tool that respects both languages at the same level — full cliché kill lists, proper prosody, rhyme architecture for each. Nothing else does that.',
    author: 'Antoine B.',
    role: 'Bilingual artist',
    detail: 'FR + EN releases, Pro plan',
    initials: 'AB',
    color: '#6366F1',
  },
];

const METRICS = [
  { value: '< 4 min',  label: 'input to 10-block output' },
  { value: '220+',     label: 'clichés banned per generation' },
  { value: '100/100',  label: 'mandatory score, every time' },
  { value: 'FR + EN',  label: 'bilingual, full system in both' },
];

export function SocialProof() {
  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', position: 'relative', overflow: 'hidden' }}>

      <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '900px', height: '350px', background: 'radial-gradient(ellipse at center bottom, rgba(200,255,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Real artists · Real songs
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(32px, 4.5vw, 56px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)' }}>
              Songwriters. Producers. A&R.
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Suno creators. All of them.
              </span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={40}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid var(--border)', borderRadius: '14px', overflow: 'hidden', background: 'var(--bg-elevated)', marginBottom: '48px' }}>
            {METRICS.map((m, i) => (
              <div key={m.label} style={{ padding: '28px 24px', textAlign: 'center', borderRight: i < METRICS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(20px, 2.5vw, 36px)', fontWeight: 700, letterSpacing: '-0.05em', color: 'var(--accent)', lineHeight: 1, marginBottom: '8px' }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.04em' }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '56px', color: 'rgba(200,255,0,0.1)', lineHeight: 0.8, userSelect: 'none', marginBottom: '-8px' }}>
                  &ldquo;
                </div>
                <p style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.85, flex: 1, fontWeight: 400 }}>
                  {t.quote}
                </p>
                <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff' }}>
                    {t.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                      {t.author}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                      {t.role} · {t.detail}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div style={{ textAlign: 'center', marginTop: '56px' }}>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
              Join 500+ artists, producers, and creators who stopped fighting generic AI.
            </p>
            <Link href="/sign-up" className="btn-primary" style={{ fontSize: '15px', padding: '14px 36px', borderRadius: '9px', fontWeight: 700 }}>
              Start Free — No Card Required
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export default SocialProof;
