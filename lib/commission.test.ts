import test from 'node:test';
import assert from 'node:assert/strict';
import {
  estimateCommissionPlan,
  filterVehiclesByMarque,
  formatCurrency,
  generateCommissionReference,
  validateCommissionForm,
} from './commission';
import { AVAILABLE_STOCK, PREVIOUS_BUILDS } from './atelier-data';

test('formatCurrency formats USD amounts without decimals', () => {
  assert.equal(formatCurrency(389000), '$389,000');
  assert.equal(formatCurrency(18500), '$18,500');
});

test('filterVehiclesByMarque filters case-insensitively and handles "All"', () => {
  assert.equal(
    filterVehiclesByMarque(PREVIOUS_BUILDS, 'All').length,
    PREVIOUS_BUILDS.length
  );
  const porscheBuilds = filterVehiclesByMarque(PREVIOUS_BUILDS, 'porsche');
  assert.equal(porscheBuilds.length, 1);
  assert.equal(porscheBuilds[0].marque, 'Porsche');

  const stockG63 = filterVehiclesByMarque(AVAILABLE_STOCK, 'Mercedes-AMG');
  assert.equal(stockG63.length, 1);
  assert.equal(stockG63[0].id, 'stock-g63-2025');
});

test('estimateCommissionPlan returns zeroed estimate when empty', () => {
  const empty = estimateCommissionPlan([], 'supercar');
  assert.equal(empty.totalEstimateUsd, 0);
  assert.equal(empty.minWeeks, 0);
  assert.equal(empty.maxWeeks, 0);
  assert.equal(empty.selectedServices.length, 0);
});

test('estimateCommissionPlan calculates scaled investment and concurrent lead times', () => {
  const gtSingle = estimateCommissionPlan(['bodystyling'], 'gt');
  assert.equal(gtSingle.totalEstimateUsd, 18500);
  assert.equal(gtSingle.minWeeks, 4);
  assert.equal(gtSingle.maxWeeks, 6);

  const supercarPair = estimateCommissionPlan(
    ['bodystyling', 'interior', 'bodystyling'],
    'supercar'
  );
  // (18500 + 24000) * 1.25 = 53125 -> rounded to nearest 100 = 53100
  assert.equal(supercarPair.totalEstimateUsd, 53100);
  assert.equal(supercarPair.selectedServices.length, 2);
  assert.ok(supercarPair.minWeeks >= 5 && supercarPair.maxWeeks >= 8);
});

test('validateCommissionForm rejects empty/invalid inputs and accepts valid briefs', () => {
  const invalid = validateCommissionForm({
    fullName: '',
    email: 'not-an-email',
    vehicleModel: ' ',
    vehicleClass: 'supercar',
    selectedServiceIds: [],
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.vehicleModel);
  assert.ok(invalid.errors.selectedServiceIds);

  const valid = validateCommissionForm({
    fullName: 'Julian Vance',
    email: 'julian@atelier.co.uk',
    vehicleModel: '2025 Porsche 911 GT3 RS',
    vehicleClass: 'supercar',
    selectedServiceIds: ['bodystyling', 'exhaust'],
    notes: 'Guards red stitching to match exterior.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateCommissionReference produces deterministic studio reference code', () => {
  assert.equal(
    generateCommissionReference('Porsche 911 GT3', 1794891234),
    'AF-PORS-1234'
  );
});
