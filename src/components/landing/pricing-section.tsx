import Link from 'next/link';

const TIERS = [
  {
    name: 'FREE',
    price: '$0',
    period: '/mo',
    subtitle: 'Try it out',
    features: [
      '5 generations/month',
      '1 DNA profile',
      'Fast model (2.5 Flash)',
      'Text export only',
      'Community support',
    ],
    cta: 'Start Free',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'PRO',
    price: '$299',
    period: '/mo',
    subtitle: 'For serious artists',
    features: [
      '100 generations/month',
      '5 DNA profiles',
      'Flagship model (3.1 Pro)',
      '28-Law quality scoring',
      'Blueprint history + diff',
      'TXT / MD / PDF export',
      '2 API keys',
      'Email support',
      '14-day free trial',
    ],
    cta: 'Start Trial',
    href: '/sign-up',
    featured: true,
  },
  {
    name: 'STUDIO',
    price: '$799',
    period: '/mo',
    subtitle: 'For studios & teams',
    features: [
      '500 generations/month',
      '20 DNA profiles',
      'Flagship model',
      'All export formats + DOCX + JSON',
      '10 API keys',
      '5 webhook endpoints',
      'Priority support',
      '14-day free trial',
    ],
    cta: 'Start Trial',
    href: '/sign-up',
    featured: false,
  },
  {
    name: 'ENTERPRISE',
    price: '$2,999',
    period: '/mo',
    subtitle: 'For labels & platforms',
    features: [
      'Unlimited generations',
      'Unlimited DNA profiles',
      'Unlimited API keys',
      'Unlimited webhooks',
      'API-first access',
      'Dedicated support',
      'Custom SLA',
      '30-day free trial',
    ],
    cta: 'Contact Sales',
    href: '/sign-up',
    featured: false,
  },
];

export function PricingSection() {
  return (
    <section
      style={{
        padding: '80px 24px',
        background: 'var(--bg-elevated)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p
            style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '11px',
              color: 'var(--text-tertiary)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            Pricing
          </p>
          <h2
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(24px, 4vw, 40px)',
              letterSpacing: '-0.02em',
            }}
          >
            93–97% margin per generation.<br />
            <span style={{ color: 'var(--accent)' }}>Yours gets passed on.</span>
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
          }}
        >
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              style={{
                background: tier.featured ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                border: `1px solid ${tier.featured ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '4px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                position: 'relative',
              }}
            >
              {tier.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-1px',
                    left: '24px',
                    background: 'var(--accent)',
                    color: '#000',
                    fontSize: '10px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontWeight: 700,
                    padding: '2px 8px',
                    letterSpacing: '0.1em',
                  }}
                >
                  MOST POPULAR
                </div>
              )}

              <div>
                <div
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    marginBottom: '4px',
                  }}
                >
                  {tier.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '32px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                    }}
                  >
                    {tier.price}
                  </span>
                  <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
                    {tier.period}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {tier.subtitle}
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {tier.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '10px', marginTop: '3px', flexShrink: 0 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={tier.featured ? 'btn-primary' : 'btn'}
                style={{ textAlign: 'center', marginTop: 'auto' }}
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
