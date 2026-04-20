'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const TIERS = [
  {
    name: 'Free',
    tag: 'FREE',
    monthlyPrice: 0,
    subtitle: 'Validate the full package.',
    highlight: 'No card needed',
    features: [
      '5 complete generations — free forever',
      'Full Vocal DNA mapping',
      'All 3 laws: Ghost Line, Ugly Emotion, Tear-Drop Detail',
      'Multilingual and cross-genre generation',
      '10-block output on every generation',
      'Suno and Udio prompts included',
    ],
    cta: 'Start Free',
    href: '/sign-up',
    featured: false,
    scale: false,
  },
  {
    name: 'Pro',
    tag: 'PRO',
    monthlyPrice: 299,
    subtitle: 'For professional creators.',
    highlight: '14-day free trial',
    features: [
      '100 generations / month',
      '5 creative profiles for different artist directions',
      'Full 16-law audit + 10 Perfection Modules',
      'Every generation saved, versioned, comparable',
      'PDF, Markdown, TXT export',
      '2 API keys for integrations',
    ],
    cta: 'Start 14-Day Trial',
    href: '/sign-up',
    featured: true,
    scale: true,
  },
  {
    name: 'Studio',
    tag: 'STUDIO',
    monthlyPrice: 799,
    subtitle: 'For studios and label teams.',
    highlight: '14-day free trial',
    features: [
      '500 generations / month',
      '20 creative profiles for roster-scale workflows',
      'All export formats including DOCX + JSON',
      '10 API keys + 5 webhooks',
      'Priority 24h support',
    ],
    cta: 'Start Trial',
    href: '/sign-up',
    featured: false,
    scale: false,
  },
  {
    name: 'Enterprise',
    tag: 'ENTERPRISE',
    monthlyPrice: 2999,
    subtitle: 'For enterprise creative operations.',
    highlight: '30-day pilot',
    features: [
      'Unlimited generations — no caps',
      'Unlimited Vocal DNA profiles',
      'Unlimited API keys + webhooks',
      'Full API-first programmatic access',
      'Dedicated support + uptime SLA',
    ],
    cta: 'Contact Sales',
    href: '/sign-up',
    featured: false,
    scale: false,
  },
];

function formatPrice(monthly: number, annual: boolean) {
  if (monthly === 0) return '$0';
  return `$${(annual ? Math.round(monthly * 0.8) : monthly).toLocaleString()}`;
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section style={{ padding: 'clamp(96px, 12vw, 140px) 32px', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-elevated)', position: 'relative', overflow: 'hidden', backgroundImage: "url('/brand/urban-pricing.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>

      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,7,9,0.58) 0%, rgba(5,7,9,0.9) 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '16px' }}>
              Pricing
            </div>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 0.97, color: 'var(--text-primary)', marginBottom: '16px' }}>
              Launch fast with free generation
              <br />
              <span style={{ background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                then scale when ready.
              </span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '36px', lineHeight: 1.7 }}>
              Start with two parameters, prove value, then pick the tier that matches your production volume.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0', background: 'var(--bg-surface)', border: '1px solid var(--border-hover)', borderRadius: '9px', padding: '3px' }}>
              {[{ label: 'Monthly', value: false }, { label: 'Annual', value: true, badge: 'Save 20%' }].map((opt) => (
                <button key={String(opt.value)} onClick={() => setAnnual(opt.value)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 20px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '13px', fontFamily: 'Space Grotesk, sans-serif', fontWeight: annual === opt.value ? 600 : 400, color: annual === opt.value ? 'var(--text-primary)' : 'var(--text-secondary)', background: annual === opt.value ? 'var(--bg-active)' : 'transparent', transition: 'all 150ms ease', letterSpacing: '-0.01em' }}>
                  {opt.label}
                  {opt.badge && (
                    <span style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: annual === opt.value ? 'var(--accent)' : 'var(--text-ghost)', padding: '2px 6px', border: `1px solid ${annual === opt.value ? 'rgba(200,255,0,0.2)' : 'transparent'}`, borderRadius: '4px', background: annual === opt.value ? 'rgba(200,255,0,0.06)' : 'transparent', transition: 'all 150ms ease' }}>
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', alignItems: 'start' }}>
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 60}>
              <div style={{
                background: tier.featured ? 'rgba(18,22,26,0.9)' : 'rgba(11,14,18,0.84)',
                border: `1px solid ${tier.featured ? 'rgba(200,255,0,0.3)' : 'var(--border)'}`,
                borderRadius: '16px', padding: '28px 24px',
                display: 'flex', flexDirection: 'column', gap: '24px',
                position: 'relative',
                transform: tier.scale ? 'scale(1.03)' : 'none', transformOrigin: 'top center',
                boxShadow: tier.featured ? '0 0 60px rgba(200,255,0,0.08), 0 24px 48px rgba(0,0,0,0.5)' : '0 8px 24px rgba(0,0,0,0.3)',
                zIndex: tier.featured ? 1 : 0,
              }}>
                {tier.featured && (
                  <>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', borderRadius: '16px 16px 0 0', background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }} />
                    <div style={{ position: 'absolute', top: '-11px', left: '50%', transform: 'translateX(-50%)', background: 'var(--accent)', color: '#000', fontSize: '9px', fontFamily: 'IBM Plex Mono, monospace', fontWeight: 700, padding: '3px 12px', letterSpacing: '0.12em', borderRadius: '99px', whiteSpace: 'nowrap' }}>
                      MOST POPULAR
                    </div>
                  </>
                )}

                <div>
                  <div style={{ fontSize: '10px', fontFamily: 'IBM Plex Mono, monospace', color: tier.featured ? 'var(--accent)' : 'var(--text-ghost)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {tier.tag}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '40px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.05em', lineHeight: 1, transition: 'all 200ms ease' }}>
                      {formatPrice(tier.monthlyPrice, annual)}
                    </span>
                    {tier.monthlyPrice > 0 && <span style={{ fontSize: '13px', color: 'var(--text-ghost)' }}>/mo</span>}
                  </div>
                  {annual && tier.monthlyPrice > 0 && (
                    <div style={{ fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--success)', marginBottom: '4px' }}>
                      ${(tier.monthlyPrice * 12 * 0.8).toLocaleString()} billed annually
                    </div>
                  )}
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{tier.subtitle}</div>
                  <div style={{ fontSize: '11px', color: tier.featured ? 'var(--accent)' : 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.04em' }}>
                    {tier.highlight}
                  </div>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <svg style={{ flexShrink: 0, marginTop: '2px' }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="6" stroke="rgba(200,255,0,0.25)" strokeWidth="1"/>
                        <path d="M4 6.5l2 2 3.5-3.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link href={tier.href} className={tier.featured ? 'btn-primary' : 'btn'} style={{ textAlign: 'center', marginTop: 'auto', borderRadius: '9px', padding: '12px', fontSize: '14px', fontWeight: tier.featured ? 700 : 500 }}>
                  {tier.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {annual && (
          <Reveal delay={200}>
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', fontFamily: 'IBM Plex Mono, monospace', color: 'var(--text-ghost)', letterSpacing: '0.04em' }}>
              Annual plans billed as a single payment · Full refund if cancelled before renewal
            </p>
          </Reveal>
        )}

      </div>
    </section>
  );
}

export default PricingSection;
