import { Minus, Plus } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { MAX_QTY } from '@/utils/cart';

interface Props {
  value: number;
  onChange: (v: number) => void;
  size?: 'sm' | 'md';
  label?: string;
}

export function QuantityStepper({ value, onChange, size = 'md', label }: Props) {
  const { t } = useLang();
  const h = size === 'sm' ? 'h-10' : 'h-12';
  const w = size === 'sm' ? 'w-10' : 'w-12';
  return (
    <div role="group" aria-label={label ?? t('product.quantity')} className={`inline-flex ${h} items-stretch overflow-hidden rounded-full border border-[#d9c7d3] bg-white`}>
      <button
        type="button"
        className={`${w} grid place-items-center text-plum-800 transition-colors hover:bg-plum-50 focus-visible:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700 disabled:opacity-40`}
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label={t('product.decrease')}
      >
        <Minus className="h-4 w-4" aria-hidden />
      </button>
      <output aria-live="polite" className="grid min-w-[2.5rem] place-items-center text-base font-semibold tabular-nums">
        {value}
      </output>
      <button
        type="button"
        className={`${w} grid place-items-center text-plum-800 transition-colors hover:bg-plum-50 focus-visible:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700 disabled:opacity-40`}
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QTY}
        aria-label={t('product.increase')}
      >
        <Plus className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
