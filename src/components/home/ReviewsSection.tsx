import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, PenLine, Quote, Star } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { REVIEWS, type Review } from '@/data/reviews';
import { SITE } from '@/config/site';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink, Button } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Overlay } from '@/components/ui/Overlay';
import { TextArea, TextField } from '@/components/ui/Field';
import { formatDate } from '@/utils/format';

const AVATAR_GRADIENTS = ['from-plum-500 to-plum-700', 'from-jaggery-500 to-jaggery-700', 'from-rose-400 to-rose-600', 'from-emerald-500 to-emerald-700', 'from-amber-400 to-orange-600'];
const initials = (name: string) => name.split(' ').slice(-1)[0].slice(0, 1).toUpperCase();

function Stars({ value, size = 'h-4 w-4' }: { value: number; size?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" aria-hidden>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} className={size} fill={n <= value ? 'currentColor' : 'none'} strokeWidth={n <= value ? 0 : 1.5} />
      ))}
    </span>
  );
}

function ReviewCard({ review, index, large }: { review: Review; index: number; large?: boolean }) {
  const { t, L, lang } = useLang();
  return (
    <motion.article
      whileHover={{ y: -4 }}
      className={`relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-[0_2px_6px_rgba(58,16,53,.04),0_18px_40px_-28px_rgba(58,16,53,.35)] sm:p-6 ${large ? 'lg:p-8' : ''}`}
    >
      <Quote className="absolute right-5 top-5 h-8 w-8 text-plum-100" aria-hidden />
      <div className="flex flex-wrap items-center gap-2 pr-10">
        <Stars value={review.rating} />
        <span className="text-xs font-semibold text-ink-muted">
          ({review.rating}/5)
          <span className="sr-only"> {t('reviews.ratingOf', { n: review.rating })}</span>
        </span>
        <span className="ml-auto text-xs text-ink-soft">{formatDate(review.date, lang)}</span>
      </div>
      <p className={`mt-4 flex-1 leading-relaxed text-ink ${large ? 'text-[1.02rem] lg:text-lg' : 'text-[0.95rem]'}`}>{L(review.text)}</p>
      <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-base font-bold text-white ring-2 ring-white ${AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length]}`} aria-hidden>
          {initials(review.name)}
        </span>
        <div className="min-w-0">
          <p className="truncate font-semibold text-plum-950">{review.name}</p>
          <p className="truncate text-xs text-ink-muted">
            {review.role ? `${L(review.role)}, ` : ''}
            {L(review.city)}
          </p>
        </div>
      </div>
    </motion.article>
  );
}
export function WriteReview({ open, onClose }: { open: boolean; onClose: () => void }) {

  const { t } = useLang();
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!rating) er.rating = t('reviews.errRating');
    if (name.trim().length < 2) er.name = t('checkout.errName');
    if (text.trim().length < 20) er.text = t('reviews.errText');
    setErrors(er);
    if (!Object.keys(er).length) setDone(true); // DEMO: POST /api/reviews (moderated) in backend phase
  };

  return (
    <Overlay
      open={open}
      onClose={() => {
        onClose();
        setDone(false);
      }}
      title={t('reviews.write')}
    >
      <div className="p-5 sm:p-6">
        {done ? (
          <DemoNotice title={t('enquiry.demoTitle')}>{t('reviews.demoDone')}</DemoNotice>
        ) : (
          <form noValidate onSubmit={submit} className="space-y-5">
            <fieldset>
              <legend className="field-label">{t('reviews.rating')} <span className="text-danger" aria-hidden>*</span></legend>
              <div className="flex gap-1" role="radiogroup" aria-describedby={errors.rating ? 'rating-err' : undefined}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={rating === n}
                    aria-label={t('reviews.ratingOf', { n })}
                    onClick={() => setRating(n)}
                    className="grid h-11 w-11 place-items-center rounded-full text-amber-400 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
                  >
                    <Star className="h-7 w-7" fill={n <= rating ? 'currentColor' : 'none'} strokeWidth={1.5} aria-hidden />
                  </button>
                ))}
              </div>
              {errors.rating && <p id="rating-err" className="field-error">{errors.rating}</p>}
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <TextField label={t('reviews.yourName')} name="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} autoComplete="name" />
              <TextField label={t('reviews.yourCity')} name="city" optional value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
            </div>
            <TextArea label={t('reviews.yourReview')} name="text" value={text} onChange={(e) => setText(e.target.value)} error={errors.text} />
            <Button type="submit" full size="lg">
              {t('reviews.submit')}
            </Button>
          </form>
        )}
      </div>
    </Overlay>
  );
}

export function ReviewsSection() {
  const { t } = useLang();
  const [writing, setWriting] = useState(false);
  // Sample (layout) reviews show only while SITE.demoMode is true; real reviews always show.
  const reviews = REVIEWS.filter((r) => !r.isSample || SITE.demoMode);
  const hasReviews = reviews.length > 0;
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : '0';
  const [first, ...rest] = reviews;

  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-ivory via-[#FFF4E6] to-ivory" aria-labelledby="reviews-title">
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-jaggery-100/70 blur-3xl" aria-hidden />
      <div className="container-site relative">
        <div className="grid items-end gap-8 lg:grid-cols-2">
          <Reveal>
            <h2 id="reviews-title" className="max-w-md font-display text-display-md font-semibold text-plum-900">
              {t('reviews.title')}
            </h2>
            <p className="mt-3 max-w-md text-ink-muted">{t('reviews.lead')}</p>
          </Reveal>
          <Reveal delay={0.1} className="lg:justify-self-end">
            {hasReviews && (
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {reviews.slice(0, 5).map((r, i) => (
                  <span key={r.id} className={`grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ring-[3px] ring-white ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]}`} aria-hidden>
                    {initials(r.name)}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Stars value={Math.round(Number(avg))} />
                  <span className="font-bold text-plum-950">{avg}</span>
                </div>
                <p className="text-sm text-ink-muted">{t('reviews.avg', { avg })}</p>
              </div>
            </div>
            )}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/shop" size="lg" className="!bg-gradient-to-r !from-amber-400 !to-[#F59E0B] !text-plum-950 !shadow-[0_12px_24px_-14px_rgba(245,158,11,.9)] hover:!from-amber-300 hover:!to-amber-500" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                {t('reviews.shop')}
              </ButtonLink>
              <Button size="lg" variant="secondary" onClick={() => setWriting(true)} icon={<PenLine className="h-4 w-4" aria-hidden />} aria-haspopup="dialog">
                {t('reviews.write')}
              </Button>
            </div>
          </Reveal>
        </div>

        {!hasReviews && (
          <Reveal className="mt-10 flex flex-col items-center rounded-3xl border border-dashed border-plum-200 bg-white/80 px-6 py-12 text-center shadow-card">
            <span className="flex gap-1 text-amber-400" aria-hidden>
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} className="h-7 w-7" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <h3 className="mt-4 font-display text-2xl font-semibold text-plum-900">{t('reviews.emptyTitle')}</h3>
            <p className="mt-2 max-w-lg text-ink-muted">{t('reviews.emptyText')}</p>
            <Button className="mt-6" onClick={() => setWriting(true)} icon={<PenLine className="h-4 w-4" aria-hidden />} aria-haspopup="dialog">
              {t('reviews.write')}
            </Button>
          </Reveal>
        )}

        {first && (
          <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-[1.4fr_1fr_1fr] lg:grid-rows-2 lg:gap-5">
            <Reveal as="li" className="w-[85%] shrink-0 snap-center md:w-auto lg:row-span-2">
              <ReviewCard review={first} index={0} large />
            </Reveal>
            {rest.slice(0, 4).map((r, i) => (
              <Reveal as="li" key={r.id} delay={(i + 1) * 0.07} className="w-[85%] shrink-0 snap-center md:w-auto">
                <ReviewCard review={r} index={i + 1} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
      <WriteReview open={writing} onClose={() => setWriting(false)} />
    </section>
  );
}