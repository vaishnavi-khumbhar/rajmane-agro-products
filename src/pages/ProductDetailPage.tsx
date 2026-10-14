import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackageCheck, Phone, Building2 } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CATEGORIES, PRODUCTS, getProduct } from '@/data/catalog';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { StockBadge } from '@/components/product/StockBadge';
import { WishlistButton } from '@/components/product/WishlistButton';
import { ShareButton } from '@/components/product/ShareButton';
import { PriceBlock } from '@/components/product/PriceBlock';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { clampQty } from '@/utils/cart';
import { SITE } from '@/config/site';
import NotFoundPage from './NotFoundPage';

export default function ProductDetailPage() {
  const { slug = '' } = useParams();
  const product = getProduct(slug);
  const { t, L } = useLang();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const addToCart = useAddToCart();
  const { add } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    setQty(1);
    setTab('description');
  }, [slug]);
  usePageMeta(product ? L(product.name) : t('product.notFound'), product ? L(product.description) : undefined);

  if (!product) return <NotFoundPage title={t('product.notFound')} text={t('product.notFoundText')} />;

  const cat = CATEGORIES.find((c) => c.slug === product.category)!;
  const name = L(product.name);
  const unavailable = product.status !== 'active' || product.stock === 'out_of_stock';
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.status === 'active')
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  const specs: [string, string][] = [
    [t('product.category'), t(`categories.${cat.key}`)],
    [t('product.form'), L(product.form)],
    [t('product.packaging'), L(product.packaging)],
    [t('product.pack'), product.packSize ?? t('common.toBeConfirmed')],
    [t('product.sku'), product.sku],
  ];

  return (
    <>
      <div className="container-site pt-8">
        <Breadcrumbs
          items={[
            { label: t('common.home'), to: '/' },
            { label: t('nav.shop'), to: '/shop' },
            { label: t(`categories.${cat.key}`), to: `/products/${cat.slug}` },
            { label: name },
          ]}
        />
      </div>
      <section className="container-site grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <ProductGallery images={product.images} alt={name} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Link to={`/products/${cat.slug}`} className="eyebrow hover:underline">
            {t(`categories.${cat.key}`)}
          </Link>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-display-lg font-medium text-plum-950">{name}</h1>
            <div className="mt-1 flex shrink-0 items-center gap-2">
              <ShareButton product={product} />
              <WishlistButton product={product} />
            </div>
          </div>
          <p className="mt-3 text-lg text-ink-muted">{L(product.short)}</p>

          <div className="mt-6">
            <PriceBlock product={product} size="lg" />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <StockBadge product={product} />
            <span className="text-ink-muted">
              {t('product.pack')}: <strong className="text-ink">{product.packSize ?? t('common.toBeConfirmed')}</strong>
            </span>
          </div>

          {product.packSize && (
            <div className="mt-6">
              <p className="text-sm font-semibold text-ink-muted">{t('product.pack')}</p>
              <span className="mt-2 inline-flex rounded-full bg-plum-700 px-5 py-2 text-sm font-bold text-white shadow-sm">{product.packSize}</span>
            </div>
          )}

          {product.status === 'discontinued' ? (
            <p role="alert" className="mt-6 rounded-xl2 bg-ivory-200 p-4 text-ink">
              {t('product.discontinuedText')}
            </p>
          ) : (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <QuantityStepper value={qty} onChange={(v) => setQty(clampQty(v))} />
              <Button size="lg" className="min-w-[10rem]" disabled={unavailable} onClick={() => addToCart(product, qty)}>
                {t('product.addToCart')}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="min-w-[9rem]"
                disabled={unavailable}
                onClick={() => {
                  add(product.id, qty);
                  navigate('/checkout');
                }}
              >
                {t('product.buyNow')}
              </Button>
            </div>
          )}

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            <li className="flex items-center gap-3 rounded-xl2 bg-plum-50 p-4 text-sm font-semibold text-plum-900">
              <PackageCheck className="h-5 w-5 shrink-0 text-plum-600" aria-hidden />
              {t('product.hygiene')}
            </li>
            <li>
              <a href={`tel:${SITE.phoneE164}`} className="flex items-center gap-3 rounded-xl2 bg-plum-50 p-4 text-sm font-semibold text-plum-900 hover:bg-plum-100">
                <Phone className="h-5 w-5 shrink-0 text-plum-600" aria-hidden />
                {t('product.support')}
              </a>
            </li>
          </ul>

          <div className="mt-10">
            <div role="tablist" aria-label={name} className="flex gap-6 overflow-x-auto border-b border-line">
              {(
                [
                  ['description', t('product.description')],
                  ['specs', `${t('product.specifications')} (${specs.length})`],
                  ['reviews', t('product.reviews')],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  aria-selected={tab === id}
                  aria-controls={`panel-${id}`}
                  onClick={() => setTab(id)}
                  className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${
                    tab === id ? 'border-plum-700 text-plum-800' : 'border-transparent text-ink-muted hover:text-plum-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="pt-5">
              {tab === 'description' && <p className="leading-relaxed text-ink-muted">{L(product.description)}</p>}
              {tab === 'specs' && (
                <dl className="divide-y divide-line overflow-hidden rounded-xl2 border border-line bg-white">
                  {specs.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[minmax(7rem,40%)_1fr] gap-4 px-4 py-3 text-[0.95rem]">
                      <dt className="font-semibold text-ink-muted">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {tab === 'reviews' && <p className="text-ink-muted">{t('product.noReviews')}</p>}
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-3 rounded-xl2 border border-dashed border-plum-200 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3 font-semibold text-plum-900">
              <Building2 className="h-5 w-5 text-plum-600" aria-hidden />
              {t('product.bulkNote')}
            </p>
            <ButtonLink to="/contact?type=bulk" variant="secondary" size="sm">
              {t('product.bulkLink')}
            </ButtonLink>
          </div>
        </motion.div>
      </section>

      {related.length > 0 && (
        <section className="section bg-gradient-to-b from-ivory to-plum-50/60">
          <div className="container-site">
            <SectionHeading title={t('product.related')} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.08}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}