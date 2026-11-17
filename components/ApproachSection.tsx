'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { APPROACH_PILLARS, PARTNER_MARQUES } from '@/lib/atelier-data';

interface ApproachSectionProps {
  onOpenCommission: (preselectedServiceId?: string) => void;
}

export default function ApproachSection({
  onOpenCommission,
}: ApproachSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgressPct, setScrollProgressPct] = useState(33);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stickyContainerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    setScrollProgressPct(Math.round(clamped * 100));
    if (clamped < 0.34) {
      setActiveIndex(0);
    } else if (clamped < 0.68) {
      setActiveIndex(1);
    } else {
      setActiveIndex(2);
    }
  });

  const activePillar = APPROACH_PILLARS[activeIndex];

  const handleSelectPillar = (index: number) => {
    setActiveIndex(index);
    setScrollProgressPct(Math.round(((index + 1) / APPROACH_PILLARS.length) * 100));
  };

  return (
    <section id="approach" className="relative w-full bg-[#0A0A0B]">
      {/* Part A: Full-bleed Crimson Thread Quilted Leather Intro (Frame 00:03) */}
      <div className="relative flex min-h-[82vh] w-full flex-col justify-between overflow-hidden px-6 py-16 lg:px-14 lg:py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/approach-red-stitching.jpg"
            alt="Artisan pulling crimson red thread through black perforated quilted Nappa leather"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/65"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/55"
          />
        </div>

        {/* Top-Left Display Headline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto w-full max-w-[1440px]"
        >
          <h2 className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white max-w-xl text-balance">
            Our Approach
            <br />
            To Every Build
          </h2>
        </motion.div>

        {/* Bottom Marque Strip + Editorial Statement & CTA */}
        <div className="relative z-10 mx-auto mt-28 flex w-full max-w-[1440px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          {/* Curated Marque Wordmarks */}
          <div
            aria-label="Supported Luxury Marques"
            className="flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-white/15 pt-5 lg:border-t-0 lg:pt-0"
          >
            {PARTNER_MARQUES.map((marque) => (
              <span
                key={marque}
                className="text-[11px] font-medium tracking-[0.26em] uppercase text-white/75"
              >
                {marque}
              </span>
            ))}
          </div>

          {/* Right Description & Outlined Action */}
          <div className="max-w-sm space-y-5">
            <p className="text-xs sm:text-[13px] font-light leading-relaxed text-white/78">
              Every decision is intentional, every detail has a purpose based on
              your taste, your lifestyle, and your standards.
            </p>
            <button
              type="button"
              onClick={() => onOpenCommission()}
              className="atelier-outline-btn px-6 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-white whitespace-nowrap shrink-0"
            >
              Start Your Project
            </button>
          </div>
        </div>
      </div>

      {/* Part B: 3-Pillar Sticky Progression (01/03 Identity, 02/03 Insight, 03/03 Cohesion) */}
      <div
        ref={stickyContainerRef}
        className="relative w-full lg:min-h-[210vh] bg-[#0B0B0C] border-t border-white/[0.06]"
      >
        <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen w-full items-center overflow-hidden px-6 py-20 lg:px-14">
          {/* Atmospheric Blurred Atelier Backdrop */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src={activePillar.image}
              alt=""
              fill
              sizes="100vw"
              referrerPolicy="no-referrer"
              className="object-cover object-center scale-110 blur-3xl opacity-25 transition-opacity duration-500"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/90 via-[#0B0B0C]/70 to-[#0B0B0C]/95"
            />
          </div>

          <div className="relative z-10 mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Framed Studio Square Card */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[440px] overflow-hidden border border-white/15 bg-[#121214] shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePillar.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative h-full w-full"
                  >
                    <Image
                      src={activePillar.image}
                      alt={activePillar.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 440px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Editorial Pillar Detail + Interactive Step Controls */}
            <div className="lg:col-span-6 max-w-lg space-y-6">
              {/* Interactive Pillar Tabs (01 · 02 · 03) */}
              <div
                role="tablist"
                aria-label="Our Approach Pillars"
                className="flex items-center gap-5 border-b border-white/10 pb-4"
              >
                {APPROACH_PILLARS.map((pillar, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <button
                      key={pillar.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleSelectPillar(idx)}
                      className={`text-xs font-mono tabular-nums tracking-[0.18em] uppercase transition-colors pb-1 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                        isActive
                          ? 'text-white border-b border-white'
                          : 'text-white/40 hover:text-white/75'
                      }`}
                    >
                      {pillar.index} / {pillar.total} {pillar.title}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <p className="text-xs font-mono tabular-nums tracking-[0.2em] text-white/55">
                    {activePillar.index}{' '}
                    <span className="text-white/30">/ {activePillar.total}</span>
                  </p>

                  <h3 className="font-serif text-[clamp(2.75rem,5vw,4.5rem)] font-normal leading-none tracking-[-0.02em] editorial-split-title">
                    {activePillar.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] font-light leading-relaxed text-white/75">
                    {activePillar.description}
                  </p>

                  <p className="text-xs tracking-wide text-white/45">
                    {activePillar.detailNote}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onOpenCommission()}
                  className="atelier-outline-btn px-6 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-white whitespace-nowrap shrink-0"
                >
                  Start Your Project
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Hairline Progress Rail matching frames 00:04-00:06 */}
          <div className="absolute bottom-5 left-6 right-6 z-10 mx-auto max-w-[1440px]">
            <div className="h-[1px] w-full bg-white/15">
              <div
                className="h-[2px] -mt-[0.5px] bg-white transition-all duration-200"
                style={{
                  width: `${Math.max(18, scrollProgressPct)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
