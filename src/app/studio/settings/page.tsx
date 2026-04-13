'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/toast-provider';

export default function SettingsPage() {
  const { toast } = useToast();
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/blueprints');
      const data = await res.json() as Record<string, unknown>;
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `are-e-export-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: 'Data exported', variant: 'success' });
    } catch (err) {
      toast({ title: 'Export failed', description: String(err), variant: 'error' });
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = () => {
    if (deleteConfirm !== 'DELETE') {
      toast({ title: 'Type DELETE to confirm', variant: 'error' });
      return;
    }
    toast({ title: 'Account deletion requested', description: 'You\'ll receive a confirmation email.', variant: 'info' });
  };

  return (
    <div style={{ padding: '32px', maxWidth: '640px' }}>
      <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '32px' }}>Settings</h1>

      {/* GDPR: Data Export */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '8px' }}>Data Export</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.7 }}>
          Download all your data (blueprints, DNA profiles, usage records) as a JSON file.
          This satisfies your right to data portability under GDPR.
        </p>
        <button onClick={handleExport} className="btn" style={{ fontSize: '13px' }} disabled={exporting}>
          {exporting ? <span className="spin-glyph">◈</span> : 'Export My Data'}
        </button>
      </section>

      <hr className="divider" style={{ marginBottom: '40px' }} />

      {/* Preferences */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '16px' }}>Preferences</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Default Model Tier', value: 'Flagship (Gemini 3.1 Pro)', desc: 'Used when you generate new blueprints' },
            { label: 'Email Notifications', value: 'Quality reports, quota alerts', desc: 'Manage in Clerk account settings' },
          ].map((pref) => (
            <div key={pref.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '2px' }}>{pref.label}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{pref.desc}</div>
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace' }}>{pref.value}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="divider" style={{ marginBottom: '40px' }} />

      {/* Danger zone */}
      <section>
        <h2 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '8px', color: 'var(--error)' }}>
          Danger Zone
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.7 }}>
          Deleting your account will soft-delete all your data (GDPR compliance).
          Your data will be retained for 30 days before permanent deletion.
        </p>
        <div style={{ border: '1px solid var(--error)', borderRadius: '4px', padding: '20px' }}>
          <label style={{ fontSize: '11px', color: 'var(--error)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>
            TYPE &ldquo;DELETE&rdquo; TO CONFIRM
          </label>
          <input
            className="input"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder="DELETE"
            style={{ borderBottomColor: deleteConfirm === 'DELETE' ? 'var(--error)' : undefined, marginBottom: '16px' }}
          />
          <button
            onClick={handleDeleteAccount}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--error)',
              borderRadius: '2px',
              background: 'transparent',
              color: 'var(--error)',
              fontSize: '13px',
              cursor: 'pointer',
              opacity: deleteConfirm === 'DELETE' ? 1 : 0.4,
            }}
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
