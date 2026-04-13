'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/toast-provider';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  permissions: string[];
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}

const MOCK_KEYS: ApiKey[] = [
  {
    id: 'key_001',
    name: 'Production SDK',
    prefix: 'are_k_a1b2c3',
    permissions: ['generate', 'blueprints:read'],
    createdAt: new Date(Date.now() - 14 * 86400_000).toISOString(),
    lastUsedAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
    expiresAt: null,
  },
  {
    id: 'key_002',
    name: 'Test Key',
    prefix: 'are_k_d4e5f6',
    permissions: ['generate', 'blueprints:read', 'dna:read'],
    createdAt: new Date(Date.now() - 3 * 86400_000).toISOString(),
    lastUsedAt: null,
    expiresAt: new Date(Date.now() + 30 * 86400_000).toISOString(),
  },
];

const ALL_PERMISSIONS = ['generate', 'blueprints:read', 'blueprints:write', 'dna:read', 'dna:write', 'usage:read'];

export default function ApiKeysPage() {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_KEYS);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedPerms, setSelectedPerms] = useState<string[]>(['generate', 'blueprints:read']);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const togglePerm = (p: string) =>
    setSelectedPerms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]);

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      toast({ title: 'Key name required', variant: 'error' });
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName, permissions: selectedPerms }),
      });
      const data = await res.json() as { key?: string; id?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to create key');
      setCreatedKey(data.key ?? 'are_k_xxxxxxxxxxxxx (test mode)');
      setKeys((prev) => [...prev, {
        id: data.id ?? `key_${Date.now()}`,
        name: newKeyName,
        prefix: (data.key ?? 'are_k_xxx').slice(0, 14) + '...',
        permissions: selectedPerms,
        createdAt: new Date().toISOString(),
        lastUsedAt: null,
        expiresAt: null,
      }]);
      toast({ title: 'API key created', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed to create key', description: String(err), variant: 'error' });
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      await fetch(`/api/api-keys/${id}`, { method: 'DELETE' });
      setKeys((prev) => prev.filter((k) => k.id !== id));
      toast({ title: 'API key revoked', variant: 'success' });
    } catch {
      toast({ title: 'Failed to revoke key', variant: 'error' });
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '4px' }}>API Keys</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Keys are shown once at creation. Store them securely.
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ fontSize: '13px' }}>
          + Create Key
        </button>
      </div>

      {/* Create form */}
      {showCreate && !createdKey && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '16px' }}>New API Key</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>KEY NAME</label>
            <input className="input" value={newKeyName} onChange={(e) => setNewKeyName(e.target.value)} placeholder="e.g. Production SDK" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>PERMISSIONS</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ALL_PERMISSIONS.map((p) => (
                <button key={p} onClick={() => togglePerm(p)} style={{ padding: '4px 10px', border: `1px solid ${selectedPerms.includes(p) ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '2px', background: selectedPerms.includes(p) ? 'var(--accent-dim)' : 'transparent', color: selectedPerms.includes(p) ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', cursor: 'pointer' }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setShowCreate(false)} className="btn" style={{ fontSize: '12px' }}>Cancel</button>
            <button onClick={handleCreate} className="btn-primary" style={{ fontSize: '12px' }} disabled={creating}>
              {creating ? <span className="spin-glyph">◈</span> : 'Create Key'}
            </button>
          </div>
        </div>
      )}

      {/* Created key display */}
      {createdKey && (
        <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--success)', borderRadius: '4px', padding: '20px', marginBottom: '24px' }}>
          <p style={{ fontSize: '13px', color: 'var(--success)', marginBottom: '8px', fontFamily: 'IBM Plex Mono, monospace' }}>
            ● Key created. Copy it now — it won&apos;t be shown again.
          </p>
          <code style={{ display: 'block', background: 'var(--bg-surface)', padding: '12px', borderRadius: '2px', fontSize: '13px', color: 'var(--accent)', fontFamily: 'IBM Plex Mono, monospace', wordBreak: 'break-all' }}>
            {createdKey}
          </code>
          <button onClick={() => { void navigator.clipboard.writeText(createdKey); toast({ title: 'Copied', variant: 'success' }); }} className="btn" style={{ marginTop: '12px', fontSize: '12px' }}>Copy Key</button>
          <button onClick={() => { setCreatedKey(null); setShowCreate(false); setNewKeyName(''); }} className="btn" style={{ marginTop: '12px', marginLeft: '8px', fontSize: '12px' }}>Done</button>
        </div>
      )}

      {/* Keys table */}
      <div>
        {keys.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No API keys yet.</p>
        ) : keys.map((k) => (
          <div key={k.id} className="table-row" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '4px' }}>{k.name}</div>
              <code style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>{k.prefix}</code>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {k.permissions.map((p) => <span key={p} className="badge" style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>{p}</span>)}
            </div>
            <div style={{ textAlign: 'right', fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace' }}>
              <div>Created {new Date(k.createdAt).toLocaleDateString()}</div>
              {k.lastUsedAt && <div>Last used {new Date(k.lastUsedAt).toLocaleDateString()}</div>}
            </div>
            <button onClick={() => void handleRevoke(k.id)} className="btn" style={{ fontSize: '11px', color: 'var(--error)', borderColor: 'var(--error)', padding: '4px 10px' }}>
              Revoke
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
