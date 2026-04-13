import { Sidebar } from '@/components/studio/sidebar';

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{ flex: 1, overflow: 'auto', background: 'var(--bg-void)' }}>
        {children}
      </main>
    </div>
  );
}
