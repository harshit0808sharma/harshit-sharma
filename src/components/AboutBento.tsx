'use client';

import React from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { SiFramer } from 'react-icons/si';

export function AboutBento() {
  const { data } = usePortfolio();
  const firstLetter = data?.hero?.name ? data?.hero?.name.slice(0, 1).toUpperCase() : 'P';

  // Sticker pills matching exact reference screenshot Panel 2
  const learningPills = [
    { label: 'Midjourney', rotate: '-5deg', top: '0px', left: '0px' },
    { label: 'Visual Design', rotate: '4deg', top: '0px', left: '100px' },
    { label: 'Problem Solving', rotate: '-2deg', top: '40px', left: '20px' },
    { label: 'Usability Testing', rotate: '5deg', top: '45px', left: '140px' },
    { label: 'User Research', rotate: '-4deg', top: '85px', left: '10px' },
    { label: 'User Experience', rotate: '2deg', top: '90px', left: '120px' },
    { label: 'Product Thinking', rotate: '-1deg', top: '130px', left: '40px' },
  ];

  // 8 Minimalist graphic symbols matching the Bruno Munari glyphs grid
  const glyphs = ['✦', '▲', '●', '■', '◆', '✿', '★', '❖'];

  return (
    <section id="about" className="relative py-12 sm:py-20 px-3 sm:px-6 max-w-6xl mx-auto">
      {/* Outer Framed Card matching Screenshot Panel 2 */}
      <div className="relative rounded-3xl sm:rounded-[36px] bg-[#FAF6F0] border border-[#EBE3D7] shadow-[0_12px_45px_-10px_rgba(42,40,37,0.06)] p-6 sm:p-12 overflow-hidden">
        
        {/* Header Title: "to scenic escape" with sticker pill */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <h2 className="font-display-serif italic text-3xl sm:text-5xl text-[#2A2825] font-bold tracking-tight">
            to scenic escape
          </h2>

          {/* Floating Sticker Pill Navbar representation with colorful edge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#E8DFD3] shadow-xs text-xs font-medium relative">
            <span className="w-5 h-5 rounded-md bg-[#D95338] text-white font-serif font-bold text-[10px] flex items-center justify-center">
              {firstLetter}.
            </span>
            <span className="text-[#66625B]">Home</span>
            <span className="text-[#D95338] font-semibold">About me</span>
            <span className="text-[#66625B]">Work</span>
          </div>
        </div>

        {/* ----------------- BENTO GRID ----------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* COLUMN 1: Tall Olive Card ("For Sanity" + Overlapping Polaroids) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#485235] text-[#FAF6F0] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm min-h-[480px]">
            {/* Top Area: Overlapping Polaroids */}
            <div className="relative h-64 sm:h-72 w-full flex items-center justify-center">
              
              {/* Polaroid 1: Travel (Tilted Left) */}
              <div className="absolute left-2 sm:left-6 top-4 w-36 sm:w-44 bg-white p-2.5 pb-4 rounded-xl polaroid-shadow border border-[#E8DFD3] text-[#2A2825] transition-transform hover:-translate-y-1 hover:rotate-[-6deg] rotate-[-5deg] cursor-pointer">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#EFE9DF]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
                    alt="Travel"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-center font-sans font-bold text-xs text-[#2A2825]">
                  Travel
                </div>
              </div>

              {/* Polaroid 2: Food (Tilted Right, Overlapping) */}
              <div className="absolute right-2 sm:right-6 top-8 w-36 sm:w-44 bg-white p-2.5 pb-4 rounded-xl polaroid-shadow border border-[#E8DFD3] text-[#2A2825] z-10 transition-transform hover:-translate-y-1 hover:rotate-[7deg] rotate-[6deg] cursor-pointer">
                <div className="aspect-[4/5] rounded-lg overflow-hidden bg-[#EFE9DF]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
                    alt="Food cuisine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2 text-center font-sans font-bold text-xs text-[#2A2825]">
                  Food
                </div>
              </div>

            </div>

            {/* Bottom Text: For Sanity */}
            <div className="mt-4 pt-6 border-t border-[#5E6848]/60">
              <h3 className="text-xl sm:text-2xl font-bold font-sans tracking-tight mb-2 text-white">
                For Sanity
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF6F0]/85 leading-relaxed font-sans">
                I love to travel to places that are filled with the greenest trees and bluest seas as far as the eye can see. And of course, yoga.
              </p>
            </div>
          </div>

          {/* COLUMN 2 & 3: Right Stacked Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* TOP CARD: "Learning" Warm Peach Card with Sticker Pills */}
            <div className="rounded-3xl bg-[#F5A666] p-6 sm:p-8 text-[#2A2825] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Text */}
              <div className="max-w-xs">
                <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight mb-2 text-[#2A2825]">
                  Learning
                </h3>
                <p className="text-xs sm:text-sm text-[#2A2825]/85 leading-relaxed font-sans">
                  Have a great B2C experience for solving user and business problems
                </p>
              </div>

              {/* Right: Floating Sticker Pills Cluster */}
              <div className="flex-1 flex flex-wrap gap-2 justify-center md:justify-end max-w-sm">
                {learningPills.map((pill, idx) => (
                  <div
                    key={idx}
                    style={{ transform: `rotate(${pill.rotate})` }}
                    className="px-3.5 py-1.5 rounded-full bg-white text-[#2A2825] font-sans font-semibold text-xs shadow-xs border border-white/60 cursor-default hover:scale-105 transition-transform"
                  >
                    {pill.label}
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM ROW: Split into "Reading" and "Writings" */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
              
              {/* White Card: "Reading" */}
              <div className="rounded-3xl bg-white p-6 border border-[#EBE3D7] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold font-sans text-[#2A2825]">
                      Reading
                    </h3>
                    <span className="w-6 h-6 rounded-full bg-[#FAF6F0] border border-[#E8DFD3] text-[#D95338] font-mono font-bold text-xs flex items-center justify-center">
                      6
                    </span>
                  </div>

                  <div className="text-sm sm:text-base font-bold text-[#2A2825] leading-snug">
                    Design as Art
                  </div>
                  <div className="text-xs text-[#7D786F] font-mono mt-0.5">
                    Bruno Munari
                  </div>
                </div>

                {/* Minimalist Graphic Icon Grid */}
                <div className="grid grid-cols-4 gap-2 pt-6 mt-4 border-t border-[#F0EAE1]">
                  {glyphs.map((symbol, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-lg bg-[#FAF6F0] border border-[#EBE3D7] flex items-center justify-center text-[#2A2825] text-xs font-mono font-bold hover:bg-[#F5EFE6] transition-colors"
                    >
                      {symbol}
                    </div>
                  ))}
                </div>
              </div>

              {/* Olive Green Card: "Writings" */}
              <div className="rounded-3xl bg-[#485235] text-[#FAF6F0] p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-sans text-white mb-4">
                    Writings
                  </h3>

                  {/* Article Snippet 1 */}
                  <div className="p-3 rounded-2xl bg-white text-[#2A2825] border border-white/40 mb-3 flex items-center gap-3 shadow-xs hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs shrink-0 font-bold">
                      🌱
                    </div>
                    <div className="text-xs font-bold text-[#2A2825] line-clamp-2 leading-snug">
                      Bridging the gap between Donor and Charities
                    </div>
                  </div>

                  {/* Article Snippet 2 */}
                  <div className="p-3 rounded-2xl bg-white text-[#2A2825] border border-white/40 flex items-center gap-3 shadow-xs hover:translate-x-1 transition-transform cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-800 text-xs shrink-0 font-bold">
                      🚀
                    </div>
                    <div className="text-xs font-bold text-[#2A2825] line-clamp-2 leading-snug">
                      Getting converted to a full-time product designer at Growthschool
                    </div>
                  </div>
                </div>

                <div className="pt-4 text-right">
                  <span className="text-[11px] font-mono text-[#FAF6F0]/80 underline decoration-[#FAF6F0]/40 cursor-pointer hover:text-white">
                    View all writings &rarr;
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ----------------- MADE IN FRAMER BADGE (BOTTOM RIGHT) ----------------- */}
        <div className="flex justify-end mt-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#E8DFD3] text-[#7D786F] text-[10px] font-mono shadow-xs select-none">
            <SiFramer className="w-2.5 h-2.5 text-[#2A2825]" />
            <span>Made in Framer</span>
          </div>
        </div>

      </div>
    </section>
  );
}
