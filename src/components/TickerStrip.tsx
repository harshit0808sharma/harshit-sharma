'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

export function TickerStrip() {
  const { data } = usePortfolio();

  // If no ticker data in database, render nothing per strict zero-dummy rule
  const items = data?.tickerItems;
  if (!items || items.length === 0) {
    return null;
  }

  // Multiply items for a seamless continuous marquee loop
  const marqueeList = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[var(--theme-accent,#FFB800)] py-4 sm:py-5 overflow-hidden select-none border-y-2 border-[var(--theme-primary,#1E3A2B)]/10 shadow-xs">
      <div className="flex items-center gap-6 sm:gap-8 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
        {marqueeList.map((item, index) => (
          <div key={index} className="flex items-center gap-6 sm:gap-8 shrink-0">
            <span className="font-extrabold text-[#181818] text-base sm:text-xl tracking-wide uppercase font-sans">
              {item}
            </span>
            <span className="text-[#181818] text-lg sm:text-2xl font-black">
              &#10038;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
