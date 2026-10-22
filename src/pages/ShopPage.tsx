import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { PackageSearch, Search, SlidersHorizontal, X } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { CATEGORIES, PRODUCTS } from '@/data/catalog';
import type { CategorySlug, Product } from '@/data/types';
import { matchesQuery } from '@/utils/search';
import { ProductCard } from '@/components/product/ProductCard';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Img } from '@/components/ui/Img';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { SelectField, TextField } from '@/components/ui/Field';

type Sort = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'name';

const sorters: Record<Sort, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(b.featured) - Number(a.featured),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  'price-asc': (a, b) => a.demoPrice - b.demoPrice,
  'price-desc': (a, b) => b.demoPrice - a.demoPrice,
  name: (a, b) => a.name.en.localeCompare(b.name.en),
};

const num = (v: string | null) => (v && !Number.isNaN(Number(v)) && Number(v) >= 0 ? Number(v) : null);

export default function ShopPage({ category }: { category?: CategorySlug }) {
  const { t, money } = useLang();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const sort = (params.get('sort') as Sort) || 'featured';
  const min = num(params.get('min'));
  const max = num(params.get('max'));
  const cat = category ? CATEGORIES.find((c) => c.slug === category) : undefined;

  const [searchOpen, setSearchOpen] = useState(!!q);
  const searchRef = useRef<HTMLInputElement>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  // Draft values edited inside the popup; applied only on "Apply Filters"
  const [draft, setDraft] = useState({ cat: category ?? '', sort, min: min?.toString() ?? '', max: max?.toString() ?? '' });

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const title = cat ? t(`shop.${cat.key}Title`) : t('shop.title');
  const lead = cat ? t(`shop.${cat.key}Lead`) : t('shop.lead');
  usePageMeta(cat ? t(`categories.${cat.key}`) : t('nav.products'), lead);

  const products = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          p.status === 'active' &&
          (!category || p.category === category) &&
          matchesQuery(p, q) &&
          (min === null || p.demoPrice >= min) &&
          (max === null || p.demoPrice <= max),
      ).sort(sorters[sort] ?? sorters.featured),
    [category, q, sort, min, max],
  );

  const activeCount = (category ? 1 : 0) + (sort !== 'featured' ? 1 : 0) + (min !== null ? 1 : 0) + (max !== null ? 1 : 0);

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value);
    else next.delete('q');
    setParams(next, { replace: true });
  };

  const openFilters = () => {
    setDraft({ cat: category ?? '', sort, min: min?.toString() ?? '', max: max?.toString() ?? '' });
    setFilterOpen(true);
  };

  const apply = (d: typeof draft) => {
    const next = new URLSearchParams();
    if (q) next.set('q', q);
    if (d.sort && d.sort !== 'featured') next.set('sort', d.sort);
    if (num(d.min) !== null) next.set('min', String(num(d.min)));
    if (num(d.max) !== null) next.set('max', String(num(d.max)));
    const path = d.cat ? `/products/${d.cat}` : '/shop';
    setFilterOpen(false);
    navigate({ pathname: path, search: next.toString() ? `?${next}` : '' }, { replace: true });
  };

  const clearAll = () => {
    setFilterOpen(false);
    setSearchOpen(false);
    navigate('/shop', { replace: true });
  };

  // Removable chips for whatever is currently applied
  const chips: { key: string; label: string; remove: () => void }[] = [
    ...(cat ? [{ key: 'cat', label: t(`categories.${cat.key}`), remove: () => apply({ cat: '', sort, min: min?.toString() ?? '', max: max?.toString() ?? '' }) }] : []),
    ...(sort !== 'featured'
      ? [{ key: 'sort', label: t(({ newest: 'shop.sortNewest', 'price-asc': 'shop.sortPriceAsc', 'price-desc': 'shop.sortPriceDesc', name: 'shop.sortName' } as const)[sort as Exclude<Sort, 'featured'>]), remove: () => apply({ cat: category ?? '', sort: 'featured', min: min?.toString() ?? '', max: max?.toString() ?? '' }) }]
      : []),
    ...(min !== null ? [{ key: 'min', label: `≥ ${money(min)}`, remove: () => apply({ cat: category ?? '', sort, min: '', max: max?.toString() ?? '' }) }] : []),
    ...(max !== null ? [{ key: 'max', label: `≤ ${money(max)}`, remove: () => apply({ cat: category ?? '', sort, min: min?.toString() ?? '', max: '' }) }] : []),
  ];

  return (
    <section className="container-site pb-12 pt-5 sm:pb-16 sm:pt-8" aria-labelledby="shop-title">
      {/* Breadcrumb + actions (search, Filters) — same row on every screen size */}
      <div className="flex items-center justify-between gap-3">
        <Breadcrumbs
          items={[
            { label: t('common.home'), to: '/' },
            cat ? { label: t('nav.products'), to: '/shop' } : { label: t('nav.products') },
            ...(cat ? [{ label: t(`categories.${cat.key}`) }] : []),
          ]}
        />
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-expanded={searchOpen}
            aria-controls="shop-search-row"
            aria-label={t('shop.searchToggle')}
            className={`grid h-11 w-11 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${
              searchOpen || q ? 'border-plum-700 bg-plum-50 text-plum-800' : 'border-line bg-white text-ink hover:border-plum-400'
            }`}
          >
            <Search className="h-[18px] w-[18px]" aria-hidden />
          </button>
          <button
            type="button"
            onClick={openFilters}
            aria-haspopup="dialog"
            className="relative inline-flex h-11 items-center gap-2 rounded-full border-2 border-plum-700 bg-white px-4 text-sm font-bold text-plum-800 transition-colors hover:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 sm:px-5"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            {t('shop.filtersBtn')}
            {activeCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-plum-700 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
                {activeCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Title block */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mt-5">
        <h1 id="shop-title" className="max-w-3xl font-display text-[clamp(1.75rem,1.3rem+2vw,2.6rem)] font-semibold leading-tight text-plum-900">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted sm:text-base">{lead}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-ink-muted" aria-live="polite">
            {t(products.length === 1 ? 'shop.countOne' : 'shop.count', { count: products.length })}
          </p>
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={c.remove}
              className="inline-flex min-h-[32px] items-center gap-1 rounded-full bg-plum-50 px-3 text-xs font-semibold text-plum-800 hover:bg-plum-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
            >
              {c.label}
              <X className="h-3.5 w-3.5" aria-hidden />
              <span className="sr-only">({t('shop.clear')})</span>
            </button>
          ))}
          {chips.length > 1 && (
            <button type="button" onClick={clearAll} className="link text-xs">
              {t('shop.clearFilters')}
            </button>
          )}
        </div>
      </motion.div>

      {/* Inline search (toggled by the search icon) */}
      <AnimatePresence initial={false}>
        {searchOpen && (
          <motion.div
            id="shop-search-row"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="relative mt-4 max-w-xl">
              <label htmlFor="shop-search" className="sr-only">
                {t('shop.searchLabel')}
              </label>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" aria-hidden />
              <input
                ref={searchRef}
                id="shop-search"
                type="search"
                value={q}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="field pl-11"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DemoNotice className="mt-5 !py-3 text-sm">{t('shop.demoNote')}</DemoNotice>

      {products.length === 0 ? (
        <div className="mt-8 flex flex-col items-center rounded-xl3 border border-dashed border-plum-200 bg-white px-6 py-16 text-center">
          <PackageSearch className="h-12 w-12 text-plum-400" aria-hidden />
          <h2 className="mt-4 font-display text-2xl font-semibold text-plum-900">{t('shop.emptyTitle')}</h2>
          <p className="mt-2 text-ink-muted">{t('shop.emptyText')}</p>
          <Button className="mt-6" onClick={clearAll}>
            {t('shop.clearFilters')}
          </Button>
        </div>
      ) : (
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
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
                <ProductCard product={p} priority={i < 4} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      {cat && (
        <aside className="mt-14 grid gap-4 sm:grid-cols-2">
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

      {/* Filter popup */}
      <Overlay open={filterOpen} onClose={() => setFilterOpen(false)} title={t('shop.filterTitle')} placement="center">
        <form
          className="space-y-5 p-5 sm:p-6"
          onSubmit={(e) => {
            e.preventDefault();
            apply(draft);
          }}
        >
          <SelectField label={t('product.category')} name="cat" plain value={draft.cat} onChange={(e) => setDraft((d) => ({ ...d, cat: e.target.value }))}>
            <option value="">{t('shop.filterAll')}</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {t(`categories.${c.key}`)}
              </option>
            ))}
          </SelectField>
          <SelectField label={t('shop.sort')} name="sort" plain value={draft.sort} onChange={(e) => setDraft((d) => ({ ...d, sort: e.target.value as Sort }))}>
            <option value="featured">{t('shop.sortFeatured')}</option>
            <option value="newest">{t('shop.sortNewest')}</option>
            <option value="price-asc">{t('shop.sortPriceAsc')}</option>
            <option value="price-desc">{t('shop.sortPriceDesc')}</option>
            <option value="name">{t('shop.sortName')}</option>
          </SelectField>
          <div className="grid grid-cols-2 gap-4">
            <TextField label={t('shop.priceMin')} name="min" plain type="number" inputMode="numeric" min={0} placeholder="0" value={draft.min} onChange={(e) => setDraft((d) => ({ ...d, min: e.target.value }))} />
            <TextField label={t('shop.priceMax')} name="max" plain type="number" inputMode="numeric" min={0} placeholder="1000" value={draft.max} onChange={(e) => setDraft((d) => ({ ...d, max: e.target.value }))} />
          </div>
          <div className="flex gap-3 pt-1">
            <Button type="submit" className="flex-1">
              {t('shop.apply')}
            </Button>
            <Button variant="secondary" onClick={clearAll}>
              {t('shop.clear')}
            </Button>
          </div>
        </form>
      </Overlay>
    </section>
  );
}