'use client';

import React, { useState } from 'react';
import { TbBriefcase, TbSchool } from 'react-icons/tb';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';

export function ExperienceSection() {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const experiences = data?.experiences || [];
  const educations = data?.educations || [];

  // If no career journey data exists in DB, return null per user instruction
  if (experiences.length === 0 && educations.length === 0) {
    return null;
  }

  const items = activeTab === 'experience' ? experiences : educations;

  return (
    <section id="education" className="py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeading
          kicker="Career Journey"
          prefix="Timeline of"
          highlight="Milestones"
        />

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1 rounded-full bg-[#F2F0E8] border border-[#ECEAE2]">
          <button
            type="button"
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'experience'
                ? 'bg-[#1E3A2B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#181818]'
            }`}
          >
            <TbBriefcase className="w-4 h-4" />
            <span>Experience</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'education'
                ? 'bg-[#1E3A2B] text-white shadow-xs'
                : 'text-stone-600 hover:text-[#181818]'
            }`}
          >
            <TbSchool className="w-4 h-4" />
            <span>Education</span>
          </button>
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#E5E2D8] space-y-10 sm:space-y-12">
        {items.map((item: any, idx: number) => {
          const isExp = 'role' in item;
          const title = isExp ? item.role : item.degree;
          const subtitle = isExp ? item.company : item.institution;

          return (
            <div key={idx} className="relative group">
              {/* Timeline Circular Node Marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#FFB800] border-4 border-[#FAF9F5] shadow-xs group-hover:scale-125 transition-transform" />

              {/* Timeline Card Content */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#ECEAE2] shadow-2xs hover:shadow-md transition-shadow">
                {/* Period & Location Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#1E3A2B] text-white text-xs font-mono font-semibold">
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-stone-400">
                    {item.location}
                  </span>
                </div>

                {/* Title & Organization */}
                <h3 className="text-lg sm:text-xl font-bold text-[#181818] mt-2 font-sans">
                  {title}
                </h3>
                <div className="text-sm font-semibold text-[#FFB800] mb-3">
                  {subtitle}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
