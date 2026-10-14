import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useLang } from '@/context/LanguageContext';
import { useWishlist } from '@/context/WishlistContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { Img } from '@/components/ui/Img';
import { StockBadge } from '@/components/product/StockBadge';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const { t, L, money } = useLang();
  const { items, remove } = useWishlist();
  const addToCart = useAddToCart();
  usePageMeta(t('wishlist.title'));

  return (
    <>
      <PageHeader title={t('wishlist.title')} lead={t('wishlist.lead')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.wishlist') }]} />
      <div className="container-site py-10 sm:py-14">
        {items.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="grid h-24 w-24 place-items-center rounded-full bg-rose-50 text-rose-500"
            >
              <Heart className="h-10 w-10" aria-hidden />
            </motion.span>
            <h2 className="font-display text-2xl font-semibold text-plum-900">{t('wishlist.empty')}</h2>
            <p className="text-ink-muted">{t('wishlist.emptyText')}</p>
            <ButtonLink to="/shop" size="lg">
              {t('cart.startShopping')}
            </ButtonLink>
          </div>
        ) : (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence initial={false}>
                {items.map((p) => {
                  const name = L(p.name);
                  return (
                    <motion.li key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="card flex gap-4 p-4">
                      <Link to={`/product/${p.slug}`} className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-ivory-200" tabIndex={-1} aria-hidden>
                        <Img image={p.images[0]} alt="" sizes="96px" className="h-full w-full object-cover" />
                      </Link>
                      <div className="flex min-w-0 flex-1 flex-col gap-2">
                        <Link to={`/product/${p.slug}`} className="font-display text-lg font-semibold leading-snug text-plum-900 hover:text-plum-700">
                          {name}
                        </Link>
                        <p className="text-sm">
                          <span className="font-semibold">{money(p.demoPrice)}</span> <span className="text-xs font-semibold uppercase text-warn">{t('common.demoPrice')}</span>
                        </p>
                        <StockBadge product={p} />
                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                          <Button
                            size="sm"
                            icon={<ShoppingBag className="h-4 w-4" aria-hidden />}
                            disabled={p.status !== 'active' || p.stock === 'out_of_stock'}
                            onClick={() => {
                              addToCart(p, 1);
                              remove(p.id);
                            }}
                          >
                            {t('wishlist.moveToCart')}
                          </Button>
                          <button
                            type="button"
                            onClick={() => remove(p.id)}
                            aria-label={t('wishlist.remove', { name })}
                            className="icon-btn h-10 w-10 text-ink-muted hover:bg-danger-bg hover:text-danger"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
            <p className="mt-6 text-sm text-ink-muted">{t('wishlist.savedNote')}</p>
          </>
        )}
      </div>
    </>
  );
}
