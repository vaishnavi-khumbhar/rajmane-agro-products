import type { CartLine, Product } from '@/data/types';

export const MAX_QTY = 20;

export interface ResolvedLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

/** Joins cart lines to products, dropping unknown or discontinued items. Pure — unit tested. */
export function resolveCart(lines: CartLine[], products: Product[]): ResolvedLine[] {
  return lines.flatMap((l) => {
    const product = products.find((p) => p.id === l.productId);
    if (!product || product.status !== 'active' || product.stock === 'out_of_stock') return [];
    const qty = clampQty(l.qty);
    return [{ product, qty, lineTotal: product.demoPrice * qty }];
  });
}

export const clampQty = (q: number) => Math.max(1, Math.min(MAX_QTY, Math.floor(Number.isFinite(q) ? q : 1)));

export function cartTotals(lines: ResolvedLine[]) {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  return { subtotal, count };
}

export function addLine(lines: CartLine[], productId: string, qty: number): CartLine[] {
  const existing = lines.find((l) => l.productId === productId);
  if (existing) return lines.map((l) => (l.productId === productId ? { ...l, qty: clampQty(l.qty + qty) } : l));
  return [...lines, { productId, qty: clampQty(qty) }];
}
