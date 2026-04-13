import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Void Protocol palette mapped as Tailwind tokens
        'bg-void':     'var(--bg-void)',
        'bg-elevated': 'var(--bg-elevated)',
        'bg-surface':  'var(--bg-surface)',
        'bg-hover':    'var(--bg-hover)',
        'bg-active':   'var(--bg-active)',

        accent:   'var(--accent)',
        success:  'var(--success)',
        warning:  'var(--warning)',
        error:    'var(--error)',
        info:     'var(--info)',

        border:         'var(--border)',
        'border-hover': 'var(--border-hover)',
        'border-accent':'var(--border-accent)',
      },
      fontFamily: {
        heading: ['Space Mono', 'monospace'],
        code:    ['IBM Plex Mono', 'monospace'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
        mono:    ['IBM Plex Mono', 'monospace'],
        sans:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        xs:    ['11px', { lineHeight: '16px' }],
        sm:    ['12px', { lineHeight: '18px' }],
        base:  ['14px', { lineHeight: '22px' }],
        lg:    ['16px', { lineHeight: '24px' }],
        xl:    ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['32px', { lineHeight: '40px' }],
        '4xl': ['40px', { lineHeight: '48px' }],
        '5xl': ['56px', { lineHeight: '64px' }],
      },
      borderRadius: {
        DEFAULT: '2px',
        sm:      '2px',
        md:      '4px',
        lg:      '4px',
        full:    '9999px',
      },
      spacing: {
        xs:  '4px',
        sm:  '8px',
        md:  '16px',
        lg:  '24px',
        xl:  '32px',
        '2xl': '48px',
        '3xl': '64px',
      },
      animation: {
        'fade-in-up': 'fade-in-up 200ms ease-out both',
        'spin-glyph': 'spin-glyph 1s linear infinite',
        'blink':      'blink 1s step-end infinite',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-glyph': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
      boxShadow: {
        // No shadows in Void Protocol — intentionally empty
        none: 'none',
      },
      backgroundImage: {
        // No gradients in Void Protocol
        none: 'none',
      },
      transitionDuration: {
        DEFAULT: '150ms',
        fast:    '100ms',
        normal:  '150ms',
        slow:    '200ms',
      },
    },
  },
  plugins: [],
};

export default config;
