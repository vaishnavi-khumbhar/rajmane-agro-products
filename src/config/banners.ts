/**
 * HOMEPAGE HERO BANNERS — designed artwork supplied by the client.
 *
 * To add / replace a banner: put the file in /public/assets/banners and add an entry here.
 * Desktop artwork: 2172×724 px (3:1). Optional `mobile` artwork (recommended 1080×1350, 4:5) — when it is
 * missing the desktop banner is shown on phones as well.
 * `alt` must describe the text inside the image so screen-reader users get the same message.
 */
export interface HeroBanner {
  id: string;
  desktop: string;
  desktopSm: string;
  mobile?: string;
  alt: string;
  href: string;
}

export const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'traditional-taste',
    desktop: '/assets/banners/banner-3.webp',
    desktopSm: '/assets/banners/banner-3-sm.webp',
    alt: 'Rajmane — Traditional Taste. Pure Goodness. Discover Rajmane jaggery products. Shop now.',
    href: '/shop',
  },
  {
    id: 'little-ones',
    desktop: '/assets/banners/banner-4.webp',
    desktopSm: '/assets/banners/banner-4-sm.webp',
    alt: 'Rajmane — Pure Goodness for Little Ones. Shop now.',
    href: '/shop',
  },
  {
    id: 'every-form',
    desktop: '/assets/banners/banner-2.webp',
    desktopSm: '/assets/banners/banner-2-sm.webp',
    alt: 'Rajmane — Discover Sweetness in Every Form: Jaggery, Jaggery Powder and Jaggery Cubes.',
    href: '/shop',
  },
  {
    id: 'natures-sweetness',
    desktop: '/assets/banners/banner-1.webp',
    desktopSm: '/assets/banners/banner-1-sm.webp',
    alt: "Rajmane — Nature's Sweetness, Rich in Goodness. Explore our Jaggery, Jaggery Powder and Jaggery Cubes.",
    href: '/shop',
  },
];

export const BANNER_RATIO = '2172 / 724';