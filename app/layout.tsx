import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Script from 'next/script';
import BackgroundCanvas from '@/components/BackgroundCanvas';

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jacob Cromwell | AI Workflows, Marketing & Sales Systems',
  description: 'Jacob Cromwell is a hands-on builder connecting AI, automation, and marketing to build click-to-cash journeys.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js" strategy="beforeInteractive" />
        <Script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js" strategy="beforeInteractive" />
      </head>
      <body>
        <BackgroundCanvas />
        {children}
      </body>
    </html>
  );
}
