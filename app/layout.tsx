import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'A-Force Automotive Atelier — For Those Who Refuse Ordinary',
  description:
    'A luxury automotive atelier built for those who value performance, bespoke coachbuilding, and timeless craftsmanship.',
  openGraph: {
    title: 'A-Force Automotive Atelier — For Those Who Refuse Ordinary',
    description:
      'A luxury automotive atelier built for those who value performance, bespoke coachbuilding, and timeless craftsmanship.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A-Force Automotive Atelier — For Those Who Refuse Ordinary',
    description:
      'A luxury automotive atelier built for those who value performance, bespoke coachbuilding, and timeless craftsmanship.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} dark`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#0A0A0B] text-[#F4F4F1] font-sans antialiased selection:bg-[#C81E1E] selection:text-white"
      >
        {children}
      </body>
    </html>
  );
}
