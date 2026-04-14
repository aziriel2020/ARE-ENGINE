import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ToastProvider } from '@/components/ui/toast-provider';

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
    description: 'Your lyrics sound like you. Finally.',
  },
};

// Fallback used only at build time when Clerk env vars are not yet set.
// Real keys must be configured in Vercel environment variables for auth to work.
const BUILD_FALLBACK_PK = 'pk_test_dGVzdGluZy5jbGVyay5hY2NvdW50cy5kZXYk';
const publishableKey =
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || BUILD_FALLBACK_PK;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en" className="bg-[#000000]">
        <head />
        <body className="min-h-screen bg-[#000000] text-[#E8E8E8] font-body antialiased">
          <ToastProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
