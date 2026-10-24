'use client';

import { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export function DynamicFavicon() {
  const { data } = usePortfolio();

  useEffect(() => {
    const faviconUrl = data?.hero?.faviconUrl?.trim();
    if (faviconUrl) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'shortcut icon';
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    }

    if (data?.hero?.name) {
      const name = data.hero.name;
      const title = data.hero.title ? ` - ${data.hero.title}` : '';
      document.title = `${name}${title}`;
    }
  }, [data?.hero?.faviconUrl, data?.hero?.name, data?.hero?.title]);

  return null;
}
