'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { getBrandIconComponent } from '@/components/DynamicIcon';

export function ProjectsSection() {
  const { data } = usePortfolio();
  const allProjects = data?.projects || [];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (allProjects.length === 0) {
    return null;
  }

  // Categories
  const categories = [
    'All',
    ...Array.from(new Set(allProjects.map((p) => p.category).filter(Boolean))),
  ];

  // Filter projects by category
  const filtered =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Main landing page shows ONLY 3 projects, all other projects are on /projects
  const displayProjects = filtered.slice(0, 3);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
        <SectionHeading
          kicker="Portfolio"
          prefix="Selected"
          highlight="Projects"
        />

        {/* View All Projects Pill in Header */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 border border-stone-300 hover:border-[#1E3A2B] bg-white hover:bg-[#1E3A2B] hover:text-white text-[#181818] rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all group self-start sm:self-auto shadow-2xs"
        >
          <span>Explore All Archive ({allProjects.length})</span>
          <span className="w-5 h-5 rounded-full bg-[#FFB800] text-[#1E3A2B] flex items-center justify-center text-[10px] group-hover:scale-110 transition-transform font-black">
            &rarr;
          </span>
        </Link>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                  isActive
                    ? 'bg-[#1E3A2B] text-white shadow-sm'
                    : 'bg-[#F6F5F0] text-stone-600 hover:text-[#181818] hover:bg-stone-200/70 border border-[#ECEAE2]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* Projects Grid (Strictly 3 projects on landing page) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {displayProjects.map((project, idx) => (
          <article
            key={project.id || idx}
            className="group bg-white rounded-3xl border border-[#ECEAE2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1E3A2B]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Category Pill Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#FFB800] text-[#181818] text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    {project.category || 'Product Design'}
                  </span>
                </div>

                {/* Year Tag */}
                {project.year && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#181818]/70 backdrop-blur-xs text-white text-[10px] font-mono">
                      {project.year}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="p-6 space-y-3">
                {/* Metrics badge */}
                {project.metrics && (
                  <div className="text-xs font-mono font-bold text-[#1E3A2B] bg-[#1E3A2B]/10 px-2.5 py-1 rounded-lg w-max">
                    ★ {project.metrics}
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-extrabold text-[#181818] tracking-tight group-hover:text-[#1E3A2B] transition-colors line-clamp-1">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack Tags with React Icons */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.slice(0, 4).map((tag, tIdx) => {
                      const { component: IconComp, color: brandColor } = getBrandIconComponent(tag);
                      return (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#ECEAE2] text-[10px] font-semibold text-stone-700 shadow-2xs"
                        >
                          <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: brandColor || '#1E3A2B' }} />
                          <span>{tag}</span>
                        </span>
                      );
                    })}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-1 rounded-lg bg-[#FAF9F5] border border-[#ECEAE2] text-[10px] font-mono text-stone-500 font-bold">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions Bar - Direct Live Preview & GitHub links */}
            <div className="p-6 pt-0 flex items-center gap-2.5">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#1E3A2B] hover:bg-[#162D21] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs group/btn active:scale-98"
                >
                  <span>Live Preview</span>
                  <FaArrowUpRightFromSquare className="w-3 h-3 text-[#FFB800] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              ) : (
                <span className="flex-1 py-2.5 px-4 rounded-xl bg-stone-100 text-stone-400 text-xs font-bold text-center">
                  Live Soon
                </span>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 px-3.5 rounded-xl bg-[#FAF9F5] hover:bg-[#1E3A2B] hover:text-white border border-[#ECEAE2] text-[#181818] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs cursor-pointer group/gh"
                  title="View Source Code"
                >
                  <FaGithub className="w-3.5 h-3.5 group-hover/gh:text-[#FFB800] transition-colors" />
                  <span className="text-[11px]">Code</span>
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
