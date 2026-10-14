import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/site';
import { PRODUCTS } from '@/data/catalog';
import type { Product } from '@/data/types';
import { readJSON, writeJSON } from '@/utils/storage';

interface WishlistValue {
  ids: string[];
  items: Product[];
  count: number;
  has: (id: string) => boolean;
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
}

const WishlistContext = createContext<WishlistValue | null>(null);

/** Frontend wishlist persisted in localStorage. Moves to the customer account once login exists. */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    const raw = readJSON<unknown>(STORAGE_KEYS.wishlist, []);
    return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string' && PRODUCTS.some((p) => p.id === x)) : [];
  });
  useEffect(() => writeJSON(STORAGE_KEYS.wishlist, ids), [ids]);

  const has = useCallback((id: string) => ids.includes(id), [ids]);
  const toggle = useCallback(
    (id: string) => {
      const adding = !ids.includes(id);
      setIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
      return adding;
    },
    [ids],
  );
  const remove = useCallback((id: string) => setIds((cur) => cur.filter((x) => x !== id)), []);
  const value = useMemo(() => {
    const items = ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => !!p);
    return { ids, items, count: items.length, has, toggle, remove };
  }, [ids, has, toggle, remove]);
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used inside WishlistProvider');
  return ctx;
}
