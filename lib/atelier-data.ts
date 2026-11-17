export interface MasonryTile {
  id: string;
  src: string;
  alt: string;
  colClass: string;
  aspectClass: string;
  offsetY: number;
}

export interface ApproachPillar {
  id: 'identity' | 'insight' | 'cohesion';
  index: string;
  total: string;
  title: string;
  description: string;
  detailNote: string;
  image: string;
  imageAlt: string;
}

export interface CraftService {
  id: 'bodystyling' | 'interior' | 'lighting' | 'exhaust' | 'protection';
  kicker: string;
  title: string;
  description: string;
  leadTimeWeeks: [number, number];
  startingPriceUsd: number;
  specificationSummary: string;
  image: string;
  imageAlt: string;
}

export interface PreviousBuild {
  id: string;
  title: string;
  marque: string;
  year: number;
  chassis: string;
  output: string;
  finish: string;
  leadTime: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export interface StockVehicle {
  id: string;
  name: string;
  marque: string;
  year: number;
  priceUsd: number;
  mileageMiles: number;
  exteriorFinish: string;
  interiorSpec: string;
  powertrain: string;
  availability: 'Available' | 'Reserved Inquiry';
  bespokePackage: string[];
  image: string;
  imageAlt: string;
}

export const PARTNER_MARQUES = [
  'AUDI',
  'BENTLEY',
  'JAGUAR',
  'LAMBORGHINI',
  'LAND ROVER',
  'PORSCHE',
] as const;

export const MASONRY_TILES: MasonryTile[] = [
  {
    id: 'tile-1',
    src: '/images/service-lighting.jpg',
    alt: 'Custom illuminated halo headlamp detail',
    colClass: 'w-[13%]',
    aspectClass: 'aspect-[3/4]',
    offsetY: 56,
  },
  {
    id: 'tile-2',
    src: '/images/pillar-spirit-ecstasy.jpg',
    alt: 'Chrome hood sculpture study in monochrome',
    colClass: 'w-[14%]',
    aspectClass: 'aspect-square',
    offsetY: 28,
  },
  {
    id: 'tile-3',
    src: '/images/service-exhaust.jpg',
    alt: 'Forged carbon and titanium exhaust assembly',
    colClass: 'w-[15%]',
    aspectClass: 'aspect-[4/5]',
    offsetY: 8,
  },
  {
    id: 'tile-4',
    src: '/images/pillar-carbon-wing.jpg',
    alt: 'Exposed carbon fiber aerodynamic rear wing',
    colClass: 'w-[17%]',
    aspectClass: 'aspect-[4/5]',
    offsetY: -12,
  },
  {
    id: 'tile-5',
    src: '/images/previous-builds-headlight.jpg',
    alt: 'Crimson supercar front fender and LED blade',
    colClass: 'w-[16%]',
    aspectClass: 'aspect-[4/3]',
    offsetY: 6,
  },
  {
    id: 'tile-6',
    src: '/images/service-interior.jpg',
    alt: 'Quilted Alcantara and leather bucket cockpit',
    colClass: 'w-[15%]',
    aspectClass: 'aspect-[4/3]',
    offsetY: 32,
  },
  {
    id: 'tile-7',
    src: '/images/service-protection.jpg',
    alt: 'Ceramic-coated crimson hood water beading',
    colClass: 'w-[13%]',
    aspectClass: 'aspect-[4/5]',
    offsetY: 62,
  },
];

export const APPROACH_PILLARS: ApproachPillar[] = [
  {
    id: 'identity',
    index: '01',
    total: '03',
    title: 'Identity',
    description:
      'Every build begins with the person behind the wheel. Your rhythm, taste, and expectations shape every line and surface.',
    detailNote:
      'Private studio consultation · Curated material & paint samples · Tailored commissioning brief',
    image: '/images/pillar-spirit-ecstasy.jpg',
    imageAlt: 'High-contrast monochrome study of a luxury hood ornament sculpture',
  },
  {
    id: 'insight',
    index: '02',
    total: '03',
    title: 'Insight',
    description:
      'Design, power, and performance are brought together through a considered approach that ensures every build feels complete and 100% tailored to you.',
    detailNote:
      '3D laser chassis scan · Aero & acoustic modeling · Factory-grade tolerance verification',
    image: '/images/pillar-craft-atelier.jpg',
    imageAlt: 'Bespoke automotive designer inspecting brushed aluminum and carbon trim',
  },
  {
    id: 'cohesion',
    index: '03',
    total: '03',
    title: 'Cohesion',
    description:
      'Every component is chosen with precision, ensuring proportions, finishes, and materials harmonize into one unified bespoke build.',
    detailNote:
      'Matched weave alignment · Hand-stitched cabin continuity · Signed atelier plaque',
    image: '/images/pillar-carbon-wing.jpg',
    imageAlt: 'Sculpted exposed carbon fiber supercar rear wing and louvers',
  },
];

export const CRAFT_SERVICES: CraftService[] = [
  {
    id: 'bodystyling',
    kicker: 'SERVICES',
    title: 'Bodystyling',
    description:
      'Our bespoke aero packages are sculpted with intent, sharpening stance, airflow, and silhouette while respecting the purity of the original coachwork.',
    leadTimeWeeks: [4, 6],
    startingPriceUsd: 18500,
    specificationSummary: 'Autoclave pre-preg carbon aero · OEM mounting points · Wind-tunnel balanced',
    image: '/images/service-bodystyling.jpg',
    imageAlt: 'Crimson sports coupe rear quarter with sculpted carbon fiber lip spoiler',
  },
  {
    id: 'interior',
    kicker: 'SERVICES',
    title: 'Interior',
    description:
      'Materials, stitching, form, and finish are specified to create an interior that feels personal, tactile, and composed. All from the stitch to the touch—built for comfort and control.',
    leadTimeWeeks: [5, 8],
    startingPriceUsd: 24000,
    specificationSummary: 'Full-grain Nappa & Alcantara · Hand-quilted bolsters · Custom carbon trim',
    image: '/images/service-interior.jpg',
    imageAlt: 'Bespoke diamond-quilted black Alcantara and leather supercar bucket seat',
  },
  {
    id: 'lighting',
    kicker: 'SERVICES',
    title: 'Lighting',
    description:
      'Lighting gives a vehicle its expression. From subtle tinting to signature illumination and refined optical lenses, we use light to sharpen character, presence, and atmosphere.',
    leadTimeWeeks: [2, 3],
    startingPriceUsd: 7800,
    specificationSummary: 'Bespoke projector housings · Smoked optical glass · Ambient cabin choreography',
    image: '/images/service-lighting.jpg',
    imageAlt: 'Gloss black luxury SUV fender with illuminated white LED halo headlamp',
  },
  {
    id: 'exhaust',
    kicker: 'SERVICES',
    title: 'Exhaust',
    description:
      'Exhaust upgrades are tuned for tone, response, and presence. Not noise for the sake of noise, but a visceral acoustic profile that gives the vehicle resonance and authority.',
    leadTimeWeeks: [2, 4],
    startingPriceUsd: 11200,
    specificationSummary: 'Valved Inconel & Grade-5 titanium · Forged carbon shrouds · Acoustic valve control',
    image: '/images/service-exhaust.jpg',
    imageAlt: 'Twin brushed titanium and carbon-shrouded performance exhaust tips',
  },
  {
    id: 'protection',
    kicker: 'SERVICES',
    title: 'Protection',
    description:
      'Paint protection film and ceramic solutions preserve the depth and clarity of every surface, safeguarding bespoke finishes against wear without altering visual purity.',
    leadTimeWeeks: [1, 2],
    startingPriceUsd: 6400,
    specificationSummary: 'Edge-wrapped self-healing PPF · Multi-stage paint correction · 5-year ceramic seal',
    image: '/images/service-protection.jpg',
    imageAlt: 'Glossy crimson supercar hood with water beading on ceramic protection film',
  },
];

export const PREVIOUS_BUILDS: PreviousBuild[] = [
  {
    id: 'build-gt3rs-guards',
    title: '911 GT3 RS "Guards Atelier"',
    marque: 'Porsche',
    year: 2025,
    chassis: '992 GT3 RS Weissach',
    output: '525 PS · 9,000 RPM',
    finish: 'Guards Crimson / Gloss Twill Carbon',
    leadTime: '11 Weeks',
    highlights: [
      'Full exposed autoclave carbon aero louvres & dive planes',
      'Titanium valved center-exit exhaust system (-11.4 kg)',
      'Crimson contrast-stitched Alcantara & carbon bucket trim',
    ],
    image: '/images/hero-trio-front.jpg',
    imageAlt: 'Guards red Porsche 911 GT3 RS center studio commission',
  },
  {
    id: 'build-750s-crimson',
    title: '750S Coupe "Crimson Blade"',
    marque: 'McLaren',
    year: 2025,
    chassis: 'Monocage II Carbon Tub',
    output: '750 PS · 800 Nm',
    finish: 'Bespoke Volcano Crimson / Forged Carbon',
    leadTime: '9 Weeks',
    highlights: [
      'Machined forged monoblock wheels in satin anthracite',
      'Full-body edge-wrapped satin & gloss dual-finish PPF',
      'Custom optical LED blade calibration & smoked housings',
    ],
    image: '/images/previous-builds-headlight.jpg',
    imageAlt: 'Crimson supercar front wheel arch and illuminated LED blade headlamp',
  },
  {
    id: 'build-g63-obsidian',
    title: 'G63 AMG "Obsidian Edition"',
    marque: 'Mercedes-AMG',
    year: 2024,
    chassis: 'W465 Biturbo V8',
    output: '640 PS · Bespoke Map',
    finish: 'Matte Obsidian Magno / Exposed Carbon',
    leadTime: '10 Weeks',
    highlights: [
      'Sculpted wide-track carbon fender flares & vented bonnet',
      'Hand-quilted perforated Nappa leather & red thread cabin',
      'Valved side-exit titanium exhaust with matte black tips',
    ],
    image: '/images/service-lighting.jpg',
    imageAlt: 'Matte black Mercedes-AMG G63 halo headlamp detail',
  },
  {
    id: 'build-defender-stealth',
    title: 'Defender 110 V8 "Stealth Spec"',
    marque: 'Land Rover',
    year: 2024,
    chassis: 'L663 Supercharged V8',
    output: '525 PS · All-Terrain',
    finish: 'Satin Carpathian Grey / Gloss Black',
    leadTime: '7 Weeks',
    highlights: [
      'Flush carbon roof light pod & dark smoked rear optics',
      'Bespoke Alcantara headliner & milled aluminum switchgear',
      'Full matte paint protection film & undercarriage ceramic seal',
    ],
    image: '/images/footer-trio-rear.jpg',
    imageAlt: 'Rear studio profile of bespoke Land Rover Defender and G63',
  },
];

export const AVAILABLE_STOCK: StockVehicle[] = [
  {
    id: 'stock-gt3rs-2025',
    name: '2025 Porsche 911 GT3 RS Atelier Spec',
    marque: 'Porsche',
    year: 2025,
    priceUsd: 389000,
    mileageMiles: 410,
    exteriorFinish: 'Guards Crimson / Exposed Carbon',
    interiorSpec: 'Black Alcantara & Crimson Stitch',
    powertrain: '4.0L Flat-6 · 7-Speed PDK',
    availability: 'Available',
    bespokePackage: ['Bodystyling Aero', 'Titanium Exhaust', 'Full PPF'],
    image: '/images/available-stock-lineup.jpg',
    imageAlt: 'Crimson Porsche 911 GT3 RS in wet-floor studio lineup',
  },
  {
    id: 'stock-g63-2025',
    name: '2025 Mercedes-AMG G63 Obsidian',
    marque: 'Mercedes-AMG',
    year: 2025,
    priceUsd: 294000,
    mileageMiles: 280,
    exteriorFinish: 'Designo Night Black Magno',
    interiorSpec: 'Quilted Anthracite Nappa Leather',
    powertrain: '4.0L V8 Biturbo · 9G-Tronic',
    availability: 'Available',
    bespokePackage: ['Carbon Widebody', 'Bespoke Interior', 'Halo Optics'],
    image: '/images/service-exhaust.jpg',
    imageAlt: 'Forged carbon and titanium exhaust assembly on bespoke obsidian build',
  },
  {
    id: 'stock-defender-2024',
    name: '2024 Land Rover Defender 110 V8',
    marque: 'Land Rover',
    year: 2024,
    priceUsd: 168500,
    mileageMiles: 1120,
    exteriorFinish: 'Satin Carpathian / Narvik Trim',
    interiorSpec: 'Ebony Windsor & Suedecloth',
    powertrain: '5.0L Supercharged V8 · AWD',
    availability: 'Available',
    bespokePackage: ['Stealth Exterior Pack', 'Acoustic Exhaust', 'Ceramic Shield'],
    image: '/images/service-interior.jpg',
    imageAlt: 'Bespoke quilted interior cabin specification',
  },
  {
    id: 'stock-svj-2024',
    name: '2024 Lamborghini Aventador SVJ Coupe',
    marque: 'Lamborghini',
    year: 2024,
    priceUsd: 645000,
    mileageMiles: 690,
    exteriorFinish: 'Giallo Orion / Forged Carbon',
    interiorSpec: 'Nero Cosmus Alcantara & Carbon',
    powertrain: '6.5L Naturally Aspirated V12',
    availability: 'Reserved Inquiry',
    bespokePackage: ['Autoclave Carbon Wing', 'Inconel Exhaust', 'Track PPF'],
    image: '/images/pillar-carbon-wing.jpg',
    imageAlt: 'Exposed carbon fiber supercar rear wing and louvers',
  },
];
