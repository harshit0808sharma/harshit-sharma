'use client';

import React from 'react';

/**
 * Genuine hand-drawn pen/brush stroke underline SVG
 * Mimics an organic human pen swipe with natural curve, taper, and ink double-trace.
 */
export function HandDrawnPenStroke({
  className = '',
  colorClass = 'text-[var(--theme-primary,#1E3A2B)]',
}: {
  className?: string;
  colorClass?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 280 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={`absolute left-0 -bottom-2 sm:-bottom-2.5 w-[104%] -left-[2%] h-[12px] sm:h-[15px] pointer-events-none overflow-visible ${colorClass} ${className}`}
    >
      {/* Primary organic pen stroke: natural curve, slight arch, authentic end flick */}
      <path
        d="M 3 13 C 48 5.5, 135 4, 277 8.5"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Natural hand-drawn ink trace / double stroke: gives unmistakable human pen feel */}
      <path
        d="M 18 15.5 C 72 10.5, 170 9.5, 262 12.5"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}

interface SectionHeadingProps {
  kicker?: string;
  prefix: string;
  highlight: string;
  suffix?: string;
  align?: 'left' | 'center';
  headingLevel?: 'h1' | 'h2';
  className?: string;
}

export function SectionHeading({
  kicker,
  prefix,
  highlight,
  suffix,
  align = 'left',
  headingLevel = 'h2',
  className = '',
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;

  return (
    <div className={`space-y-1.5 ${align === 'center' ? 'text-center mx-auto' : 'text-left'} ${className}`}>
      {kicker && (
        <span className="text-stone-500 font-bold text-xs sm:text-sm uppercase tracking-wider block">
          &mdash; {kicker}
        </span>
      )}
      <HeadingTag className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-[var(--theme-primary,#1E3A2B)] leading-tight">
        <span>{prefix}</span>{' '}
        <span className="relative inline-block text-[var(--theme-accent,#FFB800)]">
          {highlight}
          <HandDrawnPenStroke />
        </span>
        {suffix ? <span> {suffix}</span> : null}
      </HeadingTag>
    </div>
  );
}
