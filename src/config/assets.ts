// Centralised asset registry. To replace a photo, drop the new file in /public/assets/images and update the
// path here — no component references image paths directly.
export interface ImageAsset {
  src: string;
  /** Smaller (≈700px) version for mobile / cards */
  srcSm: string;
  width: number;
  height: number;
}

const img = (name: string, width: number, height: number): ImageAsset => ({
  src: `/assets/images/${name}.webp`,
  srcSm: `/assets/images/${name}-sm.webp`,
  width,
  height,
});

export const BRAND = {
  logo: '/assets/brand/rajmane-logo.png', // 539×259, transparent; never stretch or recolour
  logoWidth: 539,
  logoHeight: 259,
  icon: '/assets/brand/icon-512.png',
};

export const IMAGES = {
  heroRange: img('hero-range', 1400, 933),
  heroPowder: img('hero-powder', 1400, 933),
  powderBowl: img('powder-bowl', 1400, 933),
  powderJar: img('powder-jar', 1066, 1600),
  powderPair: img('powder-pair', 1066, 1600),
  cubesJar: img('cubes-jar', 1066, 1600),
  cubesPlate: img('cubes-plate', 1066, 1600),
  blockPack: img('block-pack', 1066, 1600),
  blockCane: img('block-cane', 1066, 1600),
  blockTub: img('block-tub', 1066, 1600),
  barOven: img('bar-oven', 1400, 933),
  barBoard: img('bar-board', 1400, 933),
  familyModel: img('family-model', 1066, 1600),
  familyModel2: img('family-model-2', 1066, 1600),
  familyDenim: img('family-denim', 1066, 1600),
  facility1: img('facility-1', 1280, 960),
  facility2: img('facility-2', 1280, 960),
  facility3: img('facility-3', 1280, 960),
  facility4: img('facility-4', 1400, 788),
  facility5: img('facility-5', 960, 1280),
  facility6: img('facility-6', 1400, 788),
  facility7: img('facility-7', 1400, 788),
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof IMAGES;
