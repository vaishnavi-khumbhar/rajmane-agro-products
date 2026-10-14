import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import type { ResolvedLine } from '@/utils/cart';

export function CartLineItem({ line, onNavigate, size = 'sm' }: { line: ResolvedLine; onNavigate?: () => void; size?: 'sm' | 'md' }) {
  const { t, L, money } = useLang();
  const { setQty, remove, add } = useCart();
  const { notify } = useToast();
  const name = L(line.product.name);
  const big = size === 'md';

  return (
    <div className="flex gap-4">
      <Link
        to={`/product/${line.product.slug}`}
        onClick={onNavigate}
        className={`${big ? 'h-20 w-20 sm:h-28 sm:w-28' : 'h-20 w-20'} shrink-0 overflow-hidden rounded-xl bg-ivory-200`}
        tabIndex={-1}
        aria-hidden
      >
        <Img image={line.product.images[0]} alt="" sizes="112px" className="h-full w-full object-cover" />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link to={`/product/${line.product.slug}`} onClick={onNavigate} className={`font-semibold text-ink hover:text-plum-700 ${big ? 'text-lg' : ''}`}>
              {name}
            </Link>
            <p className="text-sm text-ink-muted">
              {money(line.product.demoPrice)} {t('cart.each')} · <span className="text-warn">{t('common.demoPrice')}</span>
            </p>
          </div>
          <p className="shrink-0 font-semibold tabular-nums">{money(line.lineTotal)}</p>
        </div>
        <div className="flex items-center justify-between gap-2">
          <QuantityStepper size="sm" value={line.qty} onChange={(v) => setQty(line.product.id, v)} label={`${t('product.quantity')}: ${name}`} />
          <button
            type="button"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted hover:bg-danger-bg hover:text-danger focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger"
            onClick={() => {
              const qty = line.qty;
              remove(line.product.id);
              notify(t('cart.removed', { name }), { tone: 'info', action: { label: t('cart.undo'), onClick: () => add(line.product.id, qty) } });
            }}
            aria-label={t('cart.removeItem', { name })}
          >
            <Trash2 className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{t('cart.remove')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
