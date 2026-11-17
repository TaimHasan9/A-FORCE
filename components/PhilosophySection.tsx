'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { MASONRY_TILES } from '@/lib/atelier-data';

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Tiles smoothly rise and illuminate as the user enters the middle of the section
  const collageOpacity = useTransform(scrollYProgress, [0.18, 0.42, 0.85], [0.22, 1, 0.65]);
  const collageScale = useTransform(scrollYProgress, [0.15, 0.5], [0.94, 1.02]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative flex min-h-[92vh] w-full flex-col items-center justify-center overflow-hidden bg-[#0C0C0D] atelier-grain py-28 px-6 border-t border-white/[0.06]"
    >
      {/* Staircase Arc Collage matching frame 00:02 */}
      <motion.div
        style={{ opacity: collageOpacity, scale: collageScale }}
        aria-hidden="true"
        className="pointer-events-none relative z-0 mx-auto mb-[-2.25rem] sm:mb-[-2.75rem] flex w-full max-w-[1160px] items-end justify-center gap-2 sm:gap-3.5 px-2"
      >
        {MASONRY_TILES.map((tile, idx) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, y: tile.offsetY + 24 }}
            whileInView={{ opacity: 1, y: tile.offsetY }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.7,
              delay: idx * 0.055,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative ${tile.colClass} ${tile.aspectClass} shrink-0 overflow-hidden bg-[#151517] border border-white/[0.08] shadow-2xl ${
              idx === 0 || idx === 6 ? 'hidden sm:block' : ''
            }`}
          >
            <Image
              src={tile.src}
              alt={tile.alt}
              fill
              sizes="(max-width: 768px) 22vw, 18vw"
              referrerPolicy="no-referrer"
              className="object-cover object-center opacity-78"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0D] via-[#0C0C0D]/35 to-black/20" />
          </motion.div>
        ))}
      </motion.div>

      {/* Center Editorial Statement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mx-auto max-w-3xl text-center pt-6"
      >
        <h2 className="font-serif text-[clamp(2.35rem,5vw,4.35rem)] font-normal leading-[1.04] tracking-[-0.02em] text-white text-balance">
          We Don&apos;t Modify Vehicles
          <br />
          We Build Them For You
        </h2>
      </motion.div>
    </section>
  );
}
