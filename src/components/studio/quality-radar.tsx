'use client';

import type { QualityReport } from '@/lib/schemas/blueprint';
import { LAWS } from '@/lib/constants/laws';

// Category scores aggregated for radar
const CATEGORIES = ['vocabulary', 'rhythm', 'structure', 'craft', 'persona', 'authenticity', 'artistry', 'technical'] as const;

function getCategoryScore(report: QualityReport, category: string): number {
  const catLaws = LAWS.filter((l) => l.category === category);
  if (catLaws.length === 0) return 0;
  const total = catLaws.reduce((acc, l) => {
    const found = report.laws.find((rl) => rl.lawId === l.id);
    return acc + (found?.score ?? 0);
  }, 0);
  return Math.round(total / catLaws.length);
}

interface Props {
  report: QualityReport;
  size?: number;
}

export function QualityRadar({ report, size = 200 }: Props) {
  const cx = size / 2;
  const cy = size / 2;
  const r = (size / 2) * 0.75;
  const n = CATEGORIES.length;

  const scores = CATEGORIES.map((cat) => ({
    label: cat,
    value: getCategoryScore(report, cat) / 100,
  }));

  const points = scores.map((s, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * s.value * Math.cos(angle),
      y: cy + r * s.value * Math.sin(angle),
      labelX: cx + (r + 18) * Math.cos(angle),
      labelY: cy + (r + 18) * Math.sin(angle),
      gridX: cx + r * Math.cos(angle),
      gridY: cy + r * Math.sin(angle),
    };
  });

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const polyPoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ overflow: 'visible' }}>
      {gridLevels.map((level, li) => {
        const gp = scores.map((_, i) => {
          const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
          return `${cx + r * level * Math.cos(angle)},${cy + r * level * Math.sin(angle)}`;
        }).join(' ');
        return <polygon key={li} points={gp} fill="none" stroke="var(--border)" strokeWidth="1" />;
      })}
      {points.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.gridX} y2={p.gridY} stroke="var(--border)" strokeWidth="1" />
      ))}
      <polygon points={polyPoints} fill="var(--accent-dim)" stroke="var(--accent)" strokeWidth="1.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="2.5" fill="var(--accent)" />
      ))}
      {points.map((p, i) => (
        <text
          key={i}
          x={p.labelX}
          y={p.labelY}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8"
          fill="var(--text-secondary)"
          fontFamily="IBM Plex Mono, monospace"
        >
          {scores[i].label}
        </text>
      ))}
    </svg>
  );
}

export default QualityRadar;
