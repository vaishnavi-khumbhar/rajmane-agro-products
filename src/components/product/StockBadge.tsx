import { useLang } from '@/context/LanguageContext';
import type { Product } from '@/data/types';

export function StockBadge({ product }: { product: Product }) {
  const { t } = useLang();
  if (product.status === 'discontinued') return <span className="chip bg-ivory-200 text-ink-muted">{t('product.discontinued')}</span>;
  const map = {
    in_stock: ['bg-success-bg text-success', 'product.inStock'],
    low_stock: ['bg-warn-bg text-warn', 'product.lowStock'],
    out_of_stock: ['bg-danger-bg text-danger', 'product.outOfStock'],
  } as const;
  const [cls, key] = map[product.stock];
  return (
    <span className={`chip ${cls}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {t(key)}
    </span>
  );
}
