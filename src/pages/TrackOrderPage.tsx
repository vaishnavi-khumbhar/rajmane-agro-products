import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Circle, PackageSearch, SearchX } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { findDemoOrder } from '@/utils/demoStore';
import { isIndianMobile } from '@/utils/validation';
import { formatDate } from '@/utils/format';
import type { DemoOrder } from '@/data/types';
import type { TKey } from '@/i18n';

const STEPS: TKey[] = ['track.s1', 'track.s2', 'track.s3', 'track.s4', 'track.s5'];

export default function TrackOrderPage() {
  const { t, money, lang } = useLang();
  const [params] = useSearchParams();
  const [number, setNumber] = useState(params.get('order') ?? '');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{ number?: string; phone?: string }>({});
  const [result, setResult] = useState<DemoOrder | null | undefined>(undefined);
  usePageMeta(t('track.title'), t('track.lead'));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!number.trim()) errs.number = t('track.errOrder');
    if (!isIndianMobile(phone)) errs.phone = t('checkout.errPhone');
    setErrors(errs);
    if (Object.keys(errs).length) return;
    // Requires BOTH order number and phone so one customer cannot look up another's order.
    setResult(findDemoOrder(number, phone) ?? null);
  };

  return (
    <>
      <PageHeader title={t('track.title')} lead={t('track.lead')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.track') }]} />
      <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <form noValidate onSubmit={onSubmit} className="card space-y-5 p-6 sm:p-8">
            <TextField label={t('track.orderNumber')} name="order" value={number} onChange={(e) => setNumber(e.target.value)} hint={t('track.orderNumberHint')} error={errors.number} autoComplete="off" />
            <TextField label={t('track.phone')} name="phone" type="tel" inputMode="numeric" maxLength={14} value={phone} onChange={(e) => setPhone(e.target.value)} error={errors.phone} autoComplete="tel-national" />
            <Button type="submit" full size="lg" icon={<PackageSearch className="h-5 w-5" aria-hidden />}>
              {t('track.submit')}
            </Button>
          </form>
          <DemoNotice className="mt-5">{t('track.demoNote')}</DemoNotice>
        </div>
        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {result === null && (
              <motion.div key="nf" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center rounded-xl3 border border-dashed border-plum-200 bg-white p-10 text-center">
                <SearchX className="h-12 w-12 text-plum-400" aria-hidden />
                <p className="mt-4 font-semibold text-ink">{t('track.notFound')}</p>
              </motion.div>
            )}
            {result && (
              <motion.div key={result.number} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-ink-muted">{t('order.orderNumber')}</p>
                    <p className="font-mono text-xl font-semibold text-plum-900">{result.number}</p>
                  </div>
                  <span className="chip bg-warn-bg text-warn">{t('common.demoBadge')}</span>
                </div>
                <p className="mt-2 text-sm text-ink-muted">
                  {t('order.placedOn')}: {formatDate(result.createdAt, lang)} · {money(result.subtotal)}
                </p>
                <h2 className="mt-8 font-display text-xl font-semibold text-plum-900">{t('track.timeline')}</h2>
                <ol className="mt-5 space-y-0">
                  {STEPS.map((step, i) => {
                    const done = i === 0;
                    return (
                      <li key={step} className="relative flex gap-4 pb-6 last:pb-0">
                        {i < STEPS.length - 1 && <span className={`absolute left-[15px] top-8 h-[calc(100%-2rem)] w-0.5 ${done ? 'bg-plum-600' : 'bg-line'}`} aria-hidden />}
                        <span className={`relative grid h-8 w-8 shrink-0 place-items-center rounded-full ${done ? 'bg-plum-700 text-white' : 'border-2 border-line bg-white text-ink-soft'}`}>
                          {done ? <Check className="h-4 w-4" aria-hidden /> : <Circle className="h-2.5 w-2.5" aria-hidden />}
                        </span>
                        <div className="pt-1">
                          <p className={`font-semibold ${done ? 'text-ink' : 'text-ink-muted'}`}>{t(step)}</p>
                          <p className="text-sm text-ink-muted">{done ? t('track.doneStep') : t('track.pendingStep')}</p>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
