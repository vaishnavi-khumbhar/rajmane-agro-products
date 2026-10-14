import type { Product } from '@/data/types';

/** Matches a query against every language version of the name, short description, form and category. */
export function matchesQuery(p: Product, q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return true;
  const hay = [
    ...Object.values(p.name),
    ...Object.values(p.short),
    ...Object.values(p.form),
    p.category.replace('-', ' '),
    p.sku,
  ]
    .join(' ')
    .toLowerCase();
  return query.split(/\s+/).every((word) => hay.includes(word));
}
