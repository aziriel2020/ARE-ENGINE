'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_BLUEPRINTS } from '@/lib/mocks/mock-blueprint';
import type { MockBlueprint } from '@/lib/mocks/mock-blueprint';
import { QualityRadar } from '@/components/studio/quality-radar';
import { useToast } from '@/components/ui/toast-provider';

const GRADE_COLORS: Record<string, string> = {
  S: 'var(--accent)', A: 'var(--success)', B: 'var(--info)',
  C: 'var(--warning)', F: 'var(--error)',
};

export default function BlueprintDetailPage() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const [bp, setBp] = useState<MockBlueprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'content' | 'quality' | 'production'>('content');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/blueprints/${params.id}`);
        if (res.ok) {
          const data = await res.json() as MockBlueprint;
          setBp(data);
        } else {
          const found = MOCK_BLUEPRINTS.find((b) => b.id === params.id);
          setBp(found ?? MOCK_BLUEPRINTS[0]);
        }
      } catch {
        const found = MOCK_BLUEPRINTS.find((b) => b.id === params.id);
        setBp(found ?? MOCK_BLUEPRINTS[0]);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [params.id]);

  const handleCopySuno = () => {
    if (!bp) return;
    void navigator.clipboard.writeText(bp.sunoPrompt);
    toast({ title: 'Suno prompt copied', variant: 'success' });
  };

  if (loading) {
    return (
      <div style={{ padding: '48px', textAlign: 'center', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>
        <span className="spin-glyph">◈</span> Loading blueprint...
      </div>
    );
  }

  if (!bp) {
    return <div style={{ padding: '48px' }}>Blueprint not found.</div>;
  }

  const report = bp.qualityReport;

  return (
    <div style={{ padding: '32px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/studio/blueprints" style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          ← Blueprints
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '24px', letterSpacing: '-0.02em' }}>
              {bp.title}
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '6px' }}>
              {bp.userPrompt}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={handleCopySuno} className="btn" style={{ fontSize: '12px' }}>
              Copy Suno Prompt
            </button>
            <Link href="/studio" className="btn" style={{ fontSize: '12px' }}>
              Re-generate
            </Link>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: '24px', marginTop: '16px', flexWrap: 'wrap' }}>
          {[
            { label: 'Grade', value: report.grade, color: GRADE_COLORS[report.grade] },
            { label: 'Score', value: `${report.aggregateScore}/100` },
            { label: 'Laws', value: `${report.passedLaws}/${report.passedLaws + report.failedLaws}` },
            { label: 'Cost', value: `$${bp.totalCostUsd.toFixed(3)}` },
            { label: 'Model', value: bp.modelUsed.split('-').slice(0, 3).join('-') },
          ].map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', marginBottom: '2px' }}>
                {m.label.toUpperCase()}
              </div>
              <div style={{ fontSize: '14px', fontFamily: 'IBM Plex Mono, monospace', color: m.color ?? 'var(--text-primary)', fontWeight: m.label === 'Grade' ? 700 : 400 }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border)', marginBottom: '24px' }}>
        {(['content', 'quality', 'production'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 20px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab ? 'var(--accent)' : 'transparent'}`,
              color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: '13px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              transition: 'all 150ms ease',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'content' && (
        <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '13px', lineHeight: 1.9, whiteSpace: 'pre-wrap', color: 'var(--text-primary)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '4px', padding: '24px' }}>
          {bp.content}
        </pre>
      )}

      {activeTab === 'quality' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Radar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <QualityRadar report={report} size={240} />
            {/* Rating */}
            <div>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '8px' }}>
                Rate this blueprint
              </p>
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    style={{
                      background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer',
                      color: star <= rating ? 'var(--accent)' : 'var(--border)',
                      transition: 'color 150ms ease',
                    }}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Law grid */}
          <div>
            {report.laws.map((law) => (
              <div
                key={law.lawId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--border)',
                  gap: '12px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <span style={{ color: law.passed ? 'var(--success)' : 'var(--error)', marginRight: '6px', fontSize: '10px' }}>●</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {String(law.lawId).padStart(2, '0')}. {law.lawName}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  <div style={{ width: '40px', height: '3px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${law.score}%`, height: '100%', background: law.passed ? 'var(--success)' : 'var(--error)' }} />
                  </div>
                  <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-tertiary)', width: '24px', textAlign: 'right' }}>
                    {law.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'production' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '12px' }}>
              Production Notes
            </h3>
            <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', lineHeight: 1.8, color: 'var(--text-primary)', background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: '2px', padding: '16px', whiteSpace: 'pre-wrap' }}>
              {bp.productionNotes}
            </pre>
          </div>
          <div>
            <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '12px' }}>
              Suno Prompt
            </h3>
            <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '12px', lineHeight: 1.8, color: 'var(--accent)', background: 'var(--bg-elevated)', border: '1px solid var(--border-accent)', borderRadius: '2px', padding: '16px', whiteSpace: 'pre-wrap' }}>
              {bp.sunoPrompt}
            </pre>
            <button onClick={handleCopySuno} className="btn" style={{ marginTop: '8px', fontSize: '12px' }}>
              Copy Suno Prompt
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
