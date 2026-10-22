/**
 * Company & leadership details (source: Rajmane Agro brochure).
 * ✏️  Edit here only — the "Our Story" page reads everything from this file.
 *
 * PHOTOS: put the image in  public/assets/images/team/  and write its path in `photo`,
 * e.g. photo: 'assets/images/team/owner.jpg'. While `photo` is empty a monogram placeholder is shown.
 * photoFocus = where the face is in the photo (CSS object-position, e.g. '35% 30%').
 * photoZoom  = zoom into the face (1 = no zoom, 2 = twice as close).
 */
import type { Localized } from '@/data/types';
import type { TKey } from '@/i18n';

export interface Leader {
  id: string;
  name: Localized;
  role: TKey;
  phoneDisplay: string;
  phoneE164: string;
  photo?: string;
  /** Where the face is in the photo (CSS object-position), e.g. '35% 30%'. Default: centre. */
  photoFocus?: string;
  /** Zoom into the face: 1 = no zoom, 1.6 = 60% closer. Default: 1. */
  photoZoom?: number;
  featured?: boolean;
}

export const LEADERS: Leader[] = [
  {
    id: 'owner',
    name: { en: 'Mr. Mallikarjun Vinayak Rajmane', mr: 'श्री. मल्लिकार्जुन विनायक राजमाने', hi: 'श्री मल्लिकार्जुन विनायक राजमाने' },
    role: 'company.owner',
    phoneDisplay: '+91 96655 34277',
    phoneE164: '+919665534277',
    photo: 'assets/images/team/owner.jpg',
    photoFocus: '60% 15%',
    featured: true,
  },
  {
    id: 'chairman',
    name: { en: 'Mr. Tushar Mallikarjun Rajmane', mr: 'श्री. तुषार मल्लिकार्जुन राजमाने', hi: 'श्री तुषार मल्लिकार्जुन राजमाने' },
    role: 'company.chairman',
    phoneDisplay: '+91 73871 01619',
    phoneE164: '+917387101619',
    photo: 'assets/images/team/chairman.jpg',
     photoFocus: '22% 30%',
    photoZoom: 1.10,
  },
  {
    id: 'md',
    name: { en: 'Mrs. Mayuri Tushar Rajmane', mr: 'सौ. मयुरी तुषार राजमाने', hi: 'श्रीमती मयूरी तुषार राजमाने' },
    role: 'company.md',
    phoneDisplay: '+91 91726 80896',
    phoneE164: '+919172680896',
    photo: 'assets/images/team/md.jpg',
    photoFocus: '50% 20%',
  },
];

export interface Office {
  id: string;
  label: TKey;
  kind: 'factory' | 'head' | 'branch';
  lines: string[];
  mapQuery: string;
}

/** Official addresses are kept in English in every language (as printed on the brochure / GST records). */
export const OFFICES: Office[] = [
  {
    id: 'factory',
    label: 'company.factory',
    kind: 'factory',
    lines: ['Gat No. 958, Kapurholshivar,', 'A/P Masur, Tal. Karad, Dist. Satara'],
    mapQuery: 'Kapurholshivar, Masur, Karad, Satara, Maharashtra',
  },
  {
    id: 'head',
    label: 'company.headOffice',
    kind: 'head',
    lines: ['Milkat No. 2383, Karad–Masur Road,', 'Front of New S.T. Stand, Masur – 415106'],
    mapQuery: 'Karad Masur Road, New ST Stand, Masur, Maharashtra 415106',
  },
  {
    id: 'mumbai',
    label: 'company.mumbaiOffice',
    kind: 'branch',
    lines: ['Lodha Premier, Casa Foresta C, Flat No. 603,', 'Opp. Runwal Garden, Kalyan Shilphata Road,', 'Manpada, Dombivli (East) – 421201'],
    mapQuery: 'Lodha Casa Foresta, Kalyan Shilphata Road, Dombivli East 421201',
  },
];

export const REGISTRATIONS = {
  /** Exactly as printed on the brochure — confirm against the GST certificate. */
  legalName: 'Rajmane Agro Farmer Producer Co. Ltd.',
  gst: '27AALCR6259A1Z9',
  fssai: '11526085000089',
};

export const mapLink = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;