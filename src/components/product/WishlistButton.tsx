import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/data/types';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export function WishlistButton({ product, className = '', size = 'md' }: { product: Product; className?: string; size?: 'md' | 'lg' }) {
  const { has, toggle } = useWishlist();
  const { t, L } = useLang();
  const { notify } = useToast();
  const requireAuth = useRequireAuth();
  const name = L(product.name);
  const active = has(product.id);
  const dim = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      aria-pressed={active}
      aria-label={active ? t('wishlist.remove', { name }) : t('wishlist.add', { name })}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!requireAuth()) return;
        const added = toggle(product.id);
        notify(added ? t('wishlist.added', { name }) : t('wishlist.removed', { name }), { tone: added ? 'success' : 'info' });
      }}
      className={`grid ${dim} shrink-0 place-items-center rounded-full border bg-white/95 shadow-card backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 ${
        active ? 'border-rose-200 text-rose-600' : 'border-line text-plum-800 hover:text-rose-600'
      } ${className}`}
    >
      <motion.span key={String(active)} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
        <Heart className="h-5 w-5" fill={active ? 'currentColor' : 'none'} aria-hidden />
      </motion.span>
    </motion.button>
  );
}