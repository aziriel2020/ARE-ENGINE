# GPT Image Generation for Pricing Background

Use this to generate the premium urban background with GPT image and apply it automatically to the pricing section.

## Command

```bash
OPENAI_API_KEY=sk-... ./scripts/generate_pricing_bg.sh
```

## Output

The script writes:

- `public/brand/urban-pricing-gpt.webp`

The pricing section already prefers this file first and falls back to SVG if it is missing.

## Prompt used

> Ultra-trendy professional urban music production scene at night, cinematic city skyline, neon lime and cyan accents, motion blur light streaks, premium luxury brand ad aesthetic, high contrast, moody atmosphere, no text, no logos, 16:9 composition, editorial quality.
