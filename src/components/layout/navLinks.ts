import type { TKey } from '@/i18n';

export const CATEGORY_LINKS: { to: string; label: TKey; desc: TKey }[] = [
  { to: '/products/jaggery', label: 'categories.jaggery', desc: 'categories.jaggeryDesc' },
  { to: '/products/jaggery-powder', label: 'categories.powder', desc: 'categories.powderDesc' },
  { to: '/products/jaggery-cubes', label: 'categories.cubes', desc: 'categories.cubesDesc' },
];

export const MAIN_LINKS: { to: string; label: TKey }[] = [
  { to: '/about', label: 'nav.story' },
  { to: '/faq', label: 'nav.faqs' },
  { to: '/contact', label: 'nav.contact' },
];
