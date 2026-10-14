import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/site';
import { PRODUCTS } from '@/data/catalog';
import type { CartLine } from '@/data/types';
import { addLine, cartTotals, clampQty, resolveCart, type ResolvedLine } from '@/utils/cart';
import { readJSON, writeJSON } from '@/utils/storage';

interface CartValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  add: (productId: string, qty?: number) => void;
  setQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartValue | null>(null);

const sanitize = (raw: unknown): CartLine[] =>
  Array.isArray(raw)
    ? raw
        .filter((l): l is CartLine => !!l && typeof l.productId === 'string' && typeof l.qty === 'number')
        .map((l) => ({ productId: l.productId, qty: clampQty(l.qty) }))
    : [];

export function CartProvider({ children }: { children: ReactNode }) {
  const [raw, setRaw] = useState<CartLine[]>(() => sanitize(readJSON(STORAGE_KEYS.cart, [])));

  useEffect(() => writeJSON(STORAGE_KEYS.cart, raw), [raw]);

  // Keep tabs in sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.cart) setRaw(sanitize(readJSON(STORAGE_KEYS.cart, [])));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const add = useCallback((productId: string, qty = 1) => setRaw((l) => addLine(l, productId, qty)), []);
  const setQty = useCallback(
    (productId: string, qty: number) => setRaw((l) => l.map((x) => (x.productId === productId ? { ...x, qty: clampQty(qty) } : x))),
    [],
  );
  const remove = useCallback((productId: string) => setRaw((l) => l.filter((x) => x.productId !== productId)), []);
  const clear = useCallback(() => setRaw([]), []);

  const value = useMemo(() => {
    const lines = resolveCart(raw, PRODUCTS);
    return { lines, ...cartTotals(lines), add, setQty, remove, clear };
  }, [raw, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
