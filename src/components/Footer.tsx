'use client';

import React from 'react';
import Link from 'next/link';
import { FaArrowUp, FaGithub, FaLinkedin, FaXTwitter, FaEnvelope, FaInstagram, FaYoutube, FaGlobe, FaPhone } from 'react-icons/fa6';
import { usePortfolio } from '@/context/PortfolioContext';

export function Footer() {
  const { data } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If no DB data, return null
  if (!data?.hero) {
    return null;
  }

  const { hero } = data;
  const name = hero.name || 'Harshit Sharma';
  const title = hero.title || 'Full-Stack Software Engineer';
  const socialLinks = hero.socialLinks || {};

  return (
    <footer className="border-t border-[#ECEAE2] bg-[#FAF9F5] text-[#181818] pt-16 pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#ECEAE2]">
          
          {/* Column 1: Brand & Availability (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              {hero.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.logoUrl}
                  alt={hero.logoText || name}
                  className="h-10 w-auto max-w-[150px] object-contain rounded-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-xl bg-[var(--theme-primary,#1E3A2B)] text-[var(--theme-accent,#FFB800)] flex items-center justify-center font-extrabold text-base shadow-sm group-hover:scale-105 transition-transform">
                  {hero.logoText ? hero.logoText.charAt(0) : name.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-lg font-extrabold tracking-tight text-[#181818]">
                  {hero.logoText || name}
                </div>
                <div className="text-xs text-stone-500 font-sans">
                  {title}
                </div>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mb-5">
              Specializing in scalable distributed systems, high-performance web applications, and resilient cloud architectures.
            </p>

            {/* Availability Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{hero.availabilityStatus || 'Available for engineering roles & contracts'}</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Col 6-8) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Services', href: '#services' },
                { label: 'Featured Projects', href: '#projects' },
                { label: 'Blog & Insights', href: '/blog' },
                { label: 'Experience & Career', href: '#education' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-stone-600 hover:text-[#1E3A2B] font-medium transition-colors inline-block hover:translate-x-0.5 duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect & Socials (Col 9-12) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-stone-400 mb-4">
              Connect
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Feel free to reach out for project inquiries, technical collaborations, or just a tech chat.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.github && socialLinks.github.trim() && socialLinks.github !== '#' && (
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && socialLinks.linkedin.trim() && socialLinks.linkedin !== '#' && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && socialLinks.twitter.trim() && socialLinks.twitter !== '#' && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="X / Twitter"
                >
                  <FaXTwitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && socialLinks.instagram.trim() && socialLinks.instagram !== '#' && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && socialLinks.youtube.trim() && socialLinks.youtube !== '#' && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.website && socialLinks.website.trim() && socialLinks.website !== '#' && (
                <a
                  href={socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Website"
                >
                  <FaGlobe className="w-4 h-4" />
                </a>
              )}
              {socialLinks.email && socialLinks.email.trim() && (
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Email"
                >
                  <FaEnvelope className="w-4 h-4" />
                </a>
              )}
              {hero.phone && hero.phone.trim() && (
                <a
                  href={`tel:${hero.phone}`}
                  className="w-9 h-9 rounded-xl bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] text-stone-700 hover:text-[#1E3A2B] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                  title="Call / WhatsApp"
                >
                  <FaPhone className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>
            &copy; {new Date().getFullYear()} {name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#ECEAE2] hover:border-[#1E3A2B] hover:text-[#1E3A2B] text-stone-600 text-xs font-semibold transition-all shadow-2xs cursor-pointer group"
          >
            <span>Back to top</span>
            <FaArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
