'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { FaArrowLeft, FaArrowRight, FaImage } from 'react-icons/fa6';

export interface BlogItem {
  _id: string;
  type: 'image_only' | 'content';
  title: string;
  description?: string;
  imageUrl?: string;
  imageAspectRatio?: string;
  gradient?: string;
  textColor?: 'dark' | 'light';
  buttonText?: string;
  buttonUrl?: string;
  category?: string;
  badge?: string;
  order: number;
  isPublished: boolean;
  createdAt?: string;
}

export default function BlogPage() {
  const { data: portfolioData } = usePortfolio();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories
  const categories = [
    'All',
    ...Array.from(
      new Set(
        blogs
          .map((b) => b.category?.trim())
          .filter((cat): cat is string => Boolean(cat && cat.length > 0))
      )
    ),
  ];

  // Filter blogs by selected category
  const filteredBlogs =
    selectedCategory === 'All'
      ? blogs
      : blogs.filter((b) => b.category?.toLowerCase() === selectedCategory.toLowerCase());

  // Fetch blogs from API
  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true);
        const res = await fetch('/api/blogs');
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setBlogs(json.data);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#181818] font-sans selection:bg-[#FFB800] selection:text-[#1E3A2B] flex flex-col">
      {/* ----------------- TOP NAVBAR ----------------- */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#ECEAE2] py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#1E3A2B] text-[#181818] hover:text-white border border-[#ECEAE2] text-xs sm:text-sm font-bold transition-all group"
          >
            <FaArrowLeft className="w-3.5 h-3.5 text-[#1E3A2B] group-hover:text-[#FFB800] transition-colors" />
            <span>Back to Home</span>
          </Link>

          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-[#1E3A2B] text-[#FFB800] font-black text-xs flex items-center justify-center">
              {portfolioData?.hero?.name ? portfolioData.hero.name.slice(0, 1).toUpperCase() : 'H'}
            </span>
            <span className="font-extrabold text-[#181818] text-sm tracking-tight hidden sm:inline">
              {portfolioData?.hero?.name || 'Harshit Sharma'}
            </span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <Link
              href="/projects"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-stone-600 hover:text-black hover:bg-stone-100 transition-all hidden sm:inline-block"
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-1.5 rounded-full bg-[#FFB800] hover:bg-[#E5A600] text-[#181818] text-xs sm:text-sm font-bold transition-all"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </header>

      {/* ----------------- PAGE HERO HEADER (FOLLOWING PORTFOLIO DESIGN PATTERN) ----------------- */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3A2B] text-[#FFB800] text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>Visual Journal</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
            <span>{blogs.length} Stories</span>
          </div>

          {/* Main Title using Portfolio SectionHeading with organic pen stroke */}
          <SectionHeading
            align="center"
            headingLevel="h1"
            prefix="Visual Journal &"
            highlight="Stories"
          />

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            A curated collection of design explorations, engineering thoughts, visual inspirations, and stories.
          </p>

          {/* Category Filter Pills (if multiple categories exist) */}
          {categories.length > 2 && (
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
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
          )}
        </div>
      </section>

      {/* ----------------- PINTEREST MASONRY (3 COLUMNS DESKTOP, COMPACT PADDING, TIGHT RADIUS) ----------------- */}
      <main className="flex-1 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-stone-400">
            <div className="w-8 h-8 border-3 border-[#1E3A2B] border-t-transparent rounded-full animate-spin mb-3" />
            <p className="text-xs font-mono">Loading stories...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-[#ECEAE2] p-6 max-w-md mx-auto">
            <div className="w-10 h-10 rounded-xl bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center mx-auto mb-2 text-lg">
              <FaImage />
            </div>
            <h3 className="text-sm font-bold text-[#181818] mb-1">
              {blogs.length === 0 ? 'No Posts Yet' : 'No Posts In This Category'}
            </h3>
            <p className="text-xs text-stone-500">
              {blogs.length === 0
                ? 'Upload image pins or content cards from admin.'
                : 'Try selecting a different category or "All".'}
            </p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 [column-fill:_balance]">
            {filteredBlogs.map((blog, idx) => {
              const isImageOnly = blog.type === 'image_only';
              const isLightText = blog.textColor === 'light';
              const hasCardLink = Boolean(blog.buttonUrl && blog.buttonUrl.trim());

              return (
                <div
                  key={blog._id || idx}
                  className="break-inside-avoid mb-4 sm:mb-5 transition-all"
                >
                  {isImageOnly ? (
                    /* ---------------- TYPE 1: PURE IMAGE ONLY PIN (NO AWKWARD BOX) ---------------- */
                    hasCardLink ? (
                      <a
                        href={blog.buttonUrl}
                        target={blog.buttonUrl?.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="group block relative rounded-xl overflow-hidden border border-[#ECEAE2] hover:border-black/40 bg-white transition-colors"
                      >
                        {blog.imageUrl ? (
                          <div className="relative w-full overflow-hidden bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={blog.imageUrl}
                              alt={blog.title || 'Visual pin'}
                              className="w-full h-auto block object-cover group-hover:scale-[1.015] transition-transform duration-300"
                              loading="lazy"
                            />

                            {/* Optional Badge */}
                            {blog.badge && (
                              <div className="absolute top-2.5 left-2.5 z-10">
                                <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider">
                                  {blog.badge}
                                </span>
                              </div>
                            )}

                            {/* Floating Button if text provided */}
                            {blog.buttonText && (
                              <div className="absolute bottom-2.5 right-2.5 z-10">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/85 text-white text-[11px] font-bold backdrop-blur-xs group-hover:bg-[#1E3A2B] transition-colors">
                                  <span>{blog.buttonText}</span>
                                  <FaArrowRight className="w-2.5 h-2.5 text-[#FFB800]" />
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-6 aspect-square flex flex-col items-center justify-center text-center bg-stone-100 text-stone-400">
                            <FaImage className="w-6 h-6 mb-1 opacity-50" />
                            <h3 className="font-bold text-xs text-stone-700">{blog.title || 'Untitled Image'}</h3>
                          </div>
                        )}

                        {/* Title/Description bar ONLY if user wrote text */}
                        {(blog.title || blog.description) && (
                          <div className="p-3 bg-white border-t border-[#ECEAE2] space-y-0.5">
                            {blog.title && (
                              <h3 className="text-xs sm:text-sm font-bold text-[#181818] tracking-tight group-hover:text-[#1E3A2B] transition-colors leading-snug">
                                {blog.title}
                              </h3>
                            )}
                            {blog.description && (
                              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                                {blog.description}
                              </p>
                            )}
                          </div>
                        )}
                      </a>
                    ) : (
                      <div className="group relative rounded-xl overflow-hidden border border-[#ECEAE2] bg-white transition-colors">
                        {blog.imageUrl ? (
                          <div className="relative w-full overflow-hidden bg-stone-100">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={blog.imageUrl}
                              alt={blog.title || 'Visual pin'}
                              className="w-full h-auto block object-cover"
                              loading="lazy"
                            />

                            {blog.badge && (
                              <div className="absolute top-2.5 left-2.5 z-10">
                                <span className="px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider">
                                  {blog.badge}
                                </span>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="p-6 aspect-square flex flex-col items-center justify-center text-center bg-stone-100 text-stone-400">
                            <FaImage className="w-6 h-6 mb-1 opacity-50" />
                            <h3 className="font-bold text-xs text-stone-700">{blog.title || 'Untitled Image'}</h3>
                          </div>
                        )}

                        {(blog.title || blog.description) && (
                          <div className="p-3 bg-white border-t border-[#ECEAE2] space-y-0.5">
                            {blog.title && (
                              <h3 className="text-xs sm:text-sm font-bold text-[#181818] tracking-tight leading-snug">
                                {blog.title}
                              </h3>
                            )}
                            {blog.description && (
                              <p className="text-[11px] text-stone-500 leading-relaxed line-clamp-2">
                                {blog.description}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    /* ---------------- TYPE 2: SOLID COLOR OR GRADIENT CONTENT CARD ---------------- */
                    <article
                      style={{
                        background: blog.gradient || '#F6F5F0',
                      }}
                      className={`group relative rounded-xl p-4 sm:p-5 border border-black/5 transition-colors flex flex-col justify-between overflow-hidden ${
                        isLightText ? 'text-white' : 'text-[#181818]'
                      }`}
                    >
                      <div className="space-y-2">
                        {blog.badge && (
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-extrabold uppercase tracking-widest ${
                              isLightText
                                ? 'bg-white/20 text-white backdrop-blur-sm'
                                : 'bg-black/10 text-[#181818]'
                            }`}
                          >
                            {blog.badge}
                          </span>
                        )}

                        <h3
                          className={`text-lg sm:text-xl font-bold tracking-tight leading-snug ${
                            isLightText ? 'text-white' : 'text-[#181818]'
                          }`}
                        >
                          {blog.title}
                        </h3>

                        {blog.description && (
                          <p
                            className={`text-xs sm:text-[13px] leading-relaxed ${
                              isLightText ? 'text-white/85' : 'text-stone-700'
                            }`}
                          >
                            {blog.description}
                          </p>
                        )}
                      </div>

                      {/* Optional Inside Graphic */}
                      {blog.imageUrl && (
                        <div className="my-3 rounded-lg overflow-hidden border border-white/30 bg-white/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={blog.imageUrl}
                            alt={blog.title}
                            className="w-full h-auto object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Simple Button */}
                      {blog.buttonText && (
                        <div className="pt-3.5 mt-auto flex items-center justify-between">
                          <a
                            href={blog.buttonUrl || '#'}
                            target={blog.buttonUrl?.startsWith('http') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-98 ${
                              isLightText
                                ? 'bg-white text-black hover:bg-[#FFB800]'
                                : 'bg-[#181818] text-white hover:bg-black'
                            }`}
                          >
                            <span>{blog.buttonText}</span>
                            <FaArrowRight className="w-2.5 h-2.5 text-[#FFB800]" />
                          </a>
                        </div>
                      )}
                    </article>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ----------------- FOOTER ----------------- */}
      <footer className="mt-auto py-6 px-4 sm:px-8 bg-white border-t border-[#ECEAE2] text-center text-xs text-stone-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {portfolioData?.hero?.name || 'Harshit Sharma'}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#181818] font-medium">Home</Link>
            <Link href="/projects" className="hover:text-[#181818] font-medium">Projects</Link>
            <Link href="/blog" className="hover:text-[#181818] font-bold text-[#1E3A2B]">Blog</Link>
            <Link href="/admin" className="hover:text-[#181818] font-medium">Admin</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
