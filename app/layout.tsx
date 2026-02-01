import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Better Auth Demo',
    template: '%s | Better Auth Demo',
  },
  description:
    'A complete authentication system built with Better Auth, Next.js, MongoDB, and shadcn/ui components.',
  authors: [{ name: 'Better Auth Demo' }],
  keywords: [
    'authentication',
    'better-auth',
    'next.js',
    'mongodb',
    'shadcn-ui',
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ),
  openGraph: {
    title: 'Better Auth Demo',
    description: 'Complete authentication system with Better Auth',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Auth Demo',
    description: 'Complete authentication system with Better Auth',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'hsl(0 0% 100%)' },
    { media: '(prefers-color-scheme: dark)', color: 'hsl(240 10% 3.9%)' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="font-sans antialiased"
        style={{
          colorScheme: 'dark light',
        }}
      >
        {children}
        <Toaster richColors position="top-right" closeButton duration={4000} />
      </body>
    </html>
  );
}
