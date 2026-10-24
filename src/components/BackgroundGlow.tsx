'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Soft Warm Linen Ambient Blob 1 */}
      <motion.div
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -25, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-gradient-to-br from-amber-100/40 via-orange-50/30 to-transparent blur-[140px] rounded-full"
      />

      {/* Soft Warm Terracotta Ambient Blob 2 */}
      <motion.div
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 30, -25, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-rose-100/30 via-orange-100/20 to-transparent blur-[150px] rounded-full"
      />

      {/* Subtle Archival Paper Texture Grid */}
      <div className="absolute inset-0 bg-paper-grain opacity-80" />
    </div>
  );
}
