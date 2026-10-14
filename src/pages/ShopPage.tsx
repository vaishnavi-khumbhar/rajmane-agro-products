import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PackageSearch, Search, X } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import type { CategorySlug, Product } from '@/data/types';
import { matchesQuery } from '@/utils/search';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Img } from '@/components/ui/Img';
import { LotusMark } from '@/components/ui/LotusMark';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Button } from '@/components/ui/Button';

type Sort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name';

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  'price-asc': (a, b) => a.demoPrice - b.demoPrice,
  'price-desc': (a, b) => b.demoPrice - a.demoPrice,
  name: (a, b) => a.name.en.localeCompare(b.name.en),
};

export default function ShopPage({ category }: { category?: CategorySlug }) {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const sort = (params.get('sort') as Sort) || 'featured';
  const cat = category ? CATEGORIES.find((c) => c.slug === category) : undefined;

  const title = cat ? t(`shop.${cat.key}Title`) : t('shop.title');
  const lead = cat ? t(`shop.${cat.key}Lead`) : t('shop.lead');
  usePageMeta(cat ? t(`categories.${cat.key}`) : t('nav.shop'), lead);

  const products = useMemo(
    () =>
      PRODUCTS.filter((p) => p.status === 'active' && (!category || p.category === category) && matchesQuery(p, q)).sort(
        sorters[sort] ?? sorters.featured,
      ),
    [category, q, sort],
  );

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const chip = (active: boolean) =>
    `inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 ${
      active ? 'border-plum-700 bg-plum-700 text-white' : 'border-line bg-white text-ink hover:border-plum-400 hover:text-plum-800'
    }`;

  return (
    <>
      <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-plum-50 to-ivory">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum-200/40 blur-3xl" aria-hidden />
        <div className={`container-site relative grid items-center gap-8 py-10 sm:py-14 ${cat ? 'lg:grid-cols-[1.3fr_1fr]' : ''}`}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Breadcrumbs
              items={[{ label: t('common.home'), to: '/' }, cat ? { label: t('nav.shop'), to: '/shop' } : { label: t('nav.shop') }, ...(cat ? [{ label: t(`categories.${cat.key}`) }] : [])]}
            />
            <p className="eyebrow mt-6">
              <LotusMark className="h-4 w-4" />
              {cat ? t(`categories.${cat.key}`) : t('shop.eyebrow')}
            </p>
            <h1 className="mt-3 max-w-3xl font-display text-display-lg font-medium text-plum-900">{title}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">{lead}</p>
          </motion.div>
          {cat && (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="hidden overflow-hidden rounded-[2rem] border-4 border-white shadow-lift lg:block">
              <div className="aspect-[4/3]">
                <Img image={cat.heroImage} alt="" priority sizes="40vw" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          )}
        </div>
      </header>

      <section className="container-site py-10 sm:py-14" aria-label={t('nav.products')}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <nav aria-label={t('shop.filters')} className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
            <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
              <li>
                <Link to={{ pathname: '/shop', search: q ? `?q=${encodeURIComponent(q)}` : '' }} className={chip(!category)} aria-current={!category ? 'page' : undefined}>
                  {t('shop.filterAll')}
                </Link>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to={{ pathname: `/products/${c.slug}`, search: q ? `?q=${encodeURIComponent(q)}` : '' }}
                    className={chip(category === c.slug)}
                    aria-current={category === c.slug ? 'page' : undefined}
                  >
                    {t(`categories.${c.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <label htmlFor="shop-search" className="sr-only">
                {t('shop.searchLabel')}
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
              <input
                id="shop-search"
                type="search"
                value={q}
                onChange={(e) => update('q', e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="field pl-11 sm:w-72"
              />
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="shop-sort" className="shrink-0 text-sm font-semibold text-ink-muted">
                {t('shop.sort')}
              </label>
              <select id="shop-sort" value={sort} onChange={(e) => update('sort', e.target.value === 'featured' ? '' : e.target.value)} className="field !w-auto min-w-[11rem] cursor-pointer">
                <option value="featured">{t('shop.sortFeatured')}</option>
                <option value="newest">{t('shop.sortNewest')}</option>
                <option value="price-asc">{t('shop.sortPriceAsc')}</option>
                <option value="price-desc">{t('shop.sortPriceDesc')}</option>
                <option value="name">{t('shop.sortName')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-ink-muted" aria-live="polite">
            {t(products.length === 1 ? 'shop.countOne' : 'shop.count', { count: products.length })}
            {q && <span className="font-normal"> · “{q}”</span>}
          </p>
          {(q || sort !== 'featured') && (
            <button type="button" className="link inline-flex min-h-[40px] items-center gap-1 text-sm" onClick={() => setParams({}, { replace: true })}>
              <X className="h-4 w-4" aria-hidden />
              {t('shop.clearFilters')}
            </button>
          )}
        </div>

        <DemoNotice className="mt-6">{t('shop.demoNote')}</DemoNotice>

        {products.length === 0 ? (
          <div className="mt-10 flex flex-col items-center rounded-xl3 border border-dashed border-plum-200 bg-white px-6 py-16 text-center">
            <PackageSearch className="h-12 w-12 text-plum-400" aria-hidden />
            <h2 className="mt-4 font-display text-2xl font-semibold text-plum-900">{t('shop.emptyTitle')}</h2>
            <p className="mt-2 text-ink-muted">{t('shop.emptyText')}</p>
            <Button className="mt-6" onClick={() => setParams({}, { replace: true })}>
              {t('shop.clearFilters')}
            </Button>
          </div>
        ) : (
          <motion.ul layout className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {products.map((p, i) => (
                <motion.li
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                >
                  <ProductCard product={p} priority={i < 3} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        )}

        {cat && (
          <aside className="mt-16 grid gap-4 sm:grid-cols-2">
            {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
              <Link key={c.slug} to={`/products/${c.slug}`} className="group flex items-center gap-4 rounded-xl2 border border-line bg-white p-4 shadow-card transition-shadow hover:shadow-lift">
                <span className="h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                  <Img image={c.image} alt="" sizes="80px" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </span>
                <span>
                  <span className="block font-display text-lg font-semibold text-plum-900">{t(`categories.${c.key}`)}</span>
                  <span className="block text-sm text-ink-muted">{t(`categories.${c.key}Desc`)}</span>
                  <span className="mt-1 block text-sm font-semibold text-plum-700">{t('shop.shopNow')} →</span>
                </span>
              </Link>
            ))}
          </aside>
        )}
      </section>
    </>
  );
}
