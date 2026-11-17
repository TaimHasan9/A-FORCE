import { CRAFT_SERVICES, type CraftService } from './atelier-data';

export type VehicleClass = 'supercar' | 'suv' | 'gt';

export interface CommissionEstimate {
  totalEstimateUsd: number;
  minWeeks: number;
  maxWeeks: number;
  selectedServices: CraftService[];
}

export interface CommissionFormInput {
  fullName: string;
  email: string;
  vehicleModel: string;
  vehicleClass: VehicleClass;
  selectedServiceIds: string[];
  notes: string;
}

export interface CommissionValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CommissionFormInput, string>>;
}

const VEHICLE_CLASS_MULTIPLIER: Record<VehicleClass, number> = {
  gt: 1.0,
  suv: 1.12,
  supercar: 1.25,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function filterVehiclesByMarque<T extends { marque: string }>(
  items: T[],
  marque: string
): T[] {
  if (!marque || marque.toLowerCase() === 'all') {
    return items;
  }
  const normalized = marque.trim().toLowerCase();
  return items.filter((item) => item.marque.toLowerCase() === normalized);
}

export function estimateCommissionPlan(
  selectedServiceIds: string[],
  vehicleClass: VehicleClass
): CommissionEstimate {
  const uniqueIds = Array.from(new Set(selectedServiceIds));
  const selectedServices = CRAFT_SERVICES.filter((service) =>
    uniqueIds.includes(service.id)
  );

  if (selectedServices.length === 0) {
    return {
      totalEstimateUsd: 0,
      minWeeks: 0,
      maxWeeks: 0,
      selectedServices: [],
    };
  }

  const multiplier = VEHICLE_CLASS_MULTIPLIER[vehicleClass] ?? 1.0;
  const rawTotal = selectedServices.reduce(
    (sum, service) => sum + service.startingPriceUsd * multiplier,
    0
  );

  // Concurrent bay scheduling reduces sequential lead time after the primary discipline
  const sortedMin = selectedServices
    .map((s) => s.leadTimeWeeks[0])
    .sort((a, b) => b - a);
  const sortedMax = selectedServices
    .map((s) => s.leadTimeWeeks[1])
    .sort((a, b) => b - a);

  const minWeeks =
    sortedMin[0] +
    sortedMin.slice(1).reduce((acc, w) => acc + Math.ceil(w * 0.5), 0);
  const maxWeeks =
    sortedMax[0] +
    sortedMax.slice(1).reduce((acc, w) => acc + Math.ceil(w * 0.55), 0);

  return {
    totalEstimateUsd: Math.round(rawTotal / 100) * 100,
    minWeeks,
    maxWeeks,
    selectedServices,
  };
}

export function validateCommissionForm(
  input: CommissionFormInput
): CommissionValidationResult {
  const errors: Partial<Record<keyof CommissionFormInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  if (!input.email || !EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Please enter a valid contact email address.';
  }

  if (!input.vehicleModel || input.vehicleModel.trim().length < 2) {
    errors.vehicleModel = 'Specify the marque and model for your commission.';
  }

  if (!input.selectedServiceIds || input.selectedServiceIds.length === 0) {
    errors.selectedServiceIds =
      'Select at least one craft discipline for your build brief.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function generateCommissionReference(
  vehicleModel: string,
  timestampMs: number = Date.now()
): string {
  const cleanCode =
    vehicleModel
      .replace(/[^a-zA-Z0-9]/g, '')
      .toUpperCase()
      .slice(0, 4) || 'ATLR';
  const suffix = String(timestampMs % 10000).padStart(4, '0');
  return `AF-${cleanCode}-${suffix}`;
}
