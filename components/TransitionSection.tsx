'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function TransitionSection() {
  return (
    <section className="relative w-full bg-[#070708] border-t border-white/[0.06] overflow-hidden">
      {/* Upper Statement: "Ordinary" (Frame 00:11) */}
      <div className="flex min-h-[38vh] items-center justify-center px-6 py-20 bg-[#0A0A0B] atelier-grain">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3.25rem,8vw,6.75rem)] font-normal leading-none tracking-[-0.025em] text-white text-center"
        >
          Ordinary
        </motion.h2>
      </div>

      {/* Center Bird's-Eye Top-Down Supercar & SUV Runway (Frame 00:12) */}
      <div className="relative h-[70vh] min-h-[480px] w-full overflow-hidden bg-[#050506]">
        <Image
          src="/images/transition-top-down.jpg"
          alt="Top-down studio view of a crimson mid-engine supercar flanked symmetrically by two matte black SUVs"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B]"
        />
      </div>

      {/* Lower Statement: "Ends Here" (Frame 00:13) */}
      <div className="flex min-h-[42vh] flex-col items-center justify-center gap-5 px-6 py-20 text-center bg-[#0A0A0B] atelier-grain">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[clamp(3.25rem,8vw,6.75rem)] font-normal leading-none tracking-[-0.025em] text-white"
        >
          Ends Here
        </motion.h2>
        <p className="max-w-md text-xs sm:text-[13px] font-light leading-relaxed text-white/65">
          Complete expressions of taste, intent and individuality shaped
          through detail, restraint and presence.
        </p>
      </div>
    </section>
  );
}
