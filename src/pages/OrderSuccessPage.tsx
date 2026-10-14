import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, PackageSearch, Phone } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Logo } from '@/components/layout/Logo';
import { findDemoOrder } from '@/utils/demoStore';
import { formatDate } from '@/utils/format';
import { SITE } from '@/config/site';

export default function OrderSuccessPage() {
  const { t, money, lang } = useLang();
  const [params] = useSearchParams();
  const number = params.get('order') ?? '';
  const order = number ? findDemoOrder(number) : undefined;
  usePageMeta(t('order.successTitle'));

  return (
    <section className="container-site flex justify-center py-14 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-2xl p-6 text-center sm:p-10">
        <Logo className="mx-auto h-12" linked={false} />
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
          className="mx-auto mt-6 grid h-20 w-20 place-items-center rounded-full bg-success-bg text-success"
        >
          <CheckCircle2 className="h-10 w-10" aria-hidden />
        </motion.span>
        <h1 className="mt-5 font-display text-display-md font-medium text-plum-900" role="status">
          {t('order.successTitle')}
        </h1>
        {order ? (
          <>
            <p className="mt-3 text-ink-muted">{t('order.successText', { number: order.number })}</p>
            <dl className="mt-8 grid gap-4 rounded-xl2 bg-ivory-100 p-5 text-left sm:grid-cols-2">
              <div>
                <dt className="text-sm text-ink-muted">{t('order.orderNumber')}</dt>
                <dd className="font-mono text-lg font-semibold text-plum-900">{order.number}</dd>
              </div>
              <div>
                <dt className="text-sm text-ink-muted">{t('order.placedOn')}</dt>
                <dd className="font-semibold">{formatDate(order.createdAt, lang)}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm text-ink-muted">{t('order.items')}</dt>
                <dd>
                  <ul className="mt-1 space-y-1">
                    {order.items.map((i) => (
                      <li key={i.productId} className="flex justify-between gap-3">
                        <span>
                          {i.name} × {i.qty}
                        </span>
                        <span className="tabular-nums">{money(i.unitPrice * i.qty)}</span>
                      </li>
                    ))}
                    <li className="flex justify-between gap-3 border-t border-line pt-2 font-semibold">
                      <span>{t('cart.subtotal')}</span>
                      <span className="tabular-nums">{money(order.subtotal)}</span>
                    </li>
                  </ul>
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="mt-3 text-ink-muted">{t('order.noOrder')}</p>
        )}
        <DemoNotice className="mt-6 text-left">{t('order.callToOrder')}</DemoNotice>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {order && (
            <ButtonLink to={`/track-order?order=${encodeURIComponent(order.number)}`} icon={<PackageSearch className="h-4 w-4" aria-hidden />}>
              {t('order.trackThis')}
            </ButtonLink>
          )}
          <ButtonAnchor href={`tel:${SITE.phoneE164}`} variant="secondary" icon={<Phone className="h-4 w-4" aria-hidden />}>
            {SITE.phoneDisplay}
          </ButtonAnchor>
          <ButtonLink to="/shop" variant="ghost">
            {t('order.keepShopping')}
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}
