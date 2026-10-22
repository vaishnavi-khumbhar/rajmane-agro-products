import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Expand, Eye, Factory, PackageCheck, Phone, Quote, Repeat2, Store, Target } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';
import { Overlay } from '@/components/ui/Overlay';
import { LotusMark } from '@/components/ui/LotusMark';
import { ButtonLink } from '@/components/ui/Button';
import { ContactCta } from '@/components/home/ContactCta';
import type { ImageKey } from '@/config/assets';
import type { TKey } from '@/i18n';
import { CompanyDetails } from '@/components/about/CompanyDetails';

const ease = [0.22, 1, 0.36, 1] as const;

const FACILITY: { image: ImageKey; alt: string; span: string }[] = [
  { image: 'facility1', alt: 'Team members reviewing the jaggery boiling pan at the facility', span: 'col-span-2 row-span-2' },
  { image: 'facility4', alt: 'Stainless-steel processing equipment inside the facility', span: '' },
  { image: 'facility2', alt: 'Visitors outside the Rajmane Agro processing unit', span: '' },
  { image: 'facility6', alt: 'Processing line and boiling pans', span: 'col-span-2' },
  { image: 'facility3', alt: 'Team discussion beside the processing pan', span: '' },
  { image: 'facility5', alt: 'Team inspecting the facility grounds', span: 'row-span-2' },
  { image: 'facility7', alt: 'Processing equipment and storage tanks', span: '' },
];

const VALUES: { icon: typeof Factory; title: TKey; text: TKey; tint: string }[] = [
  { icon: Factory, title: 'home.b1', text: 'home.b1d', tint: 'from-[#FDF1E4] to-[#F8E1C8] text-[#8A4A12]' },
  { icon: PackageCheck, title: 'home.b2', text: 'home.b2d', tint: 'from-plum-50 to-plum-100 text-plum-700' },
  { icon: Repeat2, title: 'home.b3', text: 'home.b3d', tint: 'from-[#FFF6DD] to-[#FBE7B0] text-[#7A5300]' },
  { icon: Store, title: 'home.b4', text: 'home.b4d', tint: 'from-[#EAF6EE] to-[#D3EEDC] text-[#1F7A43]' },
];

const STEPS: { title: TKey; text: TKey }[] = [
  { title: 'process.s1', text: 'process.s1d' },
  { title: 'process.s2', text: 'process.s2d' },
  { title: 'process.s3', text: 'process.s3d' },
  { title: 'process.s4', text: 'process.s4d' },
  { title: 'process.s5', text: 'process.s5d' },
];

