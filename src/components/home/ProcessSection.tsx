import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Play } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';
import { LotusMark } from '@/components/ui/LotusMark';
import { useLang } from '@/context/LanguageContext';
import { PROCESS_REELS, reelEmbedUrl, reelUrl, type Reel } from '@/config/reels';
import type { TKey } from '@/i18n';

const STEPS: { title: TKey; text: TKey }[] = [
  { title: 'process.s1', text: 'process.s1d' },
  { title: 'process.s2', text: 'process.s2d' },
  { title: 'process.s3', text: 'process.s3d' },
  { title: 'process.s4', text: 'process.s4d' },
  { title: 'process.s5', text: 'process.s5d' },
];

/**
 * Reel card: shows a poster + play button first (fast page load, no Instagram tracking until clicked),
 * then swaps in Instagram's official embed player.
 */
function ReelCard({ reel, index }: { reel: Reel; index: number }) {
  const { t } = useLang();
  const [play, setPlay] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.5rem] bg-plum-950 shadow-lift ring-1 ring-black/5">
        {play ? (
          <iframe
            src={reelEmbedUrl(reel.id)}
            title={t('process.reelLabel', { n: index + 1 })}
            className="absolute inset-0 h-full w-full border-0 bg-white"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-plum-400"
            aria-label={`${t('process.watch')} — ${t('process.reelLabel', { n: index + 1 })}`}
          >
            <Img image={reel.poster} alt="" sizes="(min-width: 1024px) 280px, 50vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 bg-gradient-to-t from-plum-950/85 via-plum-950/20 to-plum-950/30" aria-hidden />
            <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-plum-900 backdrop-blur">
              <Instagram className="h-3.5 w-3.5 text-[#DD2A7B]" aria-hidden />
              Reel
            </span>
            <motion.span
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white shadow-xl"
              whileHover={{ scale: 1.08 }}
              aria-hidden
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/30 motion-reduce:hidden" />
              <Play className="relative ml-1 h-7 w-7" fill="currentColor" />
            </motion.span>
            <span className="absolute inset-x-4 bottom-4 text-left text-sm font-semibold text-white">{t('process.watch')}</span>
          </button>
        )}
      </div>
      <a
        href={reelUrl(reel.id)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-plum-700 hover:text-plum-900 hover:underline"
      >
        <Instagram className="h-4 w-4" aria-hidden />
        {t('process.openInsta')}
      </a>
    </div>
  );
}

export function ProcessSection() {
  const { t } = useLang();
  return (
    <section className="section bg-gradient-to-b from-[#FBF2F8] to-ivory" aria-labelledby="process-title">
      <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">
              <LotusMark className="h-4 w-4" />
              {t('process.eyebrow')}
            </p>
            <h2 id="process-title" className="mt-3 font-display text-display-md font-semibold text-plum-900">
              {t('process.title')}
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-muted">{t('process.lead')}</p>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-ink-muted">{t('process.lead2')}</p>
          </Reveal>
          <ol className="mt-8 space-y-5">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="flex gap-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-plum-100 text-sm font-bold text-plum-800 ring-4 ring-plum-50">{i + 1}</span>
                <div>
                  <h3 className="font-sans text-base font-bold text-plum-900">{t(s.title)}</h3>
                  <p className="mt-0.5 text-[0.92rem] leading-relaxed text-ink-muted">{t(s.text)}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1} className="mx-auto grid w-full max-w-[560px] grid-cols-2 gap-4 sm:gap-6">
          {PROCESS_REELS.map((r, i) => (
            <div key={r.id} className={i % 2 === 1 ? 'sm:mt-10' : ''}>
              <ReelCard reel={r} index={i} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}