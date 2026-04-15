import Link from 'next/link';

const TIERS = [
  {
    name: 'Free',
    tag: 'FREE',
    price: '$0',
    period: '/mo',
    subtitle: 'Explore the engine',
    features: [
      '5 generations / month',
      '1 Vocal DNA profile',
      'Gemini 2.5 Flash model',
      'Text export',
      'Community support',
    ],
    cta: 'Start Free',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'Pro',
    tag: 'PRO',
    price: '$299',
    period: '/mo',
    subtitle: 'For serious artists',
    features: [
      '100 generations / month',
      '5 Vocal DNA profiles',
      'Gemini 2.5 Pro flagship model',
      '28-Law quality scoring',
      'Blueprint history & versioning',
      'TXT / MD / PDF export',
      '2 API keys',
      '14-day free trial',
    ],
    cta: 'Start 14-day Trial',
    href: '/sign-up',
    featured: true,
  },
  {
    name: 'Studio',
    tag: 'STUDIO',
    price: '$799',
    period: '/mo',
    subtitle: 'For studios & teams',
    features: [
      '500 generations / month',
      '20 Vocal DNA profiles',
      'Flagship model + context cache',
      'All export formats + DOCX + JSON',
      '10 API keys · 5 webhooks',
      'Priority support',
      '14-day free trial',
    ],
    cta: 'Start Trial',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'Enterprise',
    tag: 'ENTERPRISE',
    price: '$2,999',
    period: '/mo',
    subtitle: 'For labels & platforms',
    features: [
      'Unlimited generations',
      'Unlimited DNA profiles',
      'Unlimited API keys & webhooks',
      'API-first access',
      'Dedicated support & SLA',
      '30-day free trial',
    ],
    cta: 'Contact Sales',
    href: '/sign-up',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1120px', margin: '0 auto' }}>

        {/* Section label */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{
            display: 'inline-block',
            fontSize: '10px',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Pricing
          </div>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            93–97% margin per generation.
            <br />
            <span style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #90FF00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Yours gets passed on.
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px',
          alignItems: 'start',
        }}>
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.featured ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                border: `1px solid ${tier.featured ? 'rgba(200,255,0,0.35)' : 'var(--border)'}`,
                borderRadius: '12px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                boxShadow: tier.featured ? '0 0 40px rgba(200,255,0,0.07), 0 0 0 1px rgba(200,255,0,0.1) inset' : 'none',
              }}
            >
              {tier.featured && (
                <div style={{
                  position: 'absolute',
                  top: '-11px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--accent)',
                  color: '#000',
                  fontSize: '10px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontWeight: 700,
                  padding: '3px 12px',
                  letterSpacing: '0.1em',
                  borderRadius: '99px',
                  whiteSpace: 'nowrap',
                }}>
                  MOST POPULAR
                </div>
              )}

              <div>
                <div style={{
                  fontSize: '10px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: tier.featured ? 'var(--accent)' : 'var(--text-tertiary)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  fontWeight: 500,
                }}>
                  {tier.tag}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                  <span style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}>
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-tertiary)', letterSpacing: '-0.01em' }}>
                    {tier.period}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  {tier.subtitle}
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {tier.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <svg style={{ flexShrink: 0, marginTop: '2px' }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                      <circle cx="6.5" cy="6.5" r="6" stroke="rgba(200,255,0,0.3)" strokeWidth="1"/>
                      <path d="M4 6.5l2 2 3.5-3.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={tier.featured ? 'btn-primary' : 'btn'}
                style={{
                  textAlign: 'center',
                  marginTop: 'auto',
                  borderRadius: '8px',
                  padding: '11px',
                  fontSize: '14px',
                  fontWeight: tier.featured ? 700 : 500,
                }}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;
