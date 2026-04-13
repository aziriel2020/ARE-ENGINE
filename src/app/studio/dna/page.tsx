'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_DNA_PROFILES } from '@/lib/mocks/mock-dna';
import type { VocalDNA } from '@/lib/schemas/vocal-dna';

export default function DnaPage() {
  const [profiles, setProfiles] = useState<VocalDNA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/dna');
        if (res.ok) {
          const data = await res.json() as { profiles: VocalDNA[] };
          setProfiles(data.profiles ?? MOCK_DNA_PROFILES);
        } else {
          setProfiles(MOCK_DNA_PROFILES);
        }
      } catch {
        setProfiles(MOCK_DNA_PROFILES);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '4px' }}>
            Vocal DNA
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            {profiles.length} profile{profiles.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/onboarding" className="btn-primary" style={{ fontSize: '13px' }}>
          + New Profile
        </Link>
      </div>

      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>
          <span className="spin-glyph">◈</span> Loading profiles...
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {profiles.map((dna, i) => (
            <Link key={i} href={`/studio/dna/${i}`} style={{ textDecoration: 'none' }}>
              <div
                className="card"
                style={{ cursor: 'pointer', transition: 'border-color 150ms ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '16px', marginBottom: '4px' }}>
                      {dna.artistName}
                    </h3>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em' }}>
                      v{dna.version}
                    </span>
                  </div>
                  <span style={{ fontSize: '20px', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace' }}>◉</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {[
                    { label: 'Genres', value: dna.sonic.primaryGenres.join(', ') },
                    { label: 'Style', value: `${dna.emotional.primaryAxis} / ${dna.rhythmic.defaultFlow}` },
                    { label: 'Vocabulary', value: dna.lexical.vocabularyTier },
                    { label: 'Themes', value: dna.thematic.coreThemes.slice(0, 2).join(', ') },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
                        {row.label}
                      </span>
                      <span style={{ color: 'var(--text-secondary)', maxWidth: '60%', textAlign: 'right' }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
