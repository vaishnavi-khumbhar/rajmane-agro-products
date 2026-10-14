import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import { useLang } from '@/context/LanguageContext';
import { PRODUCTS } from '@/data/catalog';
import type { Category } from '@/data/types';

/** Clean category card: photo on top (no dark overlay), content below on white. */
export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const { t } = useLang();
  const count = PRODUCTS.filter((p) => p.category === category.slug && p.status === 'active').length;
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum-400 focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ivory-200">
        <Img
          image={category.image}
          alt=""
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 font-display text-sm font-semibold text-plum-800 backdrop-blur">
          0{index + 1}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-plum-500">{t(count === 1 ? 'shop.countOne' : 'shop.count', { count })}</p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold text-plum-900">{t(`categories.${category.key}`)}</h3>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{t(`categories.${category.key}Desc`)}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[0.95rem] font-bold text-plum-700 group-hover:text-plum-800">
          {t(`categories.${category.key}Cta`)}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}