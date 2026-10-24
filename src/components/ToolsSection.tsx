'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { getBrandIconComponent } from '@/components/DynamicIcon';

export function ToolsSection() {
  const { data } = usePortfolio();

  // If no tools data in DB, return null per user instruction
  if (!data?.tools || data.tools.length === 0) {
    return null;
  }

  const getToolIcon = (name: string, customIconUrl?: string) => {
    if (customIconUrl && customIconUrl.trim()) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={customIconUrl}
          alt={name}
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain"
        />
      );
    }

    const { component: IconComponent, color } = getBrandIconComponent(name);
    return (
      <IconComponent
        className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-110"
        style={{ color: color || '#181818' }}
      />
    );
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto text-center">
      <SectionHeading
        align="center"
        kicker="My Favorite Tools"
        prefix="Exploring"
        highlight="Tools"
        className="mb-12 sm:mb-16 max-w-xl mx-auto"
      />

      {/* GRID OF TOOL CARDS WITH CONCENTRIC RINGS AND 1-LINE EXPLANATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {data.tools.map((tool) => (
          <div
            key={tool.name}
            className="group rounded-3xl bg-white border border-[#ECEAE2] p-7 flex flex-col items-center text-center shadow-xs hover:border-[#FFB800] hover:shadow-lg transition-all duration-300"
          >
            {/* Concentric Ripple Circular Badge */}
            <div className="p-2.5 rounded-full border border-stone-200/80 bg-white/40 shadow-xs group-hover:border-[#FFB800] transition-colors mb-5">
              <div className="p-1.5 rounded-full border border-stone-100 bg-[#FAF9F5]">
                <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white shadow-xs flex items-center justify-center">
                  {getToolIcon(tool.name, tool.customIconUrl)}
                </div>
              </div>
            </div>

            {/* Tool Name */}
            <h3 className="text-lg sm:text-xl font-bold text-[#181818] group-hover:text-[#1E3A2B] transition-colors">
              {tool.name}
            </h3>

            {/* Role Tag */}
            <span className="text-[11px] font-mono text-[#1E3A2B] font-semibold uppercase tracking-wider mt-1 mb-2.5 px-3 py-0.5 rounded-full bg-[#F6F5F0]">
              {tool.role}
            </span>

            {/* 1-Line Description */}
            <p className="text-xs sm:text-sm text-stone-500 font-sans leading-relaxed max-w-[260px]">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
