'use client';

import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/toast-provider';
import type { QualityReport } from '@/lib/schemas/blueprint';

interface SseChunk {
  section: string;
  content: string;
}

interface GenerateResponse {
  blueprintId?: string;
  qualityReport?: QualityReport;
  error?: string;
}

type SectionMap = Record<string, string>;

const SECTION_LABELS: Record<string, string> = {
  verse_1: 'VERSE 1',
  chorus: 'CHORUS',
  verse_2: 'VERSE 2',
  bridge: 'BRIDGE',
  outro: 'OUTRO',
  production_notes: 'PRODUCTION NOTES',
  suno_prompt: 'SUNO PROMPT',
};

export default function StudioPage() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [sections, setSections] = useState<SectionMap>({});
  const [sectionOrder, setSectionOrder] = useState<string[]>([]);
  const [report, setReport] = useState<QualityReport | null>(null);
  const [blueprintId, setBlueprintId] = useState<string | null>(null);
  const [statusLines, setStatusLines] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [statusLines, sections]);

  const addStatus = (line: string) => {
    setStatusLines((prev) => [...prev, line]);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({ title: 'Enter a prompt first', variant: 'error' });
      return;
    }

    setGenerating(true);
    setSections({});
    setSectionOrder([]);
    setReport(null);
    setBlueprintId(null);
    setStatusLines([]);
    addStatus('◈ Initializing generation pipeline...');

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

      // Handle SSE stream
      if (contentType.includes('text/event-stream')) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) throw new Error('No stream body');

        addStatus('◈ Streaming blueprint...');

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

            try {
              const chunk = JSON.parse(raw) as SseChunk;
              if (chunk.section === '__status__') {
                addStatus(chunk.content);
              } else if (chunk.section === '__complete__') {
                const final = JSON.parse(chunk.content) as GenerateResponse;
                if (final.blueprintId) setBlueprintId(final.blueprintId);
                if (final.qualityReport) {
                  setReport(final.qualityReport);
                  addStatus(`◈ Quality grade: ${final.qualityReport.grade} (${final.qualityReport.aggregateScore}/100)`);
                }
              } else {
                setSections((prev) => ({ ...prev, [chunk.section]: (prev[chunk.section] ?? '') + chunk.content }));
                setSectionOrder((prev) => prev.includes(chunk.section) ? prev : [...prev, chunk.section]);
              }
            } catch {
              // malformed chunk — skip
            }
          }
        }
      } else {
        // Non-streaming fallback (test mode returns JSON)
        const data = (await res.json()) as GenerateResponse & { content?: string; sections?: SectionMap };
        if (data.error) throw new Error(data.error);
        if (data.sections) {
          setSections(data.sections);
          setSectionOrder(Object.keys(data.sections));
        } else if (data.content) {
          setSections({ blueprint: data.content as string });
          setSectionOrder(['blueprint']);
        }
        if (data.blueprintId) setBlueprintId(data.blueprintId as string);
        if (data.qualityReport) {
          setReport(data.qualityReport);
          addStatus(`◈ Quality grade: ${data.qualityReport.grade} (${data.qualityReport.aggregateScore}/100)`);
        }
        addStatus('◈ Blueprint complete.');
      }
    } catch (err) {
      toast({ title: 'Generation failed', description: String(err), variant: 'error' });
      addStatus(`✗ Error: ${String(err)}`);
    } finally {
      setGenerating(false);
    }
  };

  const gradeColor = (g?: string) => {
    if (g === 'S') return 'var(--accent)';
    if (g === 'A') return 'var(--success)';
    if (g === 'B') return 'var(--info)';
    if (g === 'C') return 'var(--warning)';
    return 'var(--error)';
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', minHeight: '100vh', maxHeight: '100vh' }}>
      {/* Center: generate + output */}
      <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px', color: 'var(--text-primary)' }}>
            Generate Blueprint
          </h1>
        </div>

        {/* Prompt area */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the blueprint you want: mood, theme, structure, constraints..."
            rows={3}
            style={{
              width: '100%',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              borderRadius: '2px',
              padding: '12px',
              color: 'var(--text-primary)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
              lineHeight: 1.6,
              resize: 'none',
              outline: 'none',
              transition: 'border-color 150ms ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary"
              style={{ padding: '8px 20px', fontSize: '13px' }}
            >
              {generating ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="spin-glyph">◈</span> Generating...
                </span>
              ) : '▶ Generate'}
            </button>
          </div>
        </div>

        {/* Status + output */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {statusLines.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              {statusLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '11px',
                    color: 'var(--accent)',
                    lineHeight: 1.8,
                    opacity: i < statusLines.length - 1 ? 0.5 : 1,
                  }}
                >
                  {line}
                </div>
              ))}
            </div>
          )}

          {sectionOrder.map((key) => (
            <div key={key} style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--text-tertiary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {SECTION_LABELS[key] ?? key}
              </div>
              <pre
                style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: '16px',
                }}
              >
                {sections[key]}
              </pre>
            </div>
          ))}

          {blueprintId && (
            <div style={{ marginTop: '16px' }}>
              <a
                href={`/studio/blueprints/${blueprintId}`}
                style={{ fontSize: '12px', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}
              >
                → View full blueprint with quality report
              </a>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Right panel: quality report preview */}
      <div
        style={{
          borderLeft: '1px solid var(--border)',
          background: 'var(--bg-elevated)',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', color: 'var(--text-secondary)' }}>
            QUALITY REPORT
          </h2>
        </div>

        {report ? (
          <div style={{ padding: '16px', overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--text-secondary)' }}>
                {report.aggregateScore}/100 — {report.passedLaws}/{report.passedLaws + report.failedLaws} laws
              </span>
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: gradeColor(report.grade),
                }}
              >
                {report.grade}
              </span>
            </div>

            {report.laws.map((law) => (
              <div
                key={law.lawId}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 0',
                  borderBottom: '1px solid var(--border)',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    color: law.passed ? 'var(--text-secondary)' : 'var(--text-tertiary)',
                    flex: 1,
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ color: law.passed ? 'var(--success)' : 'var(--error)', marginRight: '4px' }}>
                    {law.passed ? '●' : '●'}
                  </span>
                  {law.lawName}
                </span>
                <span
                  style={{
                    fontFamily: 'IBM Plex Mono, monospace',
                    fontSize: '10px',
                    color: law.passed ? 'var(--text-tertiary)' : 'var(--error)',
                    flexShrink: 0,
                  }}
                >
                  {law.score}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px 16px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: '12px', color: 'var(--text-ghost)', fontFamily: 'IBM Plex Mono, monospace', lineHeight: 1.7 }}>
              Quality report will appear here after generation completes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
