'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

interface ShowcasesSectionProps {
  onOpenBuilds: () => void;
  onOpenStock: () => void;
}

export default function ShowcasesSection({
  onOpenBuilds,
  onOpenStock,
}: ShowcasesSectionProps) {
  return (
    <div className="w-full bg-[#070708]">
      {/* Section: Previous Builds (Frame 00:14) */}
      <section
        id="previous-builds"
        className="relative flex min-h-[82vh] w-full flex-col items-center justify-center overflow-hidden border-t border-white/[0.06] px-6 py-28"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/previous-builds-headlight.jpg"
            alt="Metallic crimson supercar sculpted front fender and LED blade headlight in dark studio"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(10,10,11,0.55)_0%,rgba(6,6,7,0.8)_100%)]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center space-y-5"
        >
          <h2 className="font-serif text-[clamp(2.75rem,5.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white">
            Previous Builds
          </h2>
          <p className="max-w-md text-xs sm:text-[13px] font-light leading-relaxed text-white/75">
            A collection of previous commissions, sharing craft, character and
            the people behind the wheel.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenBuilds}
              className="group inline-flex items-center gap-2 py-2.5 px-5 border-b border-white/40 hover:border-white text-[10px] font-medium tracking-[0.26em] uppercase text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Explore Builds</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Section: Available Stock (Frame 00:15) */}
      <section
        id="available-stock"
        className="relative flex min-h-[88vh] w-full flex-col items-center justify-end overflow-hidden border-t border-white/[0.06] px-6 pb-20 pt-36"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/available-stock-lineup.jpg"
            alt="Four bespoke luxury vehicles in arrowhead formation on wet obsidian asphalt"
            fill
            sizes="100vw"
            referrerPolicy="no-referrer"
            className="object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-[#060607]/95"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center space-y-5"
        >
          <h2 className="font-serif text-[clamp(2.75rem,5.5vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white">
            Available Stock
          </h2>
          <p className="max-w-md text-xs sm:text-[13px] font-light leading-relaxed text-white/75">
            Builds available for purchase, refined with intent, engineered with
            purpose, and ready to make a statement.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenStock}
              className="group inline-flex items-center gap-2 py-2.5 px-5 border-b border-white/40 hover:border-white text-[10px] font-medium tracking-[0.26em] uppercase text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Explore Stock</span>
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
