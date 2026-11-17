'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Layers, Mail, Menu, X, ArrowUpRight } from 'lucide-react';

interface AtelierHeaderProps {
  onOpenCommission: (preselectedServiceId?: string) => void;
  onOpenBuilds: () => void;
  onOpenStock: () => void;
}

const NAV_CHAPTERS = [
  { index: '01', label: 'Philosophy', href: '#philosophy' },
  { index: '02', label: 'Our Approach', href: '#approach' },
  { index: '03', label: 'Craft Disciplines', href: '#services' },
  { index: '04', label: 'Previous Builds', href: '#previous-builds' },
  { index: '05', label: 'Available Stock', href: '#available-stock' },
];

export default function AtelierHeader({
  onOpenCommission,
  onOpenBuilds,
  onOpenStock,
}: AtelierHeaderProps) {
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHero(window.scrollY > window.innerHeight * 0.45);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolledPastHero
            ? 'bg-[#0A0A0B]/88 backdrop-blur-md border-b border-white/[0.08]'
            : 'bg-gradient-to-b from-black/75 via-black/30 to-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-10">
          {/* Left Quick Utility Icons matching reference video top-left */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenBuilds}
              aria-label="Explore Previous Builds"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenStock}
              aria-label="Explore Available Stock"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onOpenCommission()}
              aria-label="Start bespoke inquiry"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Center Brand Chevron Emblem */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="A-Force Automotive Atelier Home"
            className="group flex flex-col items-center justify-center whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <span
              aria-hidden="true"
              className="block h-4 w-5 bg-white transition-transform duration-200 group-hover:scale-105"
              style={{
                clipPath:
                  'polygon(50% 0%, 100% 100%, 72% 100%, 50% 48%, 33% 84%, 44% 84%, 36% 100%, 0% 100%)',
              }}
            />
            <span className="mt-1 text-[8px] font-medium tracking-[0.34em] text-white/80">
              A-FORCE
            </span>
          </a>

          {/* Right Navigation & Primary Commission Trigger */}
          <div className="flex items-center gap-6 shrink-0">
            <button
              type="button"
              onClick={() => onOpenCommission()}
              className={`hidden md:inline-flex items-center text-[11px] font-medium tracking-[0.2em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
                scrolledPastHero
                  ? 'text-white/85 hover:text-white opacity-100'
                  : 'text-white/60 hover:text-white opacity-85'
              }`}
            >
              Start Your Project
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-label="Open atelier navigation menu"
              className="inline-flex items-center gap-2.5 py-2 text-[11px] font-medium tracking-[0.22em] uppercase text-white/90 transition-colors hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              <span>Navigate</span>
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Atelier Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0A0B]/97 backdrop-blur-xl atelier-grain px-6 py-8 lg:px-14 lg:py-10"
          >
            <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between">
              <span className="text-[11px] font-medium tracking-[0.25em] uppercase text-white/55">
                A-Force Automotive Atelier
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex items-center gap-2 py-2 px-3 text-[11px] font-medium tracking-[0.2em] uppercase text-white/80 hover:text-white border border-white/15 hover:border-white/50 transition-colors"
              >
                <span>Close</span>
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Primary Atelier Sections"
              className="mx-auto my-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-end"
            >
              <ul className="lg:col-span-7 space-y-3 sm:space-y-4">
                {NAV_CHAPTERS.map((item) => (
                  <li key={item.href}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(item.href)}
                      className="group flex items-baseline gap-5 text-left w-full py-1.5 border-b border-white/[0.06] hover:border-white/25 transition-colors"
                    >
                      <span className="text-xs font-mono tabular-nums text-white/40 group-hover:text-[#C81E1E] transition-colors">
                        {item.index}
                      </span>
                      <span className="font-serif text-3xl sm:text-5xl text-white/85 group-hover:text-white transition-colors">
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="lg:col-span-5 lg:pl-10 space-y-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0">
                <p className="text-sm leading-relaxed text-[#9A9A96] max-w-md">
                  Private coachbuilding, carbon aerodynamics, bespoke interiors,
                  and curated collector inventory tailored to your exact
                  specification.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenCommission();
                    }}
                    className="atelier-outline-btn px-6 py-3 text-[11px] font-medium tracking-[0.22em] uppercase text-white whitespace-nowrap shrink-0"
                  >
                    Start Your Project
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenBuilds();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-white/75 hover:text-white whitespace-nowrap shrink-0"
                  >
                    <span>Previous Builds</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenStock();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-white/75 hover:text-white whitespace-nowrap shrink-0"
                  >
                    <span>Available Stock</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </nav>

            <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 border-t border-white/[0.08] pt-5 text-xs text-white/45">
              <span>London Atelier · Munich Engineering Bay</span>
              <span>Private Appointments Only</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
