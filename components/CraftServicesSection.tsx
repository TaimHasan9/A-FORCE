'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { CRAFT_SERVICES } from '@/lib/atelier-data';
import { formatCurrency } from '@/lib/commission';

interface CraftServicesSectionProps {
  onOpenCommission: (preselectedServiceId?: string) => void;
}

export default function CraftServicesSection({
  onOpenCommission,
}: CraftServicesSectionProps) {
  return (
    <section
      id="services"
      className="relative w-full bg-[#0A0A0B] atelier-grain border-t border-white/[0.06]"
    >
      {/* Intro Split Header matching Frame 00:07 */}
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-12 lg:px-14 lg:py-32 border-b border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6"
        >
          <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.9rem)] font-normal leading-[1.06] tracking-[-0.02em] text-white text-balance">
            Presence is felt before it moves. Every line, material, and finish
            is considered.
          </h2>
          <p className="max-w-xl text-sm font-light leading-relaxed text-[#9A9A96]">
            Our services are shaped with intent, from subtle styling
            enhancements to performance upgrades, designing each detail to
            sharpen the vehicle&apos;s character without overpowering it.
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenCommission()}
              className="atelier-outline-btn px-6 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-white whitespace-nowrap shrink-0"
            >
              Start Your Project
            </button>
          </div>
        </motion.div>

        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 bg-[#121214]">
            <Image
              src="/images/pillar-craft-atelier.jpg"
              alt="Atelier master fabricating brushed alloy and carbon trim"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              referrerPolicy="no-referrer"
              className="object-cover object-center opacity-90"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"
            />
          </div>
        </div>
      </div>

      {/* 5 Signature 50/50 Split Discipline Chapters (Frames 00:07 - 00:11) */}
      <div className="divide-y divide-white/[0.06]">
        {CRAFT_SERVICES.map((service) => (
          <article
            key={service.id}
            className="grid grid-cols-1 lg:grid-cols-2 items-stretch"
          >
            {/* Left Matte Obsidian Typography Panel */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-20 lg:py-24 bg-[#0B0B0C] atelier-grain"
            >
              <div className="max-w-md space-y-5">
                <p className="text-[10px] font-medium tracking-[0.28em] uppercase text-white/45">
                  {service.kicker}
                </p>

                <h3 className="font-serif text-[clamp(2.75rem,4.6vw,4.35rem)] font-normal leading-none tracking-[-0.02em] editorial-split-title">
                  {service.title}
                </h3>

                <p className="text-sm font-light leading-relaxed text-[#A3A39E]">
                  {service.description}
                </p>

                <p className="text-xs font-mono tabular-nums tracking-wide text-white/45 pt-1">
                  {service.leadTimeWeeks[0]}–{service.leadTimeWeeks[1]} Weeks
                  <span aria-hidden="true" className="mx-2 text-white/25">
                    ·
                  </span>
                  From {formatCurrency(service.startingPriceUsd)}
                </p>

                <p className="text-xs text-white/50">
                  {service.specificationSummary}
                </p>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => onOpenCommission(service.id)}
                    aria-label={`Start your ${service.title} project`}
                    className="atelier-outline-btn px-6 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-white whitespace-nowrap shrink-0"
                  >
                    Start Your Project
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Edge-to-Edge Studio Photography Panel */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[540px] w-full overflow-hidden bg-[#101012]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                referrerPolicy="no-referrer"
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15"
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
