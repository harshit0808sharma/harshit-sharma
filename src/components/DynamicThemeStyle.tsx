'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { usePortfolio } from '@/context/PortfolioContext';

export interface GoogleFontItem {
  name: string;
  family: string;
  weights: string;
  desc?: string;
}

export const AVAILABLE_GOOGLE_FONTS: GoogleFontItem[] = [
  { name: 'Space Grotesk', family: 'Space+Grotesk', weights: '400;500;600;700', desc: 'Tech & Engineering Proportional Grotesk' },
  { name: 'Inter', family: 'Inter', weights: '300;400;500;600;700;800', desc: 'Clean & Ultra-Readable Modern UI' },
  { name: 'Plus Jakarta Sans', family: 'Plus+Jakarta+Sans', weights: '400;500;600;700;800', desc: 'Warm Contemporary Geometric Sans' },
  { name: 'Outfit', family: 'Outfit', weights: '400;500;600;700;800;900', desc: 'Vibrant & Trendy High-End Luxury' },
  { name: 'Poppins', family: 'Poppins', weights: '400;500;600;700;800', desc: 'Friendly Geometric Curves' },
  { name: 'DM Sans', family: 'DM+Sans', weights: '400;500;700', desc: 'Precise Minimalist Low-Contrast Sans' },
  { name: 'Montserrat', family: 'Montserrat', weights: '400;500;600;700;800', desc: 'Bold Geometric Architecture-Inspired' },
  { name: 'Roboto', family: 'Roboto', weights: '300;400;500;700', desc: 'Standard Clean Universal Sans' },
  { name: 'Manrope', family: 'Manrope', weights: '400;500;600;700;800', desc: 'Semi-Condensed Balanced Modern Sans' },
  { name: 'Syne', family: 'Syne', weights: '500;600;700;800', desc: 'Avant-Garde High-Impact Display' },
  { name: 'Playfair Display', family: 'Playfair+Display', weights: '400;600;700;900', desc: 'Prestigious Luxury Editorial Serif' },
  { name: 'Fira Code', family: 'Fira+Code', weights: '400;500;600;700', desc: 'Developer Programming Monospace' },
];

export function getGoogleFontsUrl(fontName?: string): string | null {
  const entry = AVAILABLE_GOOGLE_FONTS.find((f) => f.name === fontName);
  if (!entry || !entry.family) return null;
  return `https://fonts.googleapis.com/css2?family=${entry.family}:wght@${entry.weights}&display=swap`;
}

export function DynamicThemeStyle() {
  const pathname = usePathname();
  const { data } = usePortfolio();
  const theme = data?.theme;

  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    // If on /admin, REMOVE any theme active attribute and cleanup
    if (isAdmin) {
      document.documentElement.removeAttribute('data-theme-active');
      return;
    }

    if (!theme) return;

    const fontName = theme.font || theme.headingFont || 'Space Grotesk';
    const primaryColor = theme.primary || '#1E3A2B';
    const accentColor = theme.accent || '#FFB800';
    const darkColor = theme.dark || '#181818';
    const lightColor = theme.light || '#FAF9F5';

    const root = document.documentElement;
    root.style.setProperty('--theme-font', `'${fontName}', sans-serif`);
    root.style.setProperty('--theme-primary', primaryColor);
    root.style.setProperty('--theme-accent', accentColor);
    root.style.setProperty('--theme-dark', darkColor);
    root.style.setProperty('--theme-light', lightColor);
    root.setAttribute('data-theme-active', 'true');

    // Dynamic Google Fonts stylesheet link injection
    const fontUrl = getGoogleFontsUrl(fontName);
    let link = document.getElementById('portfolio-google-fonts') as HTMLLinkElement | null;
    if (fontUrl) {
      if (!link) {
        link = document.createElement('link');
        link.id = 'portfolio-google-fonts';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      link.href = fontUrl;
    } else if (link) {
      link.remove();
    }
  }, [theme, isAdmin]);

  // NEVER render on Admin pages
  if (isAdmin || !theme) return null;

  const fontName = theme.font || theme.headingFont || 'Space Grotesk';
  const primaryColor = theme.primary || '#1E3A2B';
  const accentColor = theme.accent || '#FFB800';
  const darkColor = theme.dark || '#181818';
  const lightColor = theme.light || '#FAF9F5';

  return (
    <style
      id="portfolio-dynamic-theme"
      dangerouslySetInnerHTML={{
        __html: `
        :root {
          --theme-font: '${fontName}', sans-serif;
          --theme-primary: ${primaryColor};
          --theme-accent: ${accentColor};
          --theme-dark: ${darkColor};
          --theme-light: ${lightColor};
        }

        /* Forcefully apply the chosen font uniformly across the whole portfolio */
        [data-theme-active],
        [data-theme-active] * {
          font-family: var(--theme-font), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* Handwritten signature retains cursive font */
        [data-theme-active] .font-signature {
          font-family: var(--font-caveat), 'Caveat', cursive !important;
        }

        /* Mono code elements retain monospace */
        [data-theme-active] .font-mono {
          font-family: var(--font-geist-mono), monospace !important;
        }

        /* High contrast protection: text on dark elements stays pure white */
        [data-theme-active] #about,
        [data-theme-active] #about h2,
        [data-theme-active] #about p,
        [data-theme-active] nav,
        [data-theme-active] .text-white,
        [data-theme-active] [class~="text-white"],
        [data-theme-active] .hover\\:text-white:hover {
          color: #FFFFFF !important;
        }

        [data-theme-active] #about p.text-\\[\\#B9CFBE\\],
        [data-theme-active] .text-\\[\\#B8CEC0\\],
        [data-theme-active] .text-\\[\\#96B59D\\] {
          color: #B8CEC0 !important;
        }

        [data-theme-active] .hover\\:bg-\\[\\#181818\\]:hover {
          background-color: #181818 !important;
          color: #FFFFFF !important;
        }
      `,
      }}
    />
  );
}
