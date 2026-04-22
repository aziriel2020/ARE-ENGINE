'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/toast-provider';
import type { QualityReport } from '@/lib/schemas/blueprint';
import { PLAN_LIMITS, type PlanName } from '@/lib/constants/plans';

interface SseChunk { section: string; content: string; }
interface GenerateResponse { blueprintId?: string; qualityReport?: QualityReport; error?: string; }
type SectionMap = Record<string, string>;
interface UsageSummary {
  plan: PlanName;
  generationsUsed: number;
  generationsLimit: number;
}

const SECTION_LABELS: Record<string, string> = {
  verse_1: 'Verse 1',
  chorus: 'Chorus',
  verse_2: 'Verse 2',
  verse_3: 'Verse 3',
  bridge: 'Bridge',
  outro: 'Outro',
  intro: 'Intro',
  production_notes: 'Production Notes',
  suno_prompt: 'Suno Prompt',
};

const SECTION_ICONS: Record<string, string> = {
  verse_1: '01', chorus: '◈', verse_2: '02', verse_3: '03',
  bridge: '↗', outro: '⌿', intro: '↘', production_notes: '⚙', suno_prompt: '▷',
};

const EXAMPLE_PROMPTS = [
  'A cold, defiant trap track about loyalty tested by success — French rap aesthetic',
  'Introspective R&B about the cost of keeping secrets for people you love',
  'Hard drill record about street code — loyalty, silence, survival',
];

