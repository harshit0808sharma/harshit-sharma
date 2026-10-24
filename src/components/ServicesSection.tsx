'use client';

import React from 'react';
import { FaArrowRight, FaCode, FaServer, FaCloud } from 'react-icons/fa6';
import { TbDeviceMobile, TbBrowser } from 'react-icons/tb';
import { usePortfolio } from '@/context/PortfolioContext';
import { SectionHeading } from '@/components/SectionHeading';

export function ServicesSection() {
  const { data } = usePortfolio();

  // If no services data from DB, show nothing
  if (!data?.services || data.services.length === 0) {
    return null;
  }

  const renderIcon = (serviceId: string) => {
    const id = serviceId.toLowerCase();
    if (id.includes('fullstack') || id.includes('web') || id.includes('dev')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center text-[#1E3A2B] text-xl">
          <FaCode className="w-5 h-5 text-[#1E3A2B]" />
        </div>
      );
    }
    if (id.includes('backend') || id.includes('api') || id.includes('system')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center text-[#1E3A2B] text-xl">
          <FaServer className="w-5 h-5 text-[#1E3A2B]" />
        </div>
      );
    }
    if (id.includes('cloud') || id.includes('devops')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center text-[#1E3A2B] text-xl">
          <FaCloud className="w-5 h-5 text-[#1E3A2B]" />
        </div>
      );
    }
    if (id.includes('app') || id.includes('mobile')) {
      return (
        <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center text-[#1E3A2B] text-xl">
          <TbDeviceMobile className="w-6 h-6 text-[#1E3A2B]" />
        </div>
      );
    }
    return (
      <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-stone-200/60 flex items-center justify-center text-[#1E3A2B]">
        <TbBrowser className="w-6 h-6 text-[#1E3A2B]" />
      </div>
    );
  };

  return (
    <section id="services" className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <SectionHeading
          kicker="Services"
          prefix="Services"
          highlight="I Provide"
        />

        {/* View All Services Pill Button */}
        <a
          href="#projects"
          className="inline-flex items-center gap-2 border border-stone-300 hover:border-[#181818] text-[#181818] rounded-full px-5 py-2 text-xs sm:text-sm font-semibold transition-all group self-start sm:self-auto"
        >
          <span>View All Services</span>
          <span className="w-5 h-5 rounded-full bg-[#181818] text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition-transform">
            &rarr;
          </span>
        </a>
      </div>

      {/* 3 Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.services.map((srv, idx) => (
          <div
            key={srv.id || idx}
            className="group rounded-3xl bg-[#F6F5F0] border border-[#ECEAE2] p-8 flex flex-col justify-between hover:bg-[#1E3A2B] hover:text-white transition-all duration-300 shadow-2xs hover:shadow-xl cursor-default"
          >
            <div>
              {/* Card Top: Custom Icon */}
              <div className="mb-6">{renderIcon(srv.id)}</div>

              {/* Service Title */}
              <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-white transition-colors">
                {srv.title}
              </h3>

              {/* Service Description */}
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed group-hover:text-stone-300 transition-colors">
                {srv.description}
              </p>
            </div>

            {/* Bottom Row: Number + Circular Arrow Button */}
            <div className="pt-8 mt-6 border-t border-[#ECEAE2] group-hover:border-white/15 flex items-center justify-between">
              <span className="text-sm font-bold font-mono text-stone-400 group-hover:text-stone-300 transition-colors">
                {srv.number || `0${idx + 1}`}
              </span>

              {/* Arrow Circle */}
              <a
                href="#contact"
                className="w-10 h-10 rounded-full bg-[#FFB800] text-[#1E3A2B] flex items-center justify-center font-bold text-xs shadow-xs group-hover:bg-white group-hover:text-[#1E3A2B] group-hover:scale-105 transition-all"
              >
                <FaArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
