import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ShoppingCart } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useAddToCart } from '@/hooks/useAddToCart';
import { CATEGORIES } from '@/data/catalog';
import type { Product } from '@/data/types';
import { WishlistButton } from './WishlistButton';
import { PriceBlock, discountPct } from './PriceBlock';
import { useRequireAuth } from '@/hooks/useRequireAuth';

/** Sai-Jeevan-style commerce card: image + wishlist, name, short copy, price/MRP/% off, cart icon + Buy Now. */
export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const { t, L } = useLang();
  const addToCart = useAddToCart();
  const { add } = useCart();
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  const [justAdded, setJustAdded] = useState(false);
  const cat = CATEGORIES.find((c) => c.slug === product.category)!;
  const name = L(product.name);
  const unavailable = product.status !== 'active' || product.stock === 'out_of_stock';
  const off = discountPct(product);
  const href = `/product/${product.slug}`;

  const onAdd = () => {
    if (!addToCart(product, 1)) return; // not logged in → sent to login page
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line/80 bg-white shadow-[0_2px_6px_rgba(58,16,53,.05),0_14px_30px_-18px_rgba(58,16,53,.25)] transition-shadow duration-300 hover:shadow-[0_4px_10px_rgba(58,16,53,.06),0_28px_50px_-22px_rgba(58,16,53,.45)] sm:rounded-[1.25rem]"
    >
      <Link to={href} className="relative block aspect-square overflow-hidden bg-ivory-200" tabIndex={-1} aria-hidden>
        <Img
          image={product.images[0]}
          alt=""
          priority={priority}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 30vw, 48vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {product.images[1] && (
          <span className="absolute inset-0 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
            <Img
              image={product.images[1]}
              alt=""
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 30vw, 48vw"
              className="h-full w-full object-cover"
            />
          </span>
        )}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>
      {off > 0 && (
        <span className="absolute left-2.5 top-2.5 rounded-full bg-[#D0121B] px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-white shadow sm:left-3 sm:top-3 sm:text-xs">
          -{off}%
        </span>
      )}
      <WishlistButton product={product} className="absolute right-2.5 top-2.5 z-10 !h-9 !w-9 sm:right-3 sm:top-3 sm:!h-10 sm:!w-10" />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-plum-500 sm:text-[0.72rem]">{t(`categories.${cat.key}`)}</p>
        <h3 className="mt-1 font-display text-base font-semibold leading-snug text-plum-900 sm:text-lg">
          <Link to={href} className="line-clamp-2 rounded hover:text-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700">
            {name}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-muted sm:text-[0.85rem]">{L(product.short)}</p>

        <div className="mt-auto flex flex-wrap items-end justify-between gap-x-3 gap-y-3 border-t border-line/70 pt-3.5">
          <PriceBlock product={product} />
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              disabled={unavailable}
              onClick={onAdd}
              aria-label={`${t('product.addToCart')}: ${name}`}
              title={t('product.addToCart')}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 shadow-sm sm:h-11 sm:w-11 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 disabled:opacity-40 ${
                justAdded
                  ? 'border-success bg-success text-white'
                  : 'border-plum-200 bg-plum-50 text-plum-700 hover:-translate-y-0.5 hover:border-plum-700 hover:bg-plum-700 hover:text-white hover:shadow-md'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={String(justAdded)} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.15 }}>
                  {justAdded ? <Check className="h-5 w-5" aria-hidden /> : <ShoppingCart className="h-[19px] w-[19px]" aria-hidden />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              disabled={unavailable}
              onClick={() => {
                if (!requireAuth()) return;
                add(product.id, 1);
                navigate('/checkout');
              }}
              className="relative inline-flex h-9 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-gradient-to-r from-plum-800 via-plum-700 to-plum-600 px-3.5 text-[0.7rem] font-extrabold uppercase tracking-wide sm:h-11 sm:px-5 sm:text-sm sm:tracking-wider text-white shadow-[0_10px_20px_-10px_rgba(122,36,112,.95)] ring-1 ring-inset ring-white/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_24px_-10px_rgba(122,36,112,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 disabled:opacity-40"
              aria-label={`${t('product.buyNow')}: ${name}`}
            >
              <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" aria-hidden />
              {t('product.buyNow')}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-line bg-white" aria-hidden>
      <div className="skeleton aspect-square rounded-none" />
      <div className="space-y-3 p-4">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-10 w-full" />
      </div>
    </div>
  );
}