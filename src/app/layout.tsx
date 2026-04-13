import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ARE-E — Artist Reality Engine',
  description:
    'Domain-specific creative intelligence platform for lyric generation with Vocal DNA and 28-Law quality scoring.',
  keywords: ['music', 'lyrics', 'AI', 'songwriter', 'vocal DNA'],
  authors: [{ name: 'ARE-E' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'ARE-E',
    title: 'ARE-E — Artist Reality Engine',
    description:
      'Your lyrics sound like you. Finally.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#000000]">
      <head>
        {/* Fonts loaded via globals.css @import */}
      </head>
      <body className="min-h-screen bg-[#000000] text-[#E8E8E8] font-body antialiased">
        {children}
      </body>
    </html>
  );
}
