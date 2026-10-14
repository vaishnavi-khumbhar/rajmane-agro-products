import { useLang } from '@/context/LanguageContext';
import type { Product } from '@/data/types';

export const discountPct = (p: Product) =>
  p.compareAtPrice && p.compareAtPrice > p.demoPrice ? Math.round(((p.compareAtPrice - p.demoPrice) / p.compareAtPrice) * 100) : 0;

/** Selling price, MRP (struck through) and red % OFF — discount only when an MRP is configured. */
export function PriceBlock({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  const { t, money } = useLang();
  const off = discountPct(product);
  const lg = size === 'lg';
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <p className={`font-display font-bold tabular-nums leading-none text-plum-800 ${lg ? 'text-4xl' : 'text-[1.35rem] sm:text-2xl'}`}>{money(product.demoPrice)}</p>
        {off > 0 && (
          <p className={`whitespace-nowrap text-ink-soft ${lg ? 'text-base' : 'text-xs sm:text-[0.82rem]'}`}>
            <span className="sr-only">{t('product.mrp')}: </span>
            <span aria-hidden>{t('product.mrp')} </span>
            <s className="tabular-nums">{money(product.compareAtPrice!)}</s>
          </p>
        )}
      </div>
      <div className={`mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${lg ? 'text-sm' : 'text-[0.7rem] sm:text-xs'}`}>
        {off > 0 && <span className="whitespace-nowrap font-extrabold uppercase tracking-wide text-[#D0121B]">{t('product.off', { n: off })}</span>}
      </div>
    </div>
  );
}