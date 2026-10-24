'use client';

import React, { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';
import { FaPaperPlane, FaEnvelope, FaLocationDot, FaPhone, FaInstagram, FaYoutube, FaGlobe } from 'react-icons/fa6';

export function ContactSection() {
  const { data, submitInquiry } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If no portfolio data from DB, return null per user instruction
  if (!data?.hero) {
    return null;
  }

  const socialLinks = data.hero.socialLinks || {};

  const activeSocials = [
    socialLinks.github && socialLinks.github.trim() && socialLinks.github !== '#'
      ? {
          label: 'GitHub',
          href: socialLinks.github,
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          ),
        }
      : null,
    socialLinks.linkedin && socialLinks.linkedin.trim() && socialLinks.linkedin !== '#'
      ? {
          label: 'LinkedIn',
          href: socialLinks.linkedin,
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
          ),
        }
      : null,
    socialLinks.twitter && socialLinks.twitter.trim() && socialLinks.twitter !== '#'
      ? {
          label: 'Twitter / X',
          href: socialLinks.twitter,
          icon: (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
        }
      : null,
    socialLinks.instagram && socialLinks.instagram.trim() && socialLinks.instagram !== '#'
      ? {
          label: 'Instagram',
          href: socialLinks.instagram,
          icon: <FaInstagram className="w-4 h-4" />,
        }
      : null,
    socialLinks.youtube && socialLinks.youtube.trim() && socialLinks.youtube !== '#'
      ? {
          label: 'YouTube',
          href: socialLinks.youtube,
          icon: <FaYoutube className="w-4 h-4" />,
        }
      : null,
    socialLinks.dribbble && socialLinks.dribbble.trim() && socialLinks.dribbble !== '#'
      ? {
          label: 'Dribbble',
          href: socialLinks.dribbble,
          icon: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm7.77 8.78a8.24 8.24 0 0 1-3.64 6.78c-.28-1.46-.92-2.9-1.88-4.25a21.4 21.4 0 0 0 5.52-2.53zM12 3.82a8.16 8.16 0 0 1 5.9 2.51 19.38 19.38 0 0 1-5.18 2.37A29.43 29.43 0 0 0 9.87 4a8.07 8.07 0 0 1 2.13-.18zM8.07 4.7a31.33 31.33 0 0 1 2.87 4.67 18.29 18.29 0 0 1-7.06 1.15A8.18 8.18 0 0 1 8.07 4.7zm-4.25 7.6a16.65 16.65 0 0 0 6.64-1 16.73 16.73 0 0 1 1.63 3.63 15.65 15.65 0 0 1-7.79 3.42A8.15 8.15 0 0 1 3.82 12.3zm8.18 7.86a8.16 8.16 0 0 1-5-1.74 13.88 13.88 0 0 0 7.21-3.08c.84 1.25 1.41 2.55 1.69 3.83a8.21 8.21 0 0 1-3.9 1zm4.72-3.02c-.25-1.16-.76-2.33-1.52-3.46 1-.22 2.05-.34 3.12-.34.33 0 .66 0 .98.05a8.2 8.2 0 0 1-2.58 3.75z" />
            </svg>
          ),
        }
      : null,
    socialLinks.website && socialLinks.website.trim() && socialLinks.website !== '#'
      ? {
          label: 'Website',
          href: socialLinks.website,
          icon: <FaGlobe className="w-4 h-4" />,
        }
      : null,
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submitInquiry({
        name: formData.name,
        email: formData.email,
        subject: formData.subject || 'Direct Contact Form',
        message: formData.message,
        budget: 'Custom',
      });

      if (res?.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMsg(res?.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setErrorMsg('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        {/* LEFT COLUMN: Clean Direct Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <SectionHeading
              kicker="Contact"
              prefix="Get in"
              highlight="Touch"
              className="mb-4"
            />
            <p className="text-stone-500 text-sm leading-relaxed mb-8 max-w-sm">
              Have a project in mind, an opportunity to discuss, or just want to connect? Send a note below.
            </p>

            {/* Direct Coordinates */}
            <div className="space-y-4 mb-8">
              {/* Only show email if provided */}
              {socialLinks.email && socialLinks.email.trim() && (
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1E3A2B] text-[#FFB800] flex items-center justify-center shrink-0">
                    <FaEnvelope className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-stone-400">
                      Direct Email
                    </div>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-sm sm:text-base font-bold text-[#181818] hover:text-[#FFB800] transition-colors"
                    >
                      {socialLinks.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Only show phone if provided */}
              {data?.hero?.phone && data.hero.phone.trim() && (
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#1E3A2B] text-[#FFB800] flex items-center justify-center shrink-0">
                    <FaPhone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-stone-400">
                      Direct Phone / WhatsApp
                    </div>
                    <a
                      href={`tel:${data.hero.phone}`}
                      className="text-sm sm:text-base font-bold text-[#181818] hover:text-[#FFB800] transition-colors"
                    >
                      {data.hero.phone}
                    </a>
                  </div>
                </div>
              )}

              {/* Location Card */}
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#1E3A2B] text-[#FFB800] flex items-center justify-center shrink-0">
                  <FaLocationDot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase text-stone-400">
                    Location &amp; Availability
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#181818]">
                    {data?.hero?.title && data.hero.title.includes('Based in')
                      ? `Based in ${data.hero.title.split('Based in')[1].replace('.', '').trim()} (${data.hero.availabilityStatus || 'Available Globally'})`
                      : (data?.hero?.availabilityStatus || 'Available Globally')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links - ONLY show if there are actual links provided */}
          {activeSocials.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-stone-400 mb-3">
                Connect Online
              </div>
              <div className="flex items-center gap-2.5 flex-wrap">
                {activeSocials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-2xl bg-[#F6F5F0] hover:bg-[#1E3A2B] hover:text-white text-stone-700 border border-[#ECEAE2] flex items-center justify-center transition-all shadow-2xs hover:scale-105"
                    aria-label={s.label}
                    title={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Clean Simple Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-7 sm:p-9 border border-[#ECEAE2] shadow-sm">
          {isSuccess ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#1E3A2B] text-[#FFB800] flex items-center justify-center mb-4 text-xl shadow-md font-bold">
                ✓
              </div>
              <h3 className="text-2xl font-bold text-[#181818] mb-2">
                Message Sent!
              </h3>
              <p className="text-stone-500 text-sm max-w-sm mb-6 leading-relaxed">
                Thank you for reaching out. {data?.hero?.name ? data.hero.name.split(' ')[0] : 'We'} will get back to you shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-full text-xs font-semibold bg-[#1E3A2B] text-white hover:bg-[#162D21] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase font-mono">
                    Your Name <span className="text-[#FFB800]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#ECEAE2] text-[#181818] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1E3A2B] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase font-mono">
                    Email Address <span className="text-[#FFB800]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#ECEAE2] text-[#181818] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1E3A2B] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase font-mono">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. New Product Redesign Project"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#ECEAE2] text-[#181818] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1E3A2B] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5 uppercase font-mono">
                  Message <span className="text-[#FFB800]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[#FAF9F5] border border-[#ECEAE2] text-[#181818] placeholder-stone-400 text-sm focus:outline-none focus:border-[#1E3A2B] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-[#1E3A2B] hover:bg-[#162D21] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                <FaPaperPlane className="w-3.5 h-3.5 text-[#FFB800]" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