/** Gently floating wrapper (disabled automatically for reduced-motion users via MotionConfig). */
function Float({ children, className = '', delay = 0, y = 10 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  return (
    <motion.div className={className} animate={{ y: [0, -y, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay }}>
      {children}
    </motion.div>
  );
}

function ProcessTimeline() {
  const { t } = useLang();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <ol ref={ref} className="relative mt-10 space-y-6 pl-14 sm:pl-16">
      <span className="absolute bottom-3 left-[19px] top-3 w-0.5 rounded-full bg-plum-100 sm:left-[23px]" aria-hidden />
      <motion.span style={{ scaleY }} className="absolute bottom-3 left-[19px] top-3 w-0.5 origin-top rounded-full bg-gradient-to-b from-plum-600 to-jaggery-500 sm:left-[23px]" aria-hidden />
      {STEPS.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.05} className="relative">
          <span className="absolute -left-14 top-0 grid h-10 w-10 place-items-center rounded-full bg-white text-sm font-bold text-plum-800 shadow-card ring-4 ring-plum-100 sm:-left-16 sm:h-12 sm:w-12 sm:text-base">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
            <h3 className="font-display text-lg font-semibold text-plum-900 sm:text-xl">{t(s.title)}</h3>
            <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-muted">{t(s.text)}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  const { t } = useLang();
  const [zoom, setZoom] = useState<(typeof FACILITY)[number] | null>(null);
  usePageMeta(t('about.eyebrow'), t('home.story1'));

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF2F8] via-ivory to-[#FDF1E4]" aria-labelledby="about-title">
        <motion.div
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-plum-200/50 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -bottom-40 right-0 h-[28rem] w-[28rem] rounded-full bg-jaggery-100 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <div className="container-site relative grid items-center gap-12 pb-16 pt-8 sm:pt-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pb-24">
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}>
              <Breadcrumbs items={[{ label: t('common.home'), to: '/' }, { label: t('about.eyebrow') }]} />
            </motion.div>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white/80 px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm backdrop-blur"
            >
              <LotusMark className="h-4 w-4 text-plum-500" />
              {t('about.eyebrow')}
            </motion.p>
            <motion.h1
              id="about-title"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } }}
              className="mt-5 font-display text-[clamp(2.2rem,1.5rem+3vw,3.9rem)] font-semibold leading-[1.08] text-plum-950"
            >
              {t('about.title')}
            </motion.h1>
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease, delay: 0.2 } } }}
              className="mt-5 block h-1 w-24 origin-left rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
              aria-hidden
            />
            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted"
            >
              {t('home.story1')}
            </motion.p>
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink to="/shop" size="lg" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                {t('home.heroCta')}
              </ButtonLink>
              <ButtonLink to="/contact" size="lg" variant="secondary" icon={<Phone className="h-4 w-4" aria-hidden />}>
                {t('home.contactCta')}
              </ButtonLink>
            </motion.div>
          </motion.div>

          {/* Animated photo collage */}
          <div className="relative mx-auto w-full max-w-[520px] pb-10 pt-4 sm:pb-12">
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-plum-200/70"
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.15 }}
              className="relative mx-auto w-[78%] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] border-white bg-plum-100 shadow-lift"
            >
              <div className="aspect-[4/5]">
                <Img image="blockCane" alt="Rajmane jaggery blocks with fresh sugarcane" priority sizes="(min-width: 1024px) 400px, 78vw" className="h-full w-full object-cover" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.5 }} className="absolute bottom-2 left-0 w-[38%]">
              <Float delay={0.5}>
                <div className="overflow-hidden rounded-full border-[5px] border-white shadow-lift">
                  <div className="aspect-square">
                    <Img image="powderBowl" alt="" sizes="200px" className="h-full w-full object-cover" />
                  </div>
                </div>
              </Float>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease, delay: 0.7 }} className="absolute right-0 top-[12%] w-[34%]">
              <Float delay={1.2} y={8}>
                <div className="overflow-hidden rounded-[1.5rem] border-[5px] border-white shadow-lift">
                  <div className="aspect-[3/4]">
                    <Img image="cubesPlate" alt="" sizes="180px" className="h-full w-full object-cover" />
                  </div>
                </div>
              </Float>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.9 }} className="absolute -bottom-2 right-2 sm:right-6">
              <Float delay={2} y={6}>
                <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-lift backdrop-blur">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-plum-600 to-plum-800 text-white">
                    <LotusMark className="h-5 w-5" />
                  </span>
                  <p className="max-w-[11rem] text-xs font-semibold leading-snug text-plum-900 sm:text-sm">{t('common.company')}</p>
                </div>
              </Float>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Story quote ───────────── */}
      <section className="section relative overflow-hidden">
        <div className="container-site">
          <Reveal className="relative mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-12 w-12 text-plum-200" aria-hidden />
            <p className="mt-4 font-display text-[clamp(1.5rem,1.1rem+1.8vw,2.4rem)] font-medium leading-snug text-plum-900">{t('home.story3')}</p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('home.story2')}</p>
            <p className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-plum-600">
              <span className="h-px w-8 bg-plum-300" aria-hidden />
              {t('common.tagline')}
              <span className="h-px w-8 bg-plum-300" aria-hidden />
            </p>
          </Reveal>

          {/* Mission & Vision */}
          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
            {[
              { icon: Target, title: t('home.mission'), text: t('home.missionText'), from: -30, grad: 'from-plum-700 via-plum-800 to-plum-950' },
              { icon: Eye, title: t('home.vision'), text: t('home.visionText'), from: 30, grad: 'from-[#8A4A12] via-plum-800 to-plum-950' },
            ].map(({ icon: Icon, title, text, from, grad }) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, x: from }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${grad} p-7 text-white shadow-lift sm:p-9`}
              >
                <LotusMark className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 text-white/10 transition-transform duration-700 group-hover:rotate-45" />
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold sm:text-3xl">{title}</h2>
                <p className="relative mt-3 text-[1.02rem] leading-relaxed text-white/85">{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Values ───────────── */}
      <section className="section bg-gradient-to-b from-ivory-100 to-ivory">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">
              <LotusMark className="h-4 w-4" />
              {t('about.values')}
            </p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-plum-900">{t('home.benefitsTitle')}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text, tint }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="absolute right-5 top-4 font-display text-4xl font-semibold text-plum-100 transition-colors duration-300 group-hover:text-plum-200">0{i + 1}</span>
                <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${tint} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-plum-900">{t(title)}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{t(text)}</p>
                <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-plum-600 to-jaggery-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Process timeline ───────────── */}
      <section className="section">
        <div className="container-site grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="eyebrow">
              <LotusMark className="h-4 w-4" />
              {t('process.eyebrow')}
            </p>
            <h2 className="mt-3 font-display text-display-md font-semibold text-plum-900">{t('process.title')}</h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-muted">{t('process.lead2')}</p>
            <div className="mt-8 hidden overflow-hidden rounded-[1.75rem] shadow-lift lg:block">
              <div className="aspect-[4/3]">
                <Img image="facility6" alt="Processing line at the Rajmane Agro facility" sizes="40vw" className="h-full w-full object-cover" />
              </div>
            </div>
          </Reveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* ───────────── Facility gallery ───────────── */}
      <section className="section bg-plum-950 text-white">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-plum-200">
              <LotusMark className="h-4 w-4" />
              {t('common.company')}
            </p>
            <h2 className="mt-3 font-display text-display-md font-semibold">{t('about.facility')}</h2>
            <p className="mt-3 text-lg text-plum-200">{t('about.facilityLead')}</p>
          </Reveal>
          <ul className="mt-10 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[220px] lg:grid-cols-4">
            {FACILITY.map((f, i) => (
              <Reveal as="li" key={f.image} delay={(i % 4) * 0.06} className={`group relative overflow-hidden rounded-2xl bg-plum-900 ${f.span}`}>
                <button type="button" onClick={() => setZoom(f)} className="block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-plum-300" aria-label={f.alt} aria-haspopup="dialog">
                  <Img image={f.image} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <span className="absolute inset-0 bg-gradient-to-t from-plum-950/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden />
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-white/95 text-plum-800 opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden />
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── Family ───────────── */}
      <section className="overflow-hidden bg-gradient-to-b from-plum-50/70 to-ivory pb-10 pt-[var(--space-section)] sm:pb-12 lg:pb-14">        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-display-md font-semibold text-plum-900">{t('about.familyTitle')}</h2>
            <p className="mt-4 text-lg text-ink-muted">{t('about.familyText')}</p>
            <ButtonLink to="/shop" className="mt-8" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
              {t('home.heroCta')}
            </ButtonLink>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {(['familyModel', 'familyDenim', 'familyModel2'] as ImageKey[]).map((img, i) => (
              <Reveal key={img} delay={i * 0.12} className={i === 1 ? 'mt-10' : ''}>
                <Float delay={i * 0.8} y={8}>
                  <div className="overflow-hidden rounded-[1.5rem] border-4 border-white bg-ivory-200 shadow-lift">
                    <div className="aspect-[2/3]">
                      <Img image={img} alt="" sizes="(min-width: 1024px) 18vw, 33vw" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </Float>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


<CompanyDetails />

      <ContactCta />

      <Overlay open={!!zoom} onClose={() => setZoom(null)} title={zoom?.alt ?? ''} placement="center" widthClass="!max-w-4xl">
        {zoom && <Img image={zoom.image} alt={zoom.alt} priority sizes="90vw" className="max-h-[75dvh] w-full object-contain" />}
      </Overlay>
    </>
  );
}