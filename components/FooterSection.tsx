'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface FooterSectionProps {
  onOpenCommission: (preselectedServiceId?: string) => void;
  onOpenBuilds: () => void;
  onOpenStock: () => void;
}

export default function FooterSection({
  onOpenCommission,
  onOpenBuilds,
  onOpenStock,
}: FooterSectionProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#060607] border-t border-white/[0.06] px-6 pt-28 pb-10">
      {/* Rear Studio Silhouette Trio matching Frames 00:16 - 00:18 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/footer-trio-rear.jpg"
          alt="Rear silhouette of matte black Mercedes G63, crimson Porsche 911 GT3 RS, and satin Land Rover Defender"
          fill
          sizes="100vw"
          referrerPolicy="no-referrer"
          className="object-cover object-center opacity-85"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-[#060607]/95 via-black/45 to-[#060607]/95"
        />
      </div>

      {/* Upper Centered CTA Block */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-6 flex flex-col items-center text-center max-w-2xl mx-auto space-y-6"
      >
        <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-white/55">
          Are You Ready To
        </p>

        <h2 className="font-serif text-[clamp(3rem,6.5vw,5.4rem)] font-normal leading-[0.98] tracking-[-0.025em] text-white text-balance">
          Refuse
          <br />
          Ordinary
        </h2>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => onOpenCommission()}
            className="atelier-outline-btn bg-black/50 backdrop-blur-sm px-8 py-3.5 text-[10px] font-medium tracking-[0.25em] uppercase text-white whitespace-nowrap shrink-0"
          >
            Start Your Project
          </button>
        </div>
      </motion.div>

      {/* Bottom Quiet Navigation & Back to Top */}
      <div className="relative z-10 mt-auto flex w-full max-w-[1440px] flex-col items-center gap-6 pt-44 sm:pt-52">
        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 py-2 px-4 text-[10px] font-medium tracking-[0.26em] uppercase text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <span>Back To Top</span>
          <ArrowUp
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </button>

        <div className="flex w-full flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-5 text-[11px] text-white/45">
          <span>
            A-Force Automotive Atelier
            <span aria-hidden="true" className="mx-2 text-white/25">
              ·
            </span>
            London &amp; Munich
          </span>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenBuilds}
              className="hover:text-white transition-colors"
            >
              Previous Builds
            </button>
            <button
              type="button"
              onClick={onOpenStock}
              className="hover:text-white transition-colors"
            >
              Available Stock
            </button>
            <button
              type="button"
              onClick={() => onOpenCommission()}
              className="hover:text-white transition-colors"
            >
              Private Consultation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
