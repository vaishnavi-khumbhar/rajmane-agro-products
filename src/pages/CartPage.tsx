import { ArrowLeft, ArrowRight, ShoppingBag, Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { ButtonLink, Button } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { CartLineItem } from '@/components/product/CartLineItem';
import { OrderSummary } from '@/components/product/OrderSummary';

export default function CartPage() {
  const { t } = useLang();
  const { lines, subtotal, count, clear } = useCart();
  const { notify } = useToast();
  usePageMeta(t('cart.title'));

  return (
    <>
      <PageHeader title={t('cart.title')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.cart') }]} lead={count ? t(count === 1 ? 'cart.itemOne' : 'cart.items', { count }) : undefined} />
      <div className="container-site py-10 sm:py-14">
        {lines.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center gap-4 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-plum-50 text-plum-700">
              <ShoppingBag className="h-10 w-10" aria-hidden />
            </span>
            <h2 className="font-display text-2xl font-semibold text-plum-900">{t('cart.empty')}</h2>
            <p className="text-ink-muted">{t('cart.emptyText')}</p>
            <ButtonLink to="/shop" size="lg">
              {t('cart.startShopping')}
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="min-w-0">
              <ul className="divide-y divide-line rounded-xl3 border border-line bg-white px-5 shadow-card sm:px-6">
                <AnimatePresence initial={false}>
                  {lines.map((line) => (
                    <motion.li key={line.product.id} layout exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                      <div className="py-6">
                        <CartLineItem line={line} size="md" />
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <ButtonLink to="/shop" variant="ghost" icon={<ArrowLeft className="h-4 w-4" aria-hidden />}>
                  {t('cart.continueShopping')}
                </ButtonLink>
                <Button
                  variant="ghost"
                  className="!text-danger hover:!bg-danger-bg"
                  icon={<Trash2 className="h-4 w-4" aria-hidden />}
                  onClick={() => {
                    clear();
                    notify(t('cart.cleared'), { tone: 'info' });
                  }}
                >
                  {t('cart.clear')}
                </Button>
              </div>
              <p className="mt-3 text-sm text-ink-muted">{t('cart.savedNote')}</p>
            </div>
            <div className="space-y-4">
              <OrderSummary lines={lines} subtotal={subtotal}>
                <ButtonLink to="/checkout" full size="lg" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                  {t('cart.checkout')}
                </ButtonLink>
              </OrderSummary>
              <DemoNotice>{t('common.demoBanner')}</DemoNotice>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
