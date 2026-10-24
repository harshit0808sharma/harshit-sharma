'use client';

import React from 'react';
import { FaPlay } from 'react-icons/fa6';
import { BsArrowUpRight } from 'react-icons/bs';
import { usePortfolio } from '@/context/PortfolioContext';
import { HandDrawnPenStroke } from '@/components/SectionHeading';

export function Hero() {
  const { data } = usePortfolio();

  // If no data is returned from DB, show nothing per user instruction
  if (!data?.hero) {
    return null;
  }

  const { hero } = data;

  return (
    <section id="home" className="relative pt-24 sm:pt-32 pb-0 px-4 sm:px-8 max-w-6xl mx-auto overflow-x-clip">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* LEFT COLUMN: Text & CTAs (Vertically centered) */}
        <div className="lg:col-span-6 flex flex-col items-start z-10 py-6">
          
          {/* Top Yellow Corner Bracket Badge: Hello There! */}
          <div className="inline-flex items-center px-4 py-1.5 border border-[#FFB800] rounded-xs text-[#181818] text-xs sm:text-sm font-medium bg-white/95 relative shadow-2xs select-none">
            {/* Corner Markers */}
            <span className="w-1.5 h-1.5 bg-[#FFB800] absolute -top-0.5 -left-0.5" />
            <span className="w-1.5 h-1.5 bg-[#FFB800] absolute -top-0.5 -right-0.5" />
            <span className="w-1.5 h-1.5 bg-[#FFB800] absolute -bottom-0.5 -left-0.5" />
            <span className="w-1.5 h-1.5 bg-[#FFB800] absolute -bottom-0.5 -right-0.5" />
            <span>{hero.greeting || 'Hello There!'}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#181818] leading-[1.12] tracking-tight mt-5">
            I’m{' '}
            <span className="relative inline-block text-[var(--theme-accent,#FFB800)]">
              {hero.name}
              <HandDrawnPenStroke />
            </span>
            ,<br />
            {hero.title && hero.title.includes('Based in') ? (
              <>
                {hero.title.split('Based in')[0]}<br />
                Based in {hero.title.split('Based in')[1].trim()}
              </>
            ) : (
              hero.title || (
                <>
                  Full-Stack Software Engineer<br />
                  &amp; Systems Developer
                </>
              )
            )}
          </h1>

          {/* Subtext Description */}
          <p className="text-[#666666] text-sm sm:text-base leading-relaxed max-w-md mt-5 mb-8 font-sans">
            {hero.bio}
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Button 1: View My Portfolio with Play Button */}
            <a
              href={hero.ctaPortfolioLink || '#projects'}
              className="bg-[var(--theme-primary,#1E3A2B)] text-white rounded-full pl-6 pr-1.5 py-1.5 flex items-center gap-3 text-xs sm:text-sm font-semibold shadow-md hover:opacity-95 transition-all group"
            >
              <span>{hero.ctaPortfolioText || 'View My Portfolio'}</span>
              <span className="w-8 h-8 rounded-full bg-[var(--theme-accent,#FFB800)] text-[#181818] flex items-center justify-center text-[10px] group-hover:scale-105 transition-transform">
                <FaPlay className="ml-0.5" />
              </span>
            </a>

            {/* Button 2: Hire Me Outline Button */}
            <a
              href={hero.ctaHireMeLink || '#contact'}
              className="border-2 border-[#181818] hover:bg-[#181818] hover:text-white text-[#181818] rounded-full px-7 py-2.5 text-xs sm:text-sm font-semibold transition-all"
            >
              {hero.ctaHireMeText || 'Hire Me'}
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: Character with Yellow Freeform Shape Directly Behind */}
        <div className="lg:col-span-6 relative flex justify-center items-end min-h-[460px] sm:min-h-[520px] lg:min-h-[580px]">
          
          {/* THE YELLOW FREEFORM ORGANIC BACKDROP */}
          <div className="absolute bottom-0 left-1/2 -translate-x-[53%] w-[340px] sm:w-[420px] lg:w-[460px] h-[310px] sm:h-[380px] lg:h-[420px] z-0 pointer-events-none">
            {/* Outer concentric contour line tracing the curve */}
            <div
              style={{ borderRadius: '58% 42% 56% 44% / 46% 54% 46% 54%' }}
              className="absolute -inset-3 border border-[var(--theme-primary,#1E3A2B)]/25 -rotate-3 pointer-events-none"
            />

            {/* Main Solid Vibrant Yellow Organic Blob Shape */}
            <div
              style={{ borderRadius: '58% 42% 56% 44% / 46% 54% 46% 54%' }}
              className="w-full h-full bg-[var(--theme-accent,#FFB800)] shadow-sm -rotate-3"
            />
          </div>

          {/* REAL CHARACTER IMAGE */}
          <div className="relative z-10 flex justify-center items-end w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero.avatarUrl || '/assets/hero-image.png'}
              alt={`${hero.name} - ${hero.title}`}
              className="h-[450px] sm:h-[510px] lg:h-[560px] w-auto max-w-[360px] sm:max-w-[430px] lg:max-w-[500px] object-contain object-bottom pointer-events-none drop-shadow-xl block"
            />
          </div>

          {/* FLOATING BADGE 1: Circular "HIRE ME" Stamp (Top Right) */}
          <a
            href={hero.ctaHireMeLink || '#contact'}
            className="absolute top-10 sm:top-14 right-2 sm:right-6 lg:right-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1E3A2B] text-[#FFB800] p-1.5 shadow-xl flex items-center justify-center z-20 hover:scale-105 transition-transform"
          >
            {/* Rotating SVG circular text */}
            <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 animate-[spin_14s_linear_infinite]">
              <path
                id="hireMePath"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                fill="none"
              />
              <text className="text-[9px] font-bold tracking-[2px] uppercase fill-[#FFB800]">
                <textPath href="#hireMePath">
                  &bull; {hero.ctaHireMeText?.toUpperCase() || 'HIRE ME'} &bull; {hero.ctaHireMeText?.toUpperCase() || 'HIRE ME'} &bull; {hero.ctaHireMeText?.toUpperCase() || 'HIRE ME'}
                </textPath>
              </text>
            </svg>

            {/* Center Circle with Arrow */}
            <div className="w-8 h-8 rounded-full bg-[#FFB800] text-[#1E3A2B] flex items-center justify-center font-bold text-xs shadow-xs z-10">
              <BsArrowUpRight className="w-4 h-4 stroke-1" />
            </div>
          </a>

          {/* FLOATING BADGE 2: Yellow Pill (Bottom Right) */}
          <div className="absolute bottom-20 sm:bottom-24 right-2 sm:right-8 lg:right-12 bg-[#FFB800] text-[#181818] font-bold text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-lg z-20 select-none max-w-[150px] sm:max-w-none truncate">
            {data?.services?.[0]?.title || data?.tickerItems?.[0] || 'Full-Stack Developer'}
          </div>

          {/* FLOATING BADGE 3: Dark Green Pill (Bottom Left) */}
          <div className="absolute bottom-12 sm:bottom-16 left-2 sm:left-6 lg:left-8 z-20 flex items-center gap-1.5 select-none max-w-[160px] sm:max-w-none">
            {/* Dark green triangular pointer cursor */}
            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-r-[11px] border-r-[#1E3A2B] -rotate-12 shrink-0" />
            <div className="bg-[#1E3A2B] text-white font-semibold text-[11px] sm:text-sm px-3 sm:px-4 py-1.5 rounded-full shadow-lg border border-[#2B4E3B] truncate">
              {hero.title ? hero.title.split('Based in')[0].trim() : 'Software Engineer'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
