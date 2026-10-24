'use client';

import React from 'react';
import { FaArrowDown } from 'react-icons/fa6';
import { usePortfolio } from '@/context/PortfolioContext';
import { HandDrawnPenStroke } from '@/components/SectionHeading';

export function AboutSection() {
  const { data } = usePortfolio();

  // If no about data in DB or both heading and description are empty, render nothing
  if (!data?.about || (!data.about.heading?.trim() && !data.about.description?.trim())) {
    return null;
  }

  const { about, hero } = data;

  const defaultPills = [
    { label: 'Full-Stack Dev', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-12deg', top: '55%', left: '18%' },
    { label: 'Next.js 16 & React 19', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '-5deg', top: '65%', left: '6%' },
    { label: 'Node.js & Express', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '4deg', top: '68%', left: '44%' },
    { label: 'REST & GraphQL APIs', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-4deg', top: '78%', left: '10%' },
    { label: 'Docker & Microservices', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '2deg', top: '80%', left: '38%' },
    { label: 'PostgreSQL & MongoDB', bg: 'bg-[#1E3A2B]', text: 'text-white border border-white/25', rotate: '8deg', top: '76%', left: '60%' },
    { label: 'System Design', bg: 'bg-[#FFB800]', text: 'text-[#181818]', rotate: '-2deg', top: '90%', left: '30%' },
  ];

  const pillsToRender = about.fannedPills && about.fannedPills.length > 0 ? about.fannedPills : defaultPills;

  return (
    <section id="about" className="w-full bg-[var(--theme-primary,#1E3A2B)] text-white py-20 sm:py-28 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* LEFT COLUMN: Circular Portrait Backdrop with Fanned Skill Pills */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-88 sm:h-88">
            
            {/* Yellow Circle Backdrop */}
            <div className="w-full h-full rounded-full bg-[var(--theme-accent,#FFB800)] relative overflow-hidden flex items-end justify-center shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.avatarUrl || hero?.avatarUrl || '/assets/hero-image.png'}
                alt={hero?.name || 'Harshit Sharma'}
                className="w-[95%] h-[95%] object-cover object-top pointer-events-none drop-shadow-md"
              />
            </div>

            {/* Overlapping Fanned Badges */}
            <div className="absolute inset-0 pointer-events-none">
              {pillsToRender.map((pill, idx) => (
                <div
                  key={idx}
                  style={{
                    top: pill.top,
                    left: pill.left,
                    transform: `rotate(${pill.rotate})`,
                  }}
                  className={`absolute ${pill.bg} ${pill.text} text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md whitespace-nowrap select-none`}
                >
                  {pill.label}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: About Narrative, Stats, and Signature */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Kicker */}
          <span className="text-[var(--theme-accent,#FFB800)] font-semibold text-xs sm:text-sm uppercase tracking-wider block mb-2">
            &mdash; About Me
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
            {about.heading ? (
              about.heading
            ) : (
              <>
                Who is{' '}
                <span className="relative inline-block text-[var(--theme-accent,#FFB800)]">
                  {hero?.name || 'Harshit Sharma'}
                  <HandDrawnPenStroke colorClass="text-[var(--theme-accent,#FFB800)]" />
                </span>
                ?
              </>
            )}
          </h2>

          {/* Description */}
          <p className="text-[#B9CFBE] text-sm sm:text-base leading-relaxed mb-8 max-w-lg font-sans">
            {about.description}
          </p>

          {/* Stats Counters in a Row */}
          {about.stats && about.stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pb-8 mb-8 border-b border-white/10 w-full max-w-lg">
              {about.stats.map((stat, sIdx) => (
                <div key={sIdx}>
                  <div className="text-2xl sm:text-4xl font-extrabold text-[#FFB800] tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-[#96B59D] text-xs sm:text-sm mt-1 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Action Row: Download CV Pill + Cursive Signature */}
          <div className="flex flex-wrap items-center gap-8 sm:gap-12">
            {/* Download CV Button */}
            <a
              href={hero?.resumeUrl || '#about'}
              target={hero?.resumeUrl && hero.resumeUrl.startsWith('http') ? '_blank' : undefined}
              rel={hero?.resumeUrl && hero.resumeUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-[#294B37] hover:bg-[#325C44] border border-white/20 text-white rounded-full pl-6 pr-1.5 py-1.5 text-xs sm:text-sm font-semibold flex items-center gap-3 shadow-sm transition-all group"
            >
              <span>Download CV</span>
              <span className="w-7 h-7 rounded-full bg-[#FFB800] text-[#1E3A2B] flex items-center justify-center text-xs group-hover:translate-y-0.5 transition-transform">
                <FaArrowDown className="w-2.5 h-2.5" />
              </span>
            </a>

            {/* Handwritten Signature */}
            <div className="select-none">
              <span
                style={{ fontFamily: 'var(--font-caveat), cursive' }}
                className="text-[#FFB800] text-3xl sm:text-4xl font-bold tracking-wide italic inline-block"
              >
                {about.signature || 'Harshit Sharma'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
