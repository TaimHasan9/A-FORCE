'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Gauge,
  X,
} from 'lucide-react';
import {
  AVAILABLE_STOCK,
  CRAFT_SERVICES,
  PREVIOUS_BUILDS,
} from '@/lib/atelier-data';
import {
  estimateCommissionPlan,
  filterVehiclesByMarque,
  formatCurrency,
  generateCommissionReference,
  validateCommissionForm,
  type CommissionFormInput,
  type VehicleClass,
} from '@/lib/commission';

interface CommissionModalProps {
  open: boolean;
  initialServiceId?: string;
  initialVehicleModel?: string;
  onClose: () => void;
}

export function CommissionModal({
  open,
  initialServiceId,
  initialVehicleModel,
  onClose,
}: CommissionModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <CommissionModalContent
          key={`${initialServiceId ?? 'none'}-${initialVehicleModel ?? 'none'}`}
          initialServiceId={initialServiceId}
          initialVehicleModel={initialVehicleModel}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  );
}

function CommissionModalContent({
  initialServiceId,
  initialVehicleModel,
  onClose,
}: Omit<CommissionModalProps, 'open'>) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [vehicleModel, setVehicleModel] = useState(initialVehicleModel ?? '');
  const [vehicleClass, setVehicleClass] = useState<VehicleClass>('supercar');
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(() =>
    initialServiceId ? [initialServiceId] : ['bodystyling']
  );
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof CommissionFormInput, string>>
  >({});
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const estimate = useMemo(
    () => estimateCommissionPlan(selectedServiceIds, vehicleClass),
    [selectedServiceIds, vehicleClass]
  );

  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    if (errors.selectedServiceIds) {
      setErrors((prev) => ({ ...prev, selectedServiceIds: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateCommissionForm({
      fullName,
      email,
      vehicleModel,
      vehicleClass,
      selectedServiceIds,
      notes,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setSubmittedRef(generateCommissionReference(vehicleModel));
  };

  const handleResetAndClose = () => {
    setFullName('');
    setEmail('');
    setVehicleModel('');
    setNotes('');
    setSubmittedRef(null);
    setErrors({});
    onClose();
  };

  return (
    <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Start Your Project — Bespoke Commission Brief"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-3xl border border-white/15 bg-[#0D0D0F] atelier-grain p-6 sm:p-10 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-white/50">
                  Private Commission Brief
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-white">
                  Start Your Project
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close commission form"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 hover:border-white/50 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {submittedRef ? (
              <div className="py-10 space-y-6">
                <div className="flex items-center gap-3 text-white">
                  <CheckCircle2
                    className="h-6 w-6 text-[#C81E1E] shrink-0"
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-2xl">
                    Commission Dossier Registered
                  </h3>
                </div>

                <p className="text-sm leading-relaxed text-white/75 max-w-xl">
                  Thank you, <span className="text-white">{fullName}</span>. Our
                  lead commissioning director will contact{' '}
                  <span className="text-white">{email}</span> within 24 hours to
                  arrange your private specification review for the{' '}
                  <span className="text-white">{vehicleModel}</span>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-white/10 bg-black/40 p-5">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/45">
                      Reference
                    </p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-white">
                      {submittedRef}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/45">
                      Estimated Scope
                    </p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-white">
                      From {formatCurrency(estimate.totalEstimateUsd)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/45">
                      Bay Window
                    </p>
                    <p className="mt-1 font-mono text-sm tabular-nums text-white">
                      {estimate.minWeeks}–{estimate.maxWeeks} Weeks
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="atelier-outline-btn px-7 py-3 text-[10px] font-medium tracking-[0.24em] uppercase text-white"
                  >
                    Return To Atelier
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-6">
                {/* Vehicle Class Selector */}
                <div className="space-y-2.5">
                  <span className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/55">
                    Vehicle Architecture
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {(
                      [
                        { id: 'supercar', label: 'Supercar / Track' },
                        { id: 'suv', label: 'Luxury SUV' },
                        { id: 'gt', label: 'Grand Tourer' },
                      ] as const
                    ).map((opt) => {
                      const active = vehicleClass === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setVehicleClass(opt.id)}
                          className={`py-2.5 px-3 text-xs tracking-wide border transition-colors ${
                            active
                              ? 'border-white bg-white text-[#0A0A0B] font-medium'
                              : 'border-white/15 bg-black/30 text-white/70 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Craft Disciplines Multi-Select */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/55">
                      Craft Disciplines
                    </span>
                    <span className="text-xs font-mono tabular-nums text-white/50">
                      {estimate.selectedServices.length} Selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {CRAFT_SERVICES.map((service) => {
                      const selected = selectedServiceIds.includes(service.id);
                      return (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => toggleService(service.id)}
                          aria-pressed={selected}
                          className={`flex items-center justify-between gap-2 px-3 py-2.5 text-xs border transition-colors ${
                            selected
                              ? 'border-[#C81E1E] bg-[#C81E1E]/15 text-white'
                              : 'border-white/15 bg-black/30 text-white/65 hover:border-white/40 hover:text-white'
                          }`}
                        >
                          <span>{service.title}</span>
                          {selected && (
                            <Check
                              className="h-3.5 w-3.5 text-[#C81E1E] shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedServiceIds && (
                    <p
                      role="alert"
                      className="flex items-center gap-1.5 text-xs text-red-400"
                    >
                      <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.selectedServiceIds}</span>
                    </p>
                  )}
                </div>

                {/* Live Estimation Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-black/45 px-5 py-3.5">
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Clock className="h-3.5 w-3.5 text-white/45" aria-hidden="true" />
                    <span>
                      Indicative Build Window:{' '}
                      <strong className="font-mono tabular-nums text-white font-medium">
                        {estimate.minWeeks > 0
                          ? `${estimate.minWeeks}–${estimate.maxWeeks} Weeks`
                          : 'Select discipline'}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/70">
                    <Gauge className="h-3.5 w-3.5 text-white/45" aria-hidden="true" />
                    <span>
                      Commission Guide:{' '}
                      <strong className="font-mono tabular-nums text-white font-medium">
                        {estimate.totalEstimateUsd > 0
                          ? `From ${formatCurrency(estimate.totalEstimateUsd)}`
                          : '—'}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* Contact & Vehicle Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="commission-name"
                      className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/60"
                    >
                      Full Name
                    </label>
                    <input
                      id="commission-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Julian Vance"
                      className="w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white focus:outline-none"
                    />
                    {errors.fullName && (
                      <p role="alert" className="text-xs text-red-400">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="commission-email"
                      className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/60"
                    >
                      Email Address
                    </label>
                    <input
                      id="commission-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="julian@domain.com"
                      className="w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white focus:outline-none"
                    />
                    {errors.email && (
                      <p role="alert" className="text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="commission-vehicle"
                    className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/60"
                  >
                    Vehicle Marque &amp; Model
                  </label>
                  <input
                    id="commission-vehicle"
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g., 2025 Porsche 911 GT3 RS or Mercedes-AMG G63"
                    className="w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white focus:outline-none"
                  />
                  {errors.vehicleModel && (
                    <p role="alert" className="text-xs text-red-400">
                      {errors.vehicleModel}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="commission-notes"
                    className="block text-[10px] font-medium tracking-[0.22em] uppercase text-white/60"
                  >
                    Specification Notes (Optional)
                  </label>
                  <textarea
                    id="commission-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Preferred finishes, leather hide, exhaust tone, or delivery timeline..."
                    className="w-full border border-white/15 bg-black/50 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 focus:border-white focus:outline-none resize-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
                  <p className="text-xs text-white/45">
                    Consultations conducted privately in London, Munich, or
                    remotely.
                  </p>
                  <button
                    type="submit"
                    className="atelier-outline-btn bg-white text-[#0A0A0B] hover:bg-white/90 hover:text-[#0A0A0B] px-7 py-3 text-[10px] font-semibold tracking-[0.24em] uppercase whitespace-nowrap shrink-0"
                  >
                    Submit Commission Brief
                  </button>
                </div>
              </form>
            )}
          </motion.div>
    </motion.div>
  );
}

interface PreviousBuildsModalProps {
  open: boolean;
  onClose: () => void;
  onCommissionSimilar: (vehicleModel: string) => void;
}

export function PreviousBuildsModal({
  open,
  onClose,
  onCommissionSimilar,
}: PreviousBuildsModalProps) {
  const [selectedMarque, setSelectedMarque] = useState('All');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const marques = ['All', 'Porsche', 'McLaren', 'Mercedes-AMG', 'Land Rover'];
  const builds = useMemo(
    () => filterVehiclesByMarque(PREVIOUS_BUILDS, selectedMarque),
    [selectedMarque]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Previous Builds Archive"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-5xl border border-white/15 bg-[#0D0D0F] atelier-grain p-6 sm:p-10 shadow-2xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-white/50">
                  Commission Archive
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-white">
                  Previous Builds
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close previous builds archive"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 hover:border-white/50 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter previous builds by marque"
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {marques.map((marque) => {
                const active = selectedMarque === marque;
                return (
                  <button
                    key={marque}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedMarque(marque)}
                    className={`px-3.5 py-2 text-[11px] tracking-[0.16em] uppercase border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-white bg-white text-[#0A0A0B] font-medium'
                        : 'border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {marque}
                  </button>
                );
              })}
            </div>

            {/* Build Cards */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {builds.map((build) => (
                <article
                  key={build.id}
                  className="flex flex-col border border-white/12 bg-[#111114] overflow-hidden"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <Image
                      src={build.image}
                      alt={build.imageAlt}
                      fill
                      sizes="(max-width: 768px) 92vw, 460px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 space-y-5">
                    <div className="space-y-2">
                      <p className="text-[11px] font-mono tabular-nums tracking-wider text-white/50">
                        {build.marque}
                        <span aria-hidden="true" className="mx-2 text-white/25">
                          ·
                        </span>
                        {build.year}
                        <span aria-hidden="true" className="mx-2 text-white/25">
                          ·
                        </span>
                        {build.leadTime}
                      </p>
                      <h3 className="font-serif text-2xl text-white">
                        {build.title}
                      </h3>
                      <p className="text-xs text-white/60">
                        {build.chassis} · {build.output} · {build.finish}
                      </p>
                    </div>

                    <ul className="space-y-1.5 border-t border-white/10 pt-4 text-xs text-white/75">
                      {build.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 h-1 w-1 bg-[#C81E1E] shrink-0"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onCommissionSimilar(build.title)}
                        aria-label={`Commission build similar to ${build.title}`}
                        className="atelier-outline-btn inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-medium tracking-[0.22em] uppercase text-white"
                      >
                        <span>Commission Similar</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AvailableStockModalProps {
  open: boolean;
  onClose: () => void;
  onInquireVehicle: (vehicleName: string) => void;
}

export function AvailableStockModal({
  open,
  onClose,
  onInquireVehicle,
}: AvailableStockModalProps) {
  const [selectedMarque, setSelectedMarque] = useState('All');

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  const marques = [
    'All',
    'Porsche',
    'Mercedes-AMG',
    'Land Rover',
    'Lamborghini',
  ];
  const vehicles = useMemo(
    () => filterVehiclesByMarque(AVAILABLE_STOCK, selectedMarque),
    [selectedMarque]
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Available Stock Showroom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative my-auto w-full max-w-5xl border border-white/15 bg-[#0D0D0F] atelier-grain p-6 sm:p-10 shadow-2xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-white/10 pb-6">
              <div>
                <p className="text-[10px] font-medium tracking-[0.26em] uppercase text-white/50">
                  Immediate Acquisition
                </p>
                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-white">
                  Available Stock
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close available stock showroom"
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white/70 hover:border-white/50 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <div
              role="tablist"
              aria-label="Filter available stock by marque"
              className="mt-6 flex flex-wrap items-center gap-2"
            >
              {marques.map((marque) => {
                const active = selectedMarque === marque;
                return (
                  <button
                    key={marque}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedMarque(marque)}
                    className={`px-3.5 py-2 text-[11px] tracking-[0.16em] uppercase border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-white bg-white text-[#0A0A0B] font-medium'
                        : 'border-white/15 text-white/65 hover:border-white/40 hover:text-white'
                    }`}
                  >
                    {marque}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {vehicles.map((vehicle) => (
                <article
                  key={vehicle.id}
                  className="flex flex-col border border-white/12 bg-[#111114] overflow-hidden"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                    <Image
                      src={vehicle.image}
                      alt={vehicle.imageAlt}
                      fill
                      sizes="(max-width: 768px) 92vw, 460px"
                      referrerPolicy="no-referrer"
                      className="object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6 space-y-5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4 text-[11px] font-mono tabular-nums text-white/55">
                        <span>
                          {vehicle.marque}
                          <span aria-hidden="true" className="mx-2 text-white/25">
                            ·
                          </span>
                          {vehicle.mileageMiles.toLocaleString()} mi
                          <span aria-hidden="true" className="mx-2 text-white/25">
                            ·
                          </span>
                          {vehicle.availability}
                        </span>
                        <span className="text-white font-medium">
                          {formatCurrency(vehicle.priceUsd)}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl text-white">
                        {vehicle.name}
                      </h3>

                      <p className="text-xs text-white/60">
                        {vehicle.powertrain} · {vehicle.exteriorFinish}
                      </p>
                    </div>

                    <p className="border-t border-white/10 pt-4 text-xs text-white/75">
                      Atelier Specification:{' '}
                      {vehicle.bespokePackage.join(' · ')}
                    </p>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => onInquireVehicle(vehicle.name)}
                        aria-label={`Inquire about ${vehicle.name}`}
                        className="atelier-outline-btn inline-flex items-center gap-2 px-5 py-2.5 text-[10px] font-medium tracking-[0.22em] uppercase text-white"
                      >
                        <span>Inquire About Vehicle</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
