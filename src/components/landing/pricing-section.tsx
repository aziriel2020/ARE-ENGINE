'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Reveal } from './scroll-reveal';

const TIERS = [
  {
    name: 'Free',
    tag: 'FREE',
    monthlyPrice: 0,
    period: '/mo',
    subtitle: 'Map your voice, test the engine',
    features: [
      '5 complete song blueprints / month',
      '1 voice profile — map your identity',
      'Powered by Gemini 2.5 Flash',
      'Export your blueprints as text',
      'Community support',
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
    period: '/mo',
    subtitle: 'The full experience — for artists who are serious',
    features: [
      '100 song blueprints / month',
      '5 voice profiles — write for multiple artists',
      'Flagship Gemini 2.5 Pro model',
      'Full 28-law quality scoring + grades',
      'Every draft saved, versioned, comparable',
      'Export as TXT, PDF, or Markdown',
      '2 API keys — start building',
      '14-day free trial — no card required',
    ],
    cta: 'Start 14-day Trial',
    href: '/sign-up',
    featured: true,
    scale: true,
  },
  {
    name: 'Studio',
    tag: 'STUDIO',
    monthlyPrice: 799,
    period: '/mo',
    subtitle: 'Scale your creative roster',
    features: [
      '500 blueprints / month',
      '20 voice profiles — your full roster',
      'Gemini 2.5 Pro + 90% cost reduction via cache',
      'Every export format including DOCX + JSON',
      '10 API keys + 5 webhooks',
      'Priority support with 24h response',
      '14-day free trial',
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
    period: '/mo',
    subtitle: 'Build the infrastructure — for labels and platforms',
    features: [
      'Unlimited blueprints — no caps, ever',
      'Unlimited voice profiles',
      'Unlimited API keys and webhooks',
      'API-first — full programmatic control',
      'Dedicated support + uptime SLA',
      '30-day pilot — prove it works',
    ],
    cta: 'Contact Sales',
    href: '/sign-up',
    featured: false,
    scale: false,
  },
];

function formatPrice(monthly: number, annual: boolean) {
  if (monthly === 0) return '$0';
  const price = annual ? Math.round(monthly * 0.8) : monthly;
  return `$${price.toLocaleString()}`;
}

export function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section style={{
      padding: 'clamp(80px, 10vw, 120px) 32px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Glow */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(200,255,0,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1120px', margin: '0 auto', position: 'relative' }}>

        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
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
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 700,
              letterSpacing: '-0.045em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: '40px',
            }}>
              Start free. Scale when
              <br />
              <span style={{
                background: 'linear-gradient(120deg, var(--accent) 0%, #A8FF00 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                you&apos;re ready.
              </span>
            </h2>

            {/* Annual/monthly toggle */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0',
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-hover)',
              borderRadius: '8px',
              padding: '3px',
            }}>
              {[
                { label: 'Monthly', value: false },
                { label: 'Annual', value: true, badge: 'Save 20%' },
              ].map((opt) => (
                <button
                  key={String(opt.value)}
                  onClick={() => setAnnual(opt.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '7px 18px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: annual === opt.value ? 600 : 400,
                    color: annual === opt.value ? 'var(--text-primary)' : 'var(--text-secondary)',
                    background: annual === opt.value ? 'var(--bg-active)' : 'transparent',
                    transition: 'all 150ms ease',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {opt.label}
                  {opt.badge && (
                    <span style={{
                      fontSize: '10px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: annual === opt.value ? 'var(--accent)' : 'var(--text-ghost)',
                      padding: '2px 6px',
                      border: `1px solid ${annual === opt.value ? 'rgba(200,255,0,0.2)' : 'transparent'}`,
                      borderRadius: '4px',
                      background: annual === opt.value ? 'rgba(200,255,0,0.06)' : 'transparent',
                      transition: 'all 150ms ease',
                    }}>
                      {opt.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          alignItems: 'start',
        }}>
          {TIERS.map((tier, idx) => (
            <Reveal key={tier.name} delay={idx * 60}>
              <div style={{
                background: tier.featured ? 'var(--bg-surface)' : 'var(--bg-elevated)',
                border: `1px solid ${tier.featured ? 'rgba(200,255,0,0.3)' : 'var(--border)'}`,
                borderRadius: '14px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                position: 'relative',
                transform: tier.scale ? 'scale(1.03)' : 'none',
                transformOrigin: 'top center',
                boxShadow: tier.featured
                  ? '0 0 60px rgba(200,255,0,0.08), 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(200,255,0,0.08) inset'
                  : '0 8px 24px rgba(0,0,0,0.3)',
                zIndex: tier.featured ? 1 : 0,
              }}>

                {/* Featured top gradient line */}
                {tier.featured && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    borderRadius: '14px 14px 0 0',
                    background: 'linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)',
                  }} />
                )}

                {/* Featured badge */}
                {tier.featured && (
                  <div style={{
                    position: 'absolute',
                    top: '-11px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'var(--accent)',
                    color: '#000',
                    fontSize: '9px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontWeight: 700,
                    padding: '3px 12px',
                    letterSpacing: '0.12em',
                    borderRadius: '99px',
                    whiteSpace: 'nowrap',
                  }}>
                    MOST POPULAR
                  </div>
                )}

                {/* Header */}
                <div>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'IBM Plex Mono, monospace',
                    color: tier.featured ? 'var(--accent)' : 'var(--text-ghost)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    fontWeight: 500,
                  }}>
                    {tier.tag}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '6px' }}>
                    <span style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '38px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.05em',
                      lineHeight: 1,
                      transition: 'all 200ms ease',
                    }}>
                      {formatPrice(tier.monthlyPrice, annual)}
                    </span>
                    <span style={{ fontSize: '13px', color: 'var(--text-ghost)' }}>
                      /mo
                    </span>
                  </div>

                  {annual && tier.monthlyPrice > 0 && (
                    <div style={{
                      fontSize: '11px',
                      fontFamily: 'IBM Plex Mono, monospace',
                      color: 'var(--success)',
                      letterSpacing: '0.02em',
                      marginBottom: '4px',
                    }}>
                      ${(tier.monthlyPrice * 12 * 0.8).toLocaleString()} billed annually
                    </div>
                  )}

                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                    {tier.subtitle}
                  </div>
                </div>

                {/* Features */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {tier.features.map((f, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <svg style={{ flexShrink: 0, marginTop: '2px' }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                        <circle cx="6.5" cy="6.5" r="6" stroke="rgba(200,255,0,0.25)" strokeWidth="1"/>
                        <path d="M4 6.5l2 2 3.5-3.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
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
            </Reveal>
          ))}
        </div>

        {/* Annual note */}
        {annual && (
          <Reveal delay={200}>
            <p style={{
              textAlign: 'center',
              marginTop: '24px',
              fontSize: '12px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--text-ghost)',
              letterSpacing: '0.04em',
            }}>
              All annual plans billed as a single payment · Cancel before renewal for a full refund
            </p>
          </Reveal>
        )}

      </div>
    </section>
  );
}

export default PricingSection;
