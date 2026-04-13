'use client';

import { useState } from 'react';
import { useToast } from '@/components/ui/toast-provider';

interface WebhookEndpoint {
  id: string;
  url: string;
  events: string[];
  isActive: boolean;
  failureCount: number;
  lastDeliveredAt: string | null;
}

const MOCK_ENDPOINTS: WebhookEndpoint[] = [
  {
    id: 'wh_001',
    url: 'https://myapp.example.com/webhooks/are',
    events: ['BLUEPRINT_COMPLETED', 'BLUEPRINT_FAILED'],
    isActive: true,
    failureCount: 0,
    lastDeliveredAt: new Date(Date.now() - 86400_000).toISOString(),
  },
];

const ALL_EVENTS = ['BLUEPRINT_COMPLETED', 'BLUEPRINT_FAILED', 'QUOTA_WARNING', 'QUOTA_EXCEEDED', 'DNA_UPDATED'];

export default function WebhooksPage() {
  const { toast } = useToast();
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>(MOCK_ENDPOINTS);
  const [showCreate, setShowCreate] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['BLUEPRINT_COMPLETED']);
  const [creating, setCreating] = useState(false);

  const toggleEvent = (e: string) =>
    setSelectedEvents((prev) => prev.includes(e) ? prev.filter((x) => x !== e) : [...prev, e]);

  const handleCreate = async () => {
    if (!newUrl.trim() || !newUrl.startsWith('https://')) {
      toast({ title: 'Valid HTTPS URL required', variant: 'error' });
      return;
    }
    setCreating(true);
    try {
      const res = await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newUrl, events: selectedEvents }),
      });
      const data = await res.json() as { id?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Failed to create endpoint');
      setEndpoints((prev) => [...prev, {
        id: data.id ?? `wh_${Date.now()}`,
        url: newUrl,
        events: selectedEvents,
        isActive: true,
        failureCount: 0,
        lastDeliveredAt: null,
      }]);
      setShowCreate(false);
      setNewUrl('');
      toast({ title: 'Webhook endpoint created', variant: 'success' });
    } catch (err) {
      toast({ title: 'Failed to create endpoint', description: String(err), variant: 'error' });
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/webhooks/${id}`, { method: 'DELETE' });
      setEndpoints((prev) => prev.filter((e) => e.id !== id));
      toast({ title: 'Endpoint deleted', variant: 'success' });
    } catch {
      toast({ title: 'Failed to delete endpoint', variant: 'error' });
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: 'Space Mono, monospace', fontSize: '20px', marginBottom: '4px' }}>Webhooks</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Signed with HMAC-SHA256 via <code style={{ fontFamily: 'IBM Plex Mono, monospace', color: 'var(--accent)' }}>X-ARE-Signature</code> header.
          </p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary" style={{ fontSize: '13px' }}>
          + Add Endpoint
        </button>
      </div>

      {showCreate && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '14px', marginBottom: '16px' }}>New Endpoint</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>ENDPOINT URL (HTTPS)</label>
            <input className="input" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://yourapp.example.com/webhooks/are" />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'IBM Plex Mono, monospace', letterSpacing: '0.1em', display: 'block', marginBottom: '8px' }}>EVENTS</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {ALL_EVENTS.map((e) => (
                <button key={e} onClick={() => toggleEvent(e)} style={{ padding: '4px 10px', border: `1px solid ${selectedEvents.includes(e) ? 'var(--accent)' : 'var(--border)'}`, borderRadius: '2px', background: selectedEvents.includes(e) ? 'var(--accent-dim)' : 'transparent', color: selectedEvents.includes(e) ? 'var(--accent)' : 'var(--text-secondary)', fontSize: '11px', fontFamily: 'IBM Plex Mono, monospace', cursor: 'pointer' }}>
                  {e}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setShowCreate(false)} className="btn" style={{ fontSize: '12px' }}>Cancel</button>
            <button onClick={handleCreate} className="btn-primary" style={{ fontSize: '12px' }} disabled={creating}>
              {creating ? <span className="spin-glyph">◈</span> : 'Create Endpoint'}
            </button>
          </div>
        </div>
      )}

      <div>
        {endpoints.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>No webhook endpoints yet.</p>
        ) : endpoints.map((ep) => (
          <div key={ep.id} className="table-row" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ep.isActive ? 'var(--success)' : 'var(--error)', display: 'inline-block', flexShrink: 0 }} />
                <code style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'IBM Plex Mono, monospace' }}>{ep.url}</code>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {ep.events.map((e) => <span key={e} className="badge" style={{ color: 'var(--accent)', fontSize: '10px' }}>{e}</span>)}
              </div>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'IBM Plex Mono, monospace', textAlign: 'right' }}>
              {ep.failureCount > 0 && <div style={{ color: 'var(--warning)' }}>{ep.failureCount} failures</div>}
              {ep.lastDeliveredAt && <div>Last: {new Date(ep.lastDeliveredAt).toLocaleDateString()}</div>}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href={`/api/webhooks/${ep.id}/deliveries`} className="btn" style={{ fontSize: '11px', padding: '4px 10px' }}>
                Deliveries
              </a>
              <button onClick={() => void handleDelete(ep.id)} className="btn" style={{ fontSize: '11px', color: 'var(--error)', borderColor: 'var(--error)', padding: '4px 10px' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Signature verification docs */}
      <div className="card" style={{ marginTop: '32px' }}>
        <h3 style={{ fontFamily: 'Space Mono, monospace', fontSize: '13px', marginBottom: '12px' }}>Signature Verification</h3>
        <pre style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '11px', color: 'var(--accent)', background: 'var(--bg-surface)', padding: '16px', borderRadius: '2px', overflowX: 'auto', margin: 0 }}>
{`const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(rawBody)
  .digest('hex');

// Compare with X-ARE-Signature header
if (signature !== req.headers['x-are-signature']) {
  return res.status(400).send('Invalid signature');
}`}
        </pre>
      </div>
    </div>
  );
}
