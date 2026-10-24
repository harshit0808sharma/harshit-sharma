import type { Metadata } from 'next';
import { Geist, Geist_Mono, Caveat } from 'next/font/google';
import './globals.css';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { DynamicFavicon } from '@/components/DynamicFavicon';
import { DynamicThemeStyle } from '@/components/DynamicThemeStyle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Harshit Sharma - Full-Stack Software Engineer & Distributed Systems Developer',
  description:
    'Full-Stack Software Engineer specializing in scalable web applications, distributed backend microservices, and cloud architectures with Next.js, Node.js, and TypeScript.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
    >
      <body className="bg-[#FAF9F5] min-h-screen text-[#181818] antialiased selection:bg-[#FFB800] selection:text-[#1E3A2B] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <PortfolioProvider>
          <DynamicFavicon />
          <DynamicThemeStyle />
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
