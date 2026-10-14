import type { ReactNode } from 'react';
import { Img } from '@/components/ui/Img';
import { useLang } from '@/context/LanguageContext';
import type { ResolvedLine } from '@/utils/cart';

/** Totals panel shared by Cart and Checkout. Shipping is not invented — shown as "calculated at launch". */
export function OrderSummary({ lines, subtotal, showItems, children }: { lines: ResolvedLine[]; subtotal: number; showItems?: boolean; children?: ReactNode }) {
  const { t, L, money } = useLang();
  return (
    <section aria-labelledby="summary-title" className="card p-6 lg:sticky lg:top-28">
      <h2 id="summary-title" className="font-display text-2xl font-semibold text-plum-900">
        {t('cart.summary')}
      </h2>
      {showItems && (
        <ul className="mt-5 space-y-4 border-b border-line pb-5">
          {lines.map((l) => (
            <li key={l.product.id} className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-ivory-200">
                <Img image={l.product.images[0]} alt="" sizes="56px" className="h-full w-full object-cover" />
                <span className="absolute -right-1 -top-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-plum-700 px-1 text-[0.7rem] font-bold text-white">{l.qty}</span>
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold">{L(l.product.name)}</span>
              <span className="text-sm font-semibold tabular-nums">{money(l.lineTotal)}</span>
            </li>
          ))}
        </ul>
      )}
      <dl className="mt-5 space-y-3 text-[0.95rem]">
        <div className="flex justify-between">
          <dt className="text-ink-muted">{t('cart.subtotal')}</dt>
          <dd className="font-semibold tabular-nums">{money(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-muted">{t('cart.shipping')}</dt>
          <dd className="text-right font-medium text-ink-muted">{t('cart.shippingTbc')}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="font-semibold">{t('cart.total')}</dt>
          <dd className="font-display text-3xl font-semibold tabular-nums text-plum-900">{money(subtotal)}</dd>
        </div>
      </dl>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-warn">{t('common.demoPrice')}</p>
      {children && <div className="mt-6">{children}</div>}
    </section>
  );
}