export default function StudioPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [sections, setSections] = useState<SectionMap>({});
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);
  const [report, setReport] = useState<QualityReport | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [statusLines, setStatusLines] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageSummary | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sections]);

  useEffect(() => {
    const loadUsage = async () => {
      try {
        const res = await fetch('/api/usage');
        if (!res.ok) return;
        const data = (await res.json()) as UsageSummary;
        if (data?.plan) setUsage(data);
      } catch {
        // non-critical
      }
    };
    void loadUsage();
  }, []);

  const addStatus = (line: string) => setStatusLines((p) => [...p, line]);

  const handleGenerate = async () => {
    if (!prompt.trim()) { toast({ title: 'Enter a prompt first', variant: 'error' }); return; }
    setGenerating(true);
    setSections({}); setSectionOrder([]); setReport(null);
    setBlueprintId(null); setStatusLines([]); setActiveSection(null);
    addStatus('Initializing pipeline...');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const err = (await res.json()) as GenerateResponse;
        throw new Error(err.error || 'Generation failed');
      }

      const contentType = res.headers.get('content-type') ?? '';

      if (contentType.includes('text/event-stream')) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error('No stream body');
        addStatus('Streaming blueprint...');

        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const raw = line.slice(6).trim();
            if (!raw || raw === '[DONE]') continue;

            let chunk: SseChunk | null = null;
            try { chunk = JSON.parse(raw) as SseChunk; } catch { /* ignore */ }
            if (!chunk) continue;

            if (chunk.section === 'error') {
              throw new Error(chunk.content || 'Generation failed');
            } else if (chunk.section === 'complete') {
              if (chunk.content) {
                try {
                  const final = JSON.parse(chunk.content) as GenerateResponse;
                  if (final.blueprintId) setBlueprintId(final.blueprintId);
                  if (final.qualityReport) {
                    setReport(final.qualityReport);
                    addStatus(`Grade ${final.qualityReport.grade} — ${final.qualityReport.aggregateScore}/100`);
                  }
                } catch { /* ignore */ }
              }
            } else {
              setActiveSection(chunk.section);
              setSections((prev) => ({ ...prev, [chunk!.section]: (prev[chunk!.section] ?? '') + chunk!.content }));
              setSectionOrder((prev) => prev.includes(chunk!.section) ? prev : [...prev, chunk!.section]);
            }
          }
        }
      } else {
        const data = (await res.json()) as GenerateResponse & { content?: string; sections?: SectionMap };
        if (data.error) throw new Error(data.error);
        if (data.sections) { setSections(data.sections); setSectionOrder(Object.keys(data.sections)); }
        else if (data.content) { setSections({ blueprint: data.content as string }); setSectionOrder(['blueprint']); }
        if (data.blueprintId) setBlueprintId(data.blueprintId as string);
        if (data.qualityReport) {
          setReport(data.qualityReport);
          addStatus(`Grade ${data.qualityReport.grade} — ${data.qualityReport.aggregateScore}/100`);
        }
        addStatus('Blueprint complete.');
      }
    } catch (err) {
      toast({ title: 'Generation failed', description: String(err), variant: 'error' });
      addStatus(`Failed — ${String(err)}`);
    } finally {
      setGenerating(false);
      setActiveSection(null);
    }
  };

  const gradeColor = (g?: string) => {
    if (g === 'S') return 'var(--accent)';
    if (g === 'A') return 'var(--success)';
    if (g === 'B') return 'var(--info)';
    if (g === 'C') return 'var(--warning)';
    return 'var(--error)';
  };

  const hasOutput = sectionOrder.length > 0;
  const currentPlan = usage?.plan ?? 'FREE';
  const currentLimits = PLAN_LIMITS[currentPlan];
  const effectiveCostPerGeneration =
    currentLimits.generationsPerMonth > 0 && currentLimits.price > 0
      ? currentLimits.price / 100 / currentLimits.generationsPerMonth
      : 0;
  const remainingGenerations = usage
    ? usage.generationsLimit < 0
      ? 'Unlimited'
      : String(Math.max(0, usage.generationsLimit - usage.generationsUsed))
    : '—';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', minHeight: '100vh', maxHeight: '100vh' }}>

      {/* MAIN */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{
          padding: '24px 28px 20px',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
          <div>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: '-0.04em',
              marginBottom: '4px',
            }}>
              Generate Blueprint
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', margin: 0, letterSpacing: '-0.01em' }}>
              Describe your vision — ANIMAENGINE handles the rest
            </p>
          </div>
          {generating && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'rgba(200,255,0,0.06)',
              border: '1px solid rgba(200,255,0,0.2)',
              borderRadius: '99px',
              fontSize: '11px',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--accent)',
            }}>
              <span className="spin-glyph" style={{ fontSize: '9px' }}>◈</span>
              {activeSection ? `Streaming ${SECTION_LABELS[activeSection] ?? activeSection}...` : 'Processing...'}
            </div>
          )}
        </div>

        {/* Prompt */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleGenerate(); }}
            placeholder="Describe the blueprint: mood, theme, genre, structural constraints..."
            rows={3}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-hover)',
              borderRadius: '10px',
              padding: '14px 16px',
              color: 'var(--text-primary)',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '14px',
              lineHeight: 1.65,
              resize: 'none',
              outline: 'none',
              transition: 'border-color 150ms ease, box-shadow 150ms ease',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'rgba(200,255,0,0.4)';
              e.target.style.boxShadow = '0 0 0 3px rgba(200,255,0,0.06)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--border-hover)';
              e.target.style.boxShadow = 'none';
            }}
          />

          {/* Example prompts */}
          {!hasOutput && !generating && (
            <div style={{ marginTop: '10px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPrompt(p)}
                  style={{
                    padding: '4px 10px',
                    background: 'transparent',
                    border: '1px solid var(--border-hover)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    transition: 'all 100ms ease',
                    fontFamily: 'Space Grotesk, sans-serif',
                    letterSpacing: '-0.01em',
                    maxWidth: '260px',
                    textAlign: 'left',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-accent)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-hover)';
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-tertiary)';
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <div style={{ marginTop: '12px', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px', background: 'var(--bg-elevated)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '10px' }}>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>PLAN</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>{currentPlan}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>REMAINING GENS</div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 600 }}>{remainingGenerations}</div>
              </div>
              <div>
                <div style={{ fontSize: '10px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>EST. COST / GEN</div>
                <div style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600 }}>
                  {effectiveCostPerGeneration > 0 ? `$${effectiveCostPerGeneration.toFixed(2)}` : 'Included'}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <a
                href="https://suno.com/create"
                target="_blank"
                rel="noreferrer"
                className="btn"
                style={{ padding: '8px 12px', borderRadius: '8px', fontSize: '12px', textDecoration: 'none' }}
              >
                Open Suno Create ↗
              </a>
              <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
                Use Suno for audio rendering after package generation
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace' }}>
              ⌘↵ to generate
            </span>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary"
              style={{ padding: '9px 22px', fontSize: '13.5px', borderRadius: '8px', fontWeight: 700 }}
            >
              {generating ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spin-glyph">◈</span> Generating...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  Generate
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Output */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>

          {/* Status */}
          {statusLines.length > 0 && (
            <div style={{
              marginBottom: '20px',
              padding: '12px 16px',
              background: 'rgba(200,255,0,0.03)',
              border: '1px solid rgba(200,255,0,0.1)',
              borderRadius: '8px',
            }}>
              {statusLines.map((line, i) => (
                <div key={i} style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: i === statusLines.length - 1 ? 'var(--accent)' : 'var(--text-ghost)',
                  lineHeight: 1.9,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{ color: 'var(--text-ghost)', flexShrink: 0 }}>
                    {i === statusLines.length - 1 && generating ? '›' : '✓'}
                  </span>
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          {sectionOrder.map((key) => (
            <div key={key} style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px',
              }}>
                <span style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: key === activeSection ? 'var(--accent)' : 'var(--text-ghost)',
                  width: '18px',
                  flexShrink: 0,
                }}>
                  {SECTION_ICONS[key] ?? '·'}
                </span>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {SECTION_LABELS[key] ?? key}
                </span>
                {key === activeSection && generating && (
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    animation: 'glow-breathe 1s ease-in-out infinite',
                    boxShadow: '0 0 8px var(--accent)',
                    flexShrink: 0,
                  }} />
                )}
              </div>
              <pre style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '13px',
                color: 'var(--text-primary)',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '16px 18px',
              }}>
                {sections[key]}
                {key === activeSection && generating && <span className="cursor-blink" />}
              </pre>
            </div>
          ))}

          {/* Empty state */}
          {!hasOutput && !generating && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 32px', textAlign: 'center' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                fontSize: '20px',
                color: 'var(--text-ghost)',
              }}>
                ◈
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', margin: '0 0 6px', fontWeight: 500, letterSpacing: '-0.02em' }}>
                Your blueprint will appear here
              </p>
              <p style={{ fontSize: '12px', color: 'var(--text-ghost)', margin: 0 }}>
                Enter a prompt above and hit Generate
              </p>
            </div>
          )}

          {blueprintId && (
            <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
              <a href={`/studio/blueprints/${blueprintId}`} style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'var(--accent)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontWeight: 500,
                transition: 'opacity 150ms',
              }}>
                View full blueprint →
              </a>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        borderLeft: '1px solid var(--border)',
        background: 'var(--bg-elevated)',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '24px 20px 18px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.08em' }}>
              QUALITY REPORT
            </span>
          </div>
        </div>

        {report ? (
          <div style={{ padding: '16px 20px', overflow: 'auto', flex: 1 }}>
            {/* Grade display */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px',
              background: 'var(--bg-surface)',
              borderRadius: '10px',
              border: '1px solid var(--border)',
              marginBottom: '16px',
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', marginBottom: '2px' }}>
                  AGGREGATE
                </div>
                <div style={{ fontSize: '26px', color: 'var(--text-primary)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {report.aggregateScore}
                  <span style={{ fontSize: '14px', color: 'var(--text-tertiary)', fontWeight: 400 }}>/100</span>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                  {report.passedLaws}/{report.passedLaws + report.failedLaws} laws passed
                </div>
              </div>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '10px',
                background: `${gradeColor(report.grade)}15`,
                border: `1px solid ${gradeColor(report.grade)}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                fontWeight: 800,
                color: gradeColor(report.grade),
                fontFamily: 'Space Grotesk, sans-serif',
                letterSpacing: '-0.04em',
              }}>
                {report.grade}
              </div>
            </div>

            {/* Laws list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {report.laws.map((law) => (
                <div key={law.lawId} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '7px 0',
                  borderBottom: '1px solid var(--border-subtle)',
                  gap: '8px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flex: 1, minWidth: 0 }}>
                    <span style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: law.passed ? 'var(--success)' : 'var(--error)',
                      flexShrink: 0,
                      boxShadow: law.passed ? '0 0 4px var(--success)' : '0 0 4px var(--error)',
                    }} />
                    <span style={{
                      fontSize: '11.5px',
                      color: law.passed ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em',
                    }}>
                      {law.lawName}
                    </span>
                  </div>
                  <span style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    color: law.score >= 70 ? 'var(--text-tertiary)' : 'var(--error)',
                    flexShrink: 0,
                    fontWeight: 500,
                  }}>
                    {law.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px',
            textAlign: 'center',
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '12px',
              fontSize: '16px',
              color: 'var(--text-ghost)',
            }}>
              ◎
            </div>
            <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', margin: '0 0 4px', fontWeight: 500 }}>
              28-law evaluation
            </p>
            <p style={{ fontSize: '11px', color: 'var(--text-ghost)', margin: 0, lineHeight: 1.6 }}>
              Quality report appears after generation
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
