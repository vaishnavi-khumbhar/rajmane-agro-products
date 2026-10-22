import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PackageCheck, Phone, ShoppingBag, Building2 } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { CATEGORIES, PRODUCTS, getProduct } from '@/data/catalog';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/product/ProductCard';
import { StockBadge } from '@/components/product/StockBadge';
import { WishlistButton } from '@/components/product/WishlistButton';
import { PriceBlock } from '@/components/product/PriceBlock';
import { ProductTabs } from '@/components/product/ProductTabs';
import { ShareButton } from '@/components/product/ShareButton';
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
  const addToCart = useAddToCart();
  const { add } = useCart();
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  useEffect(() => setQty(1), [slug]);
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
    [t('product.brand'), 'Rajmane'],
    [t('product.manufacturer'), t('common.company')],
    [t('product.origin'), t('product.originValue')],
  ];

  return (
    <>
      <div className="container-site pt-8">
        <Breadcrumbs
          items={[
            { label: t('common.home'), to: '/' },
            { label: t('nav.products'), to: '/shop' },
            { label: t(`categories.${cat.key}`), to: `/products/${cat.slug}` },
            { label: name },
          ]}
        />
      </div>
      <section className="container-site grid gap-10 py-8 lg:grid-cols-2 lg:gap-16 lg:py-12">
        <ProductGallery images={product.images} alt={name} />
        <motion.div className="min-w-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <Link to={`/products/${cat.slug}`} className="eyebrow hover:underline">
            {t(`categories.${cat.key}`)}
          </Link>
          <div className="mt-3 flex items-start justify-between gap-4">
            <h1 className="font-display text-display-lg font-medium text-plum-950">{name}</h1>
            <div className="mt-1 flex shrink-0 items-center gap-2">
              <ShareButton title={name} />
              <WishlistButton product={product} size="lg" />
            </div>
          </div>
          <p className="mt-3 text-lg text-ink-muted">{L(product.short)}</p>

          <div className="mt-6">
            <PriceBlock product={product} size="lg" />
          </div>
          <p className="mt-2 text-sm text-ink-muted">{t('product.priceNote')}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <StockBadge product={product} />
            <span className="text-ink-muted">
              {t('product.pack')}: <strong className="text-ink">{product.packSize ?? t('common.toBeConfirmed')}</strong>
            </span>
          </div>

          {product.status === 'discontinued' ? (
            <p role="alert" className="mt-6 rounded-xl2 bg-ivory-200 p-4 text-ink">
              {t('product.discontinuedText')}
            </p>
          ) : (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <QuantityStepper value={qty} onChange={(v) => setQty(clampQty(v))} />
              <Button className="flex-1" size="lg" disabled={unavailable} onClick={() => addToCart(product, qty)} icon={<ShoppingBag className="h-5 w-5" aria-hidden />}>
                {t('product.addToCart')}
              </Button>
              <Button
                className="flex-1"
                size="lg"
                variant="secondary"
                disabled={unavailable}
                onClick={() => {
                  if (!requireAuth()) return;
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

          <ProductTabs description={L(product.description)} specs={specs} />
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