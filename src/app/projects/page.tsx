'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { FaArrowLeft, FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { getBrandIconComponent } from '@/components/DynamicIcon';

export default function ProjectsPage() {
  const { data, isLoading } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const allProjects = data?.projects || [];

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(new Set(allProjects.map((p) => p.category).filter(Boolean))),
  ];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All'
      ? allProjects
      : allProjects.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181818] font-sans selection:bg-[#FFB800] selection:text-[#1E3A2B] flex flex-col">
      {/* ----------------- TOP NAVIGATION BAR ----------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECEAE2] py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF9F5] hover:bg-[#1E3A2B] text-[#181818] hover:text-white border border-[#ECEAE2] text-xs sm:text-sm font-bold transition-all shadow-2xs group"
          >
            <FaArrowLeft className="w-3.5 h-3.5 text-[#1E3A2B] group-hover:text-[#FFB800] transition-colors" />
            <span>Back to Home</span>
          </Link>

          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#1E3A2B] text-[#FFB800] font-black text-sm flex items-center justify-center shadow-xs">
              {data?.hero?.name ? data.hero.name.slice(0, 1).toUpperCase() : 'H'}
            </span>
            <span className="font-extrabold text-[#181818] text-sm tracking-tight hidden sm:inline">
              {data?.hero?.name || 'Harshit Sharma'}
            </span>
          </Link>

          {/* Contact Quick Link */}
          <Link
            href="/#contact"
            className="px-4 py-2 rounded-full bg-[#FFB800] hover:bg-[#E5A600] text-[#181818] text-xs sm:text-sm font-bold shadow-xs transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </header>

      {/* ----------------- PAGE HERO HEADER ----------------- */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A2B] text-[#FFB800] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Portfolio Archive</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
            <span>{allProjects.length} Projects</span>
          </div>

          {/* Main Title */}
          <SectionHeading
            align="center"
            headingLevel="h1"
            prefix="Selected Works &"
            highlight="Projects"
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A comprehensive collection of digital products, scalable web systems, and engineering projects built with modern ergonomics.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
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
                      : 'bg-white text-stone-600 hover:text-[#181818] hover:bg-stone-50 border border-[#ECEAE2]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- PROJECTS GRID ----------------- */}
      <main className="flex-1 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <div className="w-8 h-8 border-3 border-[#1E3A2B] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-xs font-mono">Loading projects archive...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#ECEAE2] p-8 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center mx-auto mb-3 text-xl">
              📂
            </div>
            <h3 className="text-base font-bold text-[#181818] mb-1">No Projects Found</h3>
            <p className="text-xs text-stone-500 mb-4">No projects match the selected category &quot;{selectedCategory}&quot;.</p>
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 rounded-full bg-[#1E3A2B] text-white text-xs font-bold cursor-pointer"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  key={project.id || idx}
                  id={project.id}
                  className="group bg-white rounded-3xl border border-[#ECEAE2] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                >
                  <div>
                    {/* Project Cover Image */}
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
                      <h3 className="text-xl font-extrabold text-[#181818] tracking-tight group-hover:text-[#1E3A2B] transition-colors">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags with React Icons */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {project.tags.map((tag, tIdx) => {
                            const { component: IconComp, color: brandColor } = getBrandIconComponent(tag);
                            return (
                              <span
                                key={tIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF9F5] border border-[#ECEAE2] text-[10px] font-semibold text-stone-700 shadow-2xs hover:border-black/30 transition-all"
                              >
                                <IconComp className="w-3.5 h-3.5 shrink-0" style={{ color: brandColor || '#1E3A2B' }} />
                                <span>{tag}</span>
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar - Direct Live Preview & GitHub links (No Case Study popup) */}
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
                        In Development
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
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="mt-auto py-8 px-4 sm:px-8 bg-white border-t border-[#ECEAE2] text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {data?.hero?.name || 'Harshit Sharma'}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#181818] font-medium">Home</Link>
            <Link href="/projects" className="hover:text-[#181818] font-bold text-[#1E3A2B]">Projects</Link>
            <Link href="/admin" className="hover:text-[#181818] font-medium">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
