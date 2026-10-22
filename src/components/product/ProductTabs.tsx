import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FileText, ListChecks, MessageSquareText, PenLine, Quote, Star } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { REVIEWS } from '@/data/reviews';
import { SITE } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { WriteReview } from '@/components/home/ReviewsSection';
import { formatDate } from '@/utils/format';

type Tab = 'desc' | 'specs' | 'reviews';
const AVATARS = ['from-plum-500 to-plum-700', 'from-jaggery-500 to-jaggery-700', 'from-rose-400 to-rose-600', 'from-emerald-500 to-emerald-700', 'from-amber-400 to-orange-600'];

interface Props {
  description: string;
  specs: [string, string][];
}

export function ProductTabs({ description, specs }: Props) {
  const { t, L, lang } = useLang();
  const uid = useId();
  const [tab, setTab] = useState<Tab>('desc');
  const [writeOpen, setWriteOpen] = useState(false);
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ desc: null, specs: null, reviews: null });

  // Sample (layout) reviews show only while SITE.demoMode is true.
  const reviews = REVIEWS.filter((r) => !r.isSample || SITE.demoMode);

  const tabs: { key: Tab; label: string; count?: number; Icon: typeof FileText }[] = [
    { key: 'desc', label: t('product.description'), Icon: FileText },
    { key: 'specs', label: t('product.specifications'), count: specs.length, Icon: ListChecks },
    { key: 'reviews', label: t('product.reviews'), count: reviews.length || undefined, Icon: MessageSquareText },
  ];

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((x) => x.key === tab);
    let n = i;
    if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
    else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = tabs.length - 1;
    else return;
    e.preventDefault();
    const next = tabs[n].key;
    setTab(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="mt-10">
      <div role="tablist" aria-label={t('product.detailsTabs')} onKeyDown={onKey} className="-mx-1 flex gap-1 overflow-x-auto border-b border-line px-1">
        {tabs.map(({ key, label, count, Icon }) => {
          const active = tab === key;
          return (
            <button
              key={key}
              ref={(el) => (refs.current[key] = el)}
              id={`${uid}-tab-${key}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`${uid}-panel-${key}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setTab(key)}
              className={`relative inline-flex min-h-[48px] shrink-0 items-center gap-2 rounded-t-xl px-3 text-[0.95rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700 sm:px-4 ${
                active ? 'text-plum-800' : 'text-ink-muted hover:bg-plum-50/70 hover:text-plum-800'
              }`}
            >
              <Icon className="hidden h-4 w-4 sm:block" aria-hidden />
              {label}
              {count !== undefined && (
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${active ? 'bg-plum-700 text-white' : 'bg-plum-50 text-plum-700'}`}>{count}</span>
              )}
              {active && (
                <motion.span
                  layoutId={`${uid}-underline`}
                  className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-gradient-to-r from-plum-700 via-plum-500 to-jaggery-500"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={tab}
          id={`${uid}-panel-${tab}`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${tab}`}
          tabIndex={0}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pt-6 focus-visible:outline-none"
        >
          {tab === 'desc' && (
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-plum-50/80 via-white to-[#FDF1E4] p-5 ring-1 ring-plum-100 sm:p-6">
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-plum-600 to-jaggery-500" aria-hidden />
              <p className="text-[1.02rem] leading-relaxed text-ink">{description}</p>
            </div>
          )}

          {tab === 'specs' && (
            <dl className="overflow-hidden rounded-2xl border border-line bg-white">
              {specs.map(([k, v], i) => (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`grid grid-cols-[minmax(7rem,40%)_1fr] gap-4 px-4 py-3.5 text-[0.95rem] sm:px-5 ${i % 2 ? 'bg-white' : 'bg-plum-50/50'}`}
                >
                  <dt className="font-semibold text-ink-muted">{k}</dt>
                  <dd className="min-w-0 font-medium text-ink [overflow-wrap:anywhere]">{v}</dd>
                </motion.div>
              ))}
            </dl>
          )}

          {tab === 'reviews' && (
            <div>
              {reviews.length ? (
                <ul className="space-y-4">
                  {reviews.map((r, i) => (
                    <motion.li
                      key={r.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="relative rounded-2xl border border-line bg-white p-5"
                    >
                      <Quote className="absolute right-4 top-4 h-7 w-7 text-plum-100" aria-hidden />
                      <div className="flex items-center gap-3 pr-10">
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br font-bold text-white ${AVATARS[i % AVATARS.length]}`} aria-hidden>
                          {r.name.split(' ').slice(-1)[0].slice(0, 1).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-plum-950">{r.name}</p>
                          <p className="truncate text-xs text-ink-muted">
                            {L(r.city)} · {formatDate(r.date, lang)}
                          </p>
                        </div>
                      </div>
                      <span className="mt-3 flex gap-0.5 text-amber-400" aria-hidden>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className="h-4 w-4" fill={n <= r.rating ? 'currentColor' : 'none'} strokeWidth={n <= r.rating ? 0 : 1.5} />
                        ))}
                      </span>
                      <span className="sr-only">{t('reviews.ratingOf', { n: r.rating })}</span>
                      <p className="mt-2 leading-relaxed text-ink">{L(r.text)}</p>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center rounded-2xl border border-dashed border-plum-200 bg-white px-6 py-10 text-center">
                  <MessageSquareText className="h-10 w-10 text-plum-300" aria-hidden />
                  <p className="mt-3 font-semibold text-ink">{t('reviews.emptyTitle')}</p>
                  <p className="mt-1 max-w-sm text-sm text-ink-muted">{t('reviews.emptyText')}</p>
                </div>
              )}
              <div className="mt-5 flex justify-center">
                <Button variant="secondary" onClick={() => setWriteOpen(true)} icon={<PenLine className="h-4 w-4" aria-hidden />}>
                  {t('reviews.write')}
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <WriteReview open={writeOpen} onClose={() => setWriteOpen(false)} />
    </div>
  );
}