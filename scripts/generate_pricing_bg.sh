#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "OPENAI_API_KEY is required"
  exit 1
fi

PROMPT="Ultra-trendy professional urban music production scene at night, cinematic city skyline, neon lime and cyan accents, motion blur light streaks, premium luxury brand ad aesthetic, high contrast, moody atmosphere, no text, no logos, 16:9 composition, editorial quality."

mkdir -p public/brand

curl -sS https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${OPENAI_API_KEY}" \
  -d "{\"model\":\"gpt-image-1\",\"size\":\"1536x1024\",\"output_format\":\"webp\",\"quality\":\"high\",\"prompt\":\"${PROMPT}\"}" \
  | python - <<'PY'
import sys, json, base64, pathlib
payload = json.load(sys.stdin)
if "data" not in payload or not payload["data"]:
    raise SystemExit(f"Invalid response: {payload}")
b64 = payload["data"][0].get("b64_json")
if not b64:
    raise SystemExit(f"No b64_json in response: {payload}")
out = pathlib.Path("public/brand/urban-pricing-gpt.webp")
out.write_bytes(base64.b64decode(b64))
print(f"Wrote {out}")
PY

echo "Done. File available at public/brand/urban-pricing-gpt.webp"
