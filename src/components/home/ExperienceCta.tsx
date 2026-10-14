import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui/Button';
import { LotusMark } from '@/components/ui/LotusMark';
import { useLang } from '@/context/LanguageContext';

/** Colourful animated call-to-action band (jaggery cubes + lotus motifs drifting gently). */
export function ExperienceCta() {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const floaters = [
    { cls: 'left-[6%] top-[18%] h-10 w-10 rotate-12', d: 0 },
    { cls: 'left-[16%] bottom-[14%] h-6 w-6 -rotate-6', d: 1.2 },
    { cls: 'right-[8%] top-[22%] h-12 w-12 -rotate-12', d: 0.6 },
    { cls: 'right-[18%] bottom-[12%] h-7 w-7 rotate-45', d: 1.8 },
    { cls: 'left-[42%] top-[8%] h-5 w-5 rotate-6', d: 2.4 },
  ];
  return (
    <section className="py-12 sm:py-16" aria-labelledby="exp-title">
      <div className="container-site">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="animate-gradient relative isolate overflow-hidden rounded-[2rem] bg-[linear-gradient(120deg,#571A50,#912B81,#BB4694,#C27A2C,#912B81,#571A50)] bg-[length:300%_300%] px-6 py-14 text-center text-white shadow-lift sm:px-12 sm:py-20"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,.18),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(232,190,132,.35),transparent_45%)]" aria-hidden />
          {floaters.map((f, i) => (
            <motion.span
              key={i}
              className={`pointer-events-none absolute rounded-md bg-gradient-to-br from-jaggery-300 to-jaggery-600 opacity-70 shadow-lg ${f.cls}`}
              animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: f.d }}
              aria-hidden
            />
          ))}
          <motion.span
            className="pointer-events-none absolute -bottom-10 -left-10 text-white/10"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            <LotusMark className="h-56 w-56" />
          </motion.span>
          <motion.span
            className="pointer-events-none absolute -right-12 -top-12 text-white/10"
            animate={reduce ? undefined : { rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          >
            <LotusMark className="h-72 w-72" />
          </motion.span>

          <div className="relative mx-auto max-w-2xl">
            <LotusMark className="mx-auto h-10 w-10 text-jaggery-300" />
            <h2 id="exp-title" className="mt-4 font-display text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-semibold leading-tight">
              {t('experience.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-white/90 sm:text-lg">{t('experience.lead')}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink to="/shop" size="lg" className="!bg-gradient-to-r !from-amber-300 !to-amber-500 !text-plum-950 !shadow-[0_14px_28px_-14px_rgba(0,0,0,.6)] hover:!from-amber-200 hover:!to-amber-400" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                {t('experience.start')}
              </ButtonLink>
              <ButtonLink to="/about" size="lg" variant="outline-light">
                {t('experience.story')}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
