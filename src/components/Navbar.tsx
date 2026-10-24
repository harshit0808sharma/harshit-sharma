'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePortfolio } from '@/context/PortfolioContext';
import { TbMenu2, TbX } from 'react-icons/tb';

export function Navbar() {
  const { data } = usePortfolio();
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // If no DB data, render nothing per user instruction
  if (!data?.hero) {
    return null;
  }

  const firstName = data.hero.name?.trim() ? data.hero.name.trim().split(' ')[0] : 'Portfolio';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Skills', href: '#skills' },
    { label: 'Timeline', href: '#education' },
  ];

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <nav className="pointer-events-auto bg-[var(--theme-primary,#1E3A2B)] text-white rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between w-full max-w-5xl shadow-[0_10px_30px_rgba(0,0,0,0.2)] border border-white/10">
        {/* Brand Logo */}
        <Link href="#home" className="flex items-center gap-2.5 group">
          {data.hero.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.hero.logoUrl}
              alt="Logo"
              className="h-8 w-auto max-w-[120px] object-contain rounded-lg"
            />
          ) : (
            <>
              <div className="w-7 h-7 rounded-full bg-[var(--theme-accent,#FFB800)] text-[var(--theme-primary,#1E3A2B)] flex items-center justify-center font-extrabold text-xs shadow-xs group-hover:scale-105 transition-transform">
                {(data.hero.logoText || firstName).charAt(0)}
              </div>
              <span className="text-white font-bold text-base sm:text-lg tracking-tight font-sans">
                {data.hero.logoText || `${firstName}.`}
              </span>
            </>
          )}
        </Link>

        {/* Center Navigation Links (Desktop) */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setActiveTab(link.label)}
              className={`text-xs sm:text-sm font-medium transition-colors ${
                activeTab === link.label
                  ? 'text-[var(--theme-accent,#FFB800)] font-semibold'
                  : 'text-[#B8CEC0] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTA Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2">
          <a
            href={data.hero.ctaContactLink || '#contact'}
            className="bg-white text-[var(--theme-primary,#1E3A2B)] hover:bg-[#F3F1EC] font-semibold text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full transition-all shadow-xs active:scale-95 whitespace-nowrap"
          >
            {data.hero.ctaContactText || 'Contact Me'}
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <TbX className="w-4 h-4" /> : <TbMenu2 className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mt-2 w-full max-w-5xl bg-[var(--theme-primary,#1E3A2B)] text-white rounded-3xl p-4 border border-white/15 shadow-2xl space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                setActiveTab(link.label);
                setIsMobileMenuOpen(false);
              }}
              className={`block px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-colors ${
                activeTab === link.label
                  ? 'bg-[var(--theme-accent,#FFB800)] text-[#181818]'
                  : 'text-[#B8CEC0] hover:text-white hover:bg-white/10'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
