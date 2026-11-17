'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
}

export default function HeroSection({ onExploreClick }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#060607] pt-24 pb-10 px-6"
    >
      {/* Full-Bleed Studio Vehicle Trio */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-trio-front.jpg"
          alt="Matte black Mercedes-AMG G63, crimson Porsche 911 GT3 RS, and satin Land Rover Defender inside dark atelier studio"
          fill
          priority
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center opacity-95"
        />
        {/* Measured top & bottom obsidian scrims for crisp contrast and seamless top ceiling fade */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[28%] bg-gradient-to-b from-[#060607] via-[#060607]/85 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/15 to-black/88"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,transparent_28%,rgba(6,6,7,0.72)_85%)]"
        />
      </div>

      {/* Upper Headline positioned cleanly in the obsidian studio negative space */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-10 sm:mt-14 text-center max-w-3xl mx-auto"
      >
        <h1 className="font-serif text-[clamp(2.85rem,6vw,5.15rem)] font-normal leading-[0.98] tracking-[-0.025em] text-white text-balance">
          For Those Who
          <br />
          Refuse Ordinary
        </h1>
      </motion.div>

      {/* Bottom Atelier Statement & Subtle Scroll Cue */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-auto flex flex-col items-center gap-4 text-center max-w-md mx-auto pt-44 sm:pt-56"
      >
        <p className="text-xs sm:text-[13px] font-light leading-relaxed tracking-wide text-white/70">
          A luxury automotive atelier built for those who
          <br className="hidden sm:inline" /> value performance and
          craftsmanship.
        </p>

        <button
          type="button"
          onClick={onExploreClick}
          aria-label="Scroll to Atelier Philosophy"
          className="group inline-flex items-center gap-2 py-2 px-4 text-[10px] font-medium tracking-[0.26em] uppercase text-white/55 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <span>Scroll</span>
          <ArrowDown
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-y-0.5"
            aria-hidden="true"
          />
        </button>
      </motion.div>
    </section>
  );
}
