/**
 * Instagram reels shown in the homepage "Our Process" section.
 * Add a reel: copy its link from Instagram (…/reel/<ID>/…) and add the ID + a short description.
 * `poster` is the photo shown before the reel loads (any key from config/assets.ts IMAGES).
 */
import type { ImageKey } from './assets';

export interface Reel {
  id: string;
  poster: ImageKey;
  alt: string;
}

export const PROCESS_REELS: Reel[] = [
  { id: 'Dd_mIIEkUfU', poster: 'facility4', alt: 'Rajmane Agro Instagram reel 1' },
  { id: 'DeTOsQgAViH', poster: 'facility1', alt: 'Rajmane Agro Instagram reel 2' },
];

export const reelUrl = (id: string) => `https://www.instagram.com/reel/${id}/`;
export const reelEmbedUrl = (id: string) => `https://www.instagram.com/reel/${id}/embed/`;