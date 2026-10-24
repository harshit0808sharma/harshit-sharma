'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { getBrandIconComponent } from '@/components/DynamicIcon';

export function SkillsSection() {
  const { data } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // If no skills data in DB, return null per user instruction
  if (!data?.skills || data.skills.length === 0) {
    return null;
  }

  const categories = ['All', ...Array.from(new Set(data.skills.map((s) => s.category).filter(Boolean)))];

  const getTechIcon = (name: string, customIconUrl?: string) => {
    if (customIconUrl && customIconUrl.trim()) {
      return (
        <div className="w-8 h-8 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center p-1 overflow-hidden shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={customIconUrl}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
      );
    }

    const { component: IconComponent, color } = getBrandIconComponent(name);
    return (
      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200/90 flex items-center justify-center p-1.5 shadow-2xs">
        <IconComponent className="w-5 h-5" style={{ color: color || '#181818' }} />
      </div>
    );
  };

  const filteredSkills =
    activeCategory === 'All'
      ? data.skills
      : data.skills.filter((t) => t.category === activeCategory);

  return (
    <section id="skills" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          kicker="Core Competencies"
          prefix="Technical &"
          highlight="Design Skills"
        />

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#1E3A2B] text-white shadow-xs'
                  : 'bg-[#F2F0E8] text-stone-600 hover:bg-[#E5E2D8] hover:text-[#181818]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ANIMATED SCATTERED LOGOS */}
      <motion.div
        layout
        className="flex flex-wrap items-center justify-center gap-5 sm:gap-7 py-6 min-h-[280px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((tech) => (
            <motion.div
              layout
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{ transform: `rotate(${tech.rotate || '0deg'})` }}
              className="group cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-[#ECEAE2] shadow-xs group-hover:border-[#FFB800] group-hover:shadow-md transition-all">
                {getTechIcon(tech.name, tech.customIconUrl)}
                <div>
                  <div className="text-sm font-bold text-[#181818] tracking-tight whitespace-nowrap group-hover:text-[#1E3A2B] transition-colors">
                    {tech.name}
                  </div>
                  <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    {tech.category}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
