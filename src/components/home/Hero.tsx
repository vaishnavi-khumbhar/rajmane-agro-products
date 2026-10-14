import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { BANNER_RATIO, HERO_BANNERS } from '@/config/banners';

const INTERVAL = 3000; // 2 seconds per banner

/** Banner-only hero slider (client artwork), Sai-Jeevan-style: rounded banner, dots underneath. */
export function Hero() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const [hover, setHover] = useState(false);
  const total = HERO_BANNERS.length;
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number, d = 1) => setState([(i + total) % total, d]), [total]);
  // Auto-advances always (fade when the OS asks for reduced motion). Hover pauses only on devices with a real
  // mouse; the visible pause button covers WCAG 2.2.2. Clicking dots/arrows never stops autoplay.
  const running = !hover && total > 1;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => go(index + 1, 1), INTERVAL);
    return () => window.clearTimeout(id);
  }, [running, index, go]);

  const banner = HERO_BANNERS[index];

  return (
    <section className="bg-white pb-4 sm:pb-8 sm:pt-6" aria-roledescription="carousel" aria-label={t('hero.label')}>
      <h1 className="sr-only">
        {t('common.brand')} — {t('home.heroTitle')}
      </h1>
      {/* Mobile: full-bleed banner like an app. Desktop: wider than the content column (up to 1440px). */}
      <div className="mx-auto w-full max-w-[1440px] sm:px-6 lg:px-8">
        <div
          className="group relative overflow-hidden bg-ivory-200 sm:rounded-[1.75rem] sm:shadow-[0_24px_60px_-34px_rgba(58,16,53,.6)] sm:ring-1 sm:ring-black/5"
          style={{ aspectRatio: BANNER_RATIO }}
          onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
          onPointerLeave={() => setHover(false)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(index + 1, 1);
            if (e.key === 'ArrowLeft') go(index - 1, -1);
          }}
        >
          <AnimatePresence initial={false} custom={dir} mode="popLayout">
            <motion.div
              key={banner.id}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { x: `${dir * 100}%` }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: `${dir * -100}%` }}
              transition={{ duration: reduce ? 0.4 : 0.6, ease: [0.65, 0, 0.35, 1] }}
              className="absolute inset-0"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${total}`}
            >
              <Link to={banner.href} className="block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-plum-600">
                <picture>
                  {banner.mobile && <source media="(max-width: 639px)" srcSet={banner.mobile} />}
                  <img
                    src={banner.desktop}
                    srcSet={`${banner.desktopSm} 1000w, ${banner.desktop} 2172w`}
                    sizes="(min-width: 1440px) 1380px, 100vw"
                    width={2172}
                    height={724}
                    alt={banner.alt}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </Link>
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                type="button"
                onClick={() => go(index - 1, -1)}
                aria-label={t('hero.prev')}
                className="absolute left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-plum-900 opacity-0 shadow-lift backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 group-hover:opacity-100 sm:grid"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1, 1)}
                aria-label={t('hero.next')}
                className="absolute right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-plum-900 opacity-0 shadow-lift backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 group-hover:opacity-100 sm:grid"
              >
                <ChevronRight className="h-5 w-5" aria-hidden />
              </button>
            </>
          )}
        </div>

        {total > 1 && (
          <div className="mt-2 flex items-center justify-center gap-1 sm:mt-3">
            {HERO_BANNERS.map((b, i) => (
              <button
                key={b.id}
                type="button"
                onClick={() => go(i, i > index ? 1 : -1)}
                aria-label={t('hero.goTo', { n: i + 1 })}
                aria-current={i === index ? 'true' : undefined}
                className="group/dot grid h-8 place-items-center px-1 focus-visible:outline-none"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 group-focus-visible/dot:ring-2 group-focus-visible/dot:ring-plum-700 group-focus-visible/dot:ring-offset-2 ${
                    i === index ? 'w-6 bg-plum-700' : 'w-2 bg-plum-200 group-hover/dot:bg-plum-400'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}