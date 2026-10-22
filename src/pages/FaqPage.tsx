import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquareText, Phone } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { LotusMark } from '@/components/ui/LotusMark';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { SocialLinks } from '@/components/layout/SocialLinks';
import { FAQS } from '@/data/faqs';
import { SITE } from '@/config/site';

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqPage() {
  const { t, L } = useLang();
  usePageMeta(t('faq.title'), t('faq.lead'));

  const items = useMemo(() => FAQS.map((f) => ({ id: f.id, title: L(f.q), content: L(f.a) })), [L]);

  return (
    <>
      {/* ───────────── Hero with search ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF2F8] via-ivory to-[#FDF1E4]" aria-labelledby="faq-title">
        <motion.div
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-plum-200/50 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-jaggery-100 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        {/* floating question marks */}
        {[
          { cls: 'left-[8%] top-[30%] h-10 w-10', d: 0 },
          { cls: 'right-[10%] top-[22%] h-14 w-14', d: 1.5 },
          { cls: 'right-[22%] bottom-[14%] h-8 w-8', d: 0.8 },
        ].map((f, i) => (
          <motion.span
            key={i}
            className={`pointer-events-none absolute hidden text-plum-200 md:block ${f.cls}`}
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: f.d }}
            aria-hidden
          >
            <HelpCircle className="h-full w-full" />
          </motion.span>
        ))}

        <div className="container-site relative pb-14 pt-8 sm:pb-16 sm:pt-10">
          <Breadcrumbs items={[{ label: t('common.home'), to: '/' }, { label: t('nav.faqs') }]} />
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="mx-auto mt-8 max-w-3xl text-center">
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
              className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white/80 px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm backdrop-blur"
            >
              <LotusMark className="h-4 w-4 text-plum-500" />
              {t('faq.eyebrow')}
            </motion.p>
            <motion.h1
              id="faq-title"
              variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="mt-5 font-display text-[clamp(2.1rem,1.5rem+2.6vw,3.6rem)] font-semibold leading-tight text-plum-950"
            >
              {t('faq.title')}
            </motion.h1>
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease } } }}
              className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
              aria-hidden
            />
            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }} className="mt-5 text-lg leading-relaxed text-ink-muted">
              {t('faq.lead')}
            </motion.p>

          </motion.div>
        </div>
      </section>

      {/* ───────────── Questions + help card ───────────── */}
      <section className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.6fr_1fr] lg:items-start">
        <div className="min-w-0">
          <Reveal>
            <Accordion items={items} headingLevel={2} />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-28">
          <aside className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-plum-700 via-plum-800 to-plum-950 p-7 text-white shadow-lift sm:p-8">
            <LotusMark className="pointer-events-none absolute -bottom-12 -right-12 h-48 w-48 text-white/10" />
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <MessageSquareText className="h-7 w-7" aria-hidden />
            </span>
            <h2 className="mt-5 font-display text-2xl font-semibold">{t('faq.still')}</h2>
            <p className="mt-2 text-plum-100">{t('faq.stillText')}</p>
            <div className="relative mt-6 flex flex-col gap-3">
              <ButtonAnchor href={`tel:${SITE.phoneE164}`} variant="light" icon={<Phone className="h-4 w-4" aria-hidden />}>
                {SITE.phoneDisplay}
              </ButtonAnchor>
              <ButtonLink to="/contact" variant="outline-light">
                {t('faq.contactUs')}
              </ButtonLink>
            </div>
            <div className="relative mt-6 border-t border-white/15 pt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-plum-200">{t('contact.follow')}</p>
              <SocialLinks tone="dark" />
            </div>
          </aside>
        </Reveal>
      </section>
    </>
  );
}