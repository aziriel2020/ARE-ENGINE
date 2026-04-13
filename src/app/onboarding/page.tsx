'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast-provider';

const GENRE_OPTIONS = [
  'Hip-Hop / Rap', 'R&B / Soul', 'Pop', 'Rock / Alternative',
  'Electronic / EDM', 'Jazz / Blues', 'Country / Folk', 'Latin',
  'Afrobeats', 'Drill / Trap', 'Indie', 'Other',
];

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<Step>(1);
  const [artistName, setArtistName] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [lyricsInput, setLyricsInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedDna, setExtractedDna] = useState<Record<string, unknown> | null>(null);

  const toggleGenre = (g: string) => {
    setSelectedGenres((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : prev.length < 3 ? [...prev, g] : prev
    );
  };

  const handleStep1Next = () => {
    if (!artistName.trim()) {
      toast({ title: 'Artist name required', variant: 'error' });
      return;
    }
    if (selectedGenres.length === 0) {
      toast({ title: 'Select at least one genre', variant: 'error' });
      return;
    }
    setStep(2);
  };

  const handleStep2Next = async () => {
    if (lyricsInput.trim().length < 50) {
      toast({ title: 'Please provide at least 50 characters of sample lyrics', variant: 'error' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/dna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ artistName, primaryGenres: selectedGenres, lyricsSamples: lyricsInput }),
      });
      const data = (await res.json()) as Record<string, unknown>;
      if (!res.ok) throw new Error((data.error as string) || 'DNA extraction failed');
      setExtractedDna(data);
      setStep(3);
    } catch (err) {
      toast({ title: 'DNA extraction failed', description: String(err), variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      toast({ title: 'DNA profile created', description: 'Welcome to ARE-E!', variant: 'success' });
      router.push('/studio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: '48px', textAlign: 'center' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', fontWeight: 700, color: 'var(--accent)' }}>
          ARE-E
        </span>
        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', marginTop: '4px' }}>
          ONBOARDING — STEP {step} OF 3
        </p>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '48px' }}>
        {([1, 2, 3] as Step[]).map((s) => (
          <div
            key={s}
            style={{
              width: '32px',
              height: '3px',
              borderRadius: '2px',
              background: s <= step ? 'var(--accent)' : 'var(--border)',
              transition: 'background 300ms ease',
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '40px',
        }}
      >
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '8px' }}>
              Name Your Artist
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              We&apos;ll build your DNA profile around this identity.
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
                ARTIST NAME
              </label>
              <input
                className="input"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
                placeholder="e.g. JCAY, Midnight Ghost, etc."
                maxLength={100}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '12px' }}>
                PRIMARY GENRES (up to 3)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {GENRE_OPTIONS.map((g) => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    style={{
                      padding: '4px 12px',
                      border: `1px solid ${selectedGenres.includes(g) ? 'var(--accent)' : 'var(--border)'}`,
                      borderRadius: '2px',
                      background: selectedGenres.includes(g) ? 'var(--accent-dim)' : 'transparent',
                      color: selectedGenres.includes(g) ? 'var(--accent)' : 'var(--text-secondary)',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 150ms ease',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleStep1Next} className="btn-primary" style={{ width: '100%', marginTop: '32px' }}>
              Next → Feed Samples
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '8px' }}>
              Feed Your Samples
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
              Paste 3–5 lyrics samples, OR describe your style in free text.
              The more you give, the richer your DNA.
            </p>

            <textarea
              value={lyricsInput}
              onChange={(e) => setLyricsInput(e.target.value)}
              placeholder="Paste lyrics samples or describe your style here..."
              rows={10}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '12px',
                color: 'var(--text-primary)',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '12px',
                lineHeight: 1.7,
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 150ms ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button onClick={() => setStep(1)} className="btn" style={{ flex: 1 }}>
                ← Back
              </button>
              <button
                onClick={handleStep2Next}
                className="btn-primary"
                style={{ flex: 2 }}
                disabled={loading}
              >
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="spin-glyph">◈</span> Extracting DNA...
                  </span>
                ) : 'Extract DNA →'}
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '8px' }}>
              Review Your DNA
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Your Vocal DNA has been extracted. You can refine these vectors later in the DNA editor.
            </p>

            {extractedDna ? (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: '16px',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--accent)',
                  maxHeight: '200px',
                  overflow: 'auto',
                  marginBottom: '24px',
                }}
              >
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                  {JSON.stringify(extractedDna, null, 2)}
                </pre>
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '2px',
                  padding: '16px',
                  marginBottom: '24px',
                  textAlign: 'center',
                  color: 'var(--accent)',
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '12px',
                }}
              >
                <span className="spin-glyph">◈</span> DNA profile created for {artistName}
              </div>
            )}

            <button
              onClick={handleFinish}
              className="btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Entering studio...' : 'Enter Studio →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
