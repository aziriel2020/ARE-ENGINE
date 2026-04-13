export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center">
        <h1
          className="text-5xl font-heading text-[#E8E8E8] mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          ARE-E
        </h1>
        <p className="text-[#888888] font-code text-sm mb-8">
          Artist Reality Engine — V3.0 Opus Supreme
        </p>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-code"
          style={{
            border: '1px solid #1A1A1A',
            borderRadius: '2px',
            color: '#C8FF00',
          }}
        >
          <span className="spin-glyph">◈</span>
          <span>Platform initializing...</span>
        </div>
      </div>
    </main>
  );
}
