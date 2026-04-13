import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-void)',
        padding: '24px',
      }}
    >
      <div>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontWeight: 700,
              fontSize: '24px',
              color: 'var(--accent)',
              letterSpacing: '-0.02em',
            }}
          >
            ARE-E
          </span>
          <p
            style={{
              fontSize: '13px',
              color: 'var(--text-secondary)',
              marginTop: '8px',
              fontFamily: 'IBM Plex Mono, monospace',
            }}
          >
            Your lyrics sound like you. Finally.
          </p>
        </div>
        <SignUp
          appearance={{
            variables: {
              colorBackground: '#0A0A0A',
              colorText: '#E8E8E8',
              colorPrimary: '#C8FF00',
              colorInputBackground: '#111111',
              colorInputText: '#E8E8E8',
              borderRadius: '2px',
              fontFamily: 'DM Sans, system-ui, sans-serif',
            },
          }}
        />
      </div>
    </div>
  );
}
