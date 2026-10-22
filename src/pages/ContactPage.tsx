import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Building2, Globe, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { LotusMark } from '@/components/ui/LotusMark';
import { EnquiryForm, type EnquiryType } from '@/components/forms/EnquiryForm';
import { SITE } from '@/config/site';
import { SocialLinks } from '@/components/layout/SocialLinks';

const ease = [0.22, 1, 0.36, 1] as const;

// Works even if your site.ts has (or doesn't have) mapUrl.
const S = SITE as typeof SITE & Partial<{ mapUrl: string }>;
const MAP_QUERY = 'Masur, Karad, Satara, Maharashtra 415106';
const MAP_URL = S.mapUrl ?? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;
const MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=13&output=embed`;

const fadeUp = (y = 18, d = 0.7) => ({
  hidden: { opacity: 0, y },
  show: { opacity: 1, y: 0, transition: { duration: d, ease } },
});

export default function ContactPage() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const typeParam = params.get('type');
  const type: EnquiryType = typeParam === 'bulk' || typeParam === 'distributor' ? typeParam : 'contact';
  usePageMeta(t('nav.contact'), t('contact.lead'));

  const cards = [
    { icon: Phone, label: t('contact.phone'), value: SITE.phoneDisplay, href: `tel:${SITE.phoneE164}`, external: false },
    { icon: Globe, label: t('contact.website'), value: 'www.rajmaneagroproducts.com', href: SITE.url, external: true },
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue'), href: MAP_URL, external: true },
    { icon: Building2, label: t('contact.business'), value: t('common.company') },
  ];

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#FBF2F8] via-ivory to-[#FDF1E4]" aria-labelledby="contact-title">
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
        {/* floating icons */}
        {[
          { Icon: Phone, cls: 'left-[8%] top-[34%] h-10 w-10', d: 0 },
          { Icon: MessageCircle, cls: 'right-[10%] top-[24%] h-14 w-14', d: 1.4 },
          { Icon: Send, cls: 'right-[22%] bottom-[16%] h-8 w-8', d: 0.8 },
        ].map(({ Icon, cls, d }, i) => (
          <motion.span
            key={i}
            className={`pointer-events-none absolute hidden text-plum-200 md:block ${cls}`}
            animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: d }}
            aria-hidden
          >
            <Icon className="h-full w-full" />
          </motion.span>
        ))}

        <div className="container-site relative pb-14 pt-8 sm:pb-16 sm:pt-10">
          <Breadcrumbs items={[{ label: t('common.home'), to: '/' }, { label: t('nav.contact') }]} />
          <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }} className="mx-auto mt-8 max-w-3xl text-center">
            <motion.p
              variants={fadeUp(14, 0.6)}
              className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white/80 px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm backdrop-blur"
            >
              <LotusMark className="h-4 w-4 text-plum-500" />
              {t('contact.eyebrow')}
            </motion.p>
            <motion.h1
              id="contact-title"
              variants={fadeUp(22, 0.8)}
              className="mt-5 font-display text-[clamp(2rem,1.4rem+2.6vw,3.4rem)] font-semibold leading-tight text-plum-950"
            >
              {t('contact.title')}
            </motion.h1>
            <motion.span
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease } } }}
              className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
              aria-hidden
            />
            <motion.p variants={fadeUp(16)} className="mt-5 text-lg leading-relaxed text-ink-muted">
              {t('contact.lead')}
            </motion.p>
            <motion.div variants={fadeUp(16)} className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`tel:${SITE.phoneE164}`}
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-plum-700 to-plum-600 px-6 font-semibold text-white shadow-lift transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum-300"
              >
                <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden />
                {SITE.phoneDisplay}
              </a>
              <a
                href="#contact-form"
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-plum-200 bg-white px-6 font-semibold text-plum-800 shadow-sm transition-colors hover:border-plum-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum-200"
              >
                <Send className="h-4 w-4" aria-hidden />
                {t('contact.formTitle')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Info cards + form ───────────── */}
      <section className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_1.5fr] lg:items-start">
        <div className="min-w-0 space-y-4">
          {cards.map(({ icon: Icon, label, value, href, external }, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-plum-600 to-plum-800 text-white shadow-md transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-plum-600">{label}</span>
                  <span className="mt-0.5 block font-semibold text-ink [overflow-wrap:anywhere]">{value}</span>
                </span>
                {href && (
                  <ArrowUpRight
                    className="h-5 w-5 shrink-0 text-plum-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-plum-700"
                    aria-hidden
                  />
                )}
              </>
            );
            const base =
              'group card flex items-center gap-4 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-plum-200 hover:shadow-lift';
            return (
              <Reveal key={label} delay={i * 0.08}>
                {href ? (
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={base}>
                    {inner}
                  </a>
                ) : (
                  <div className={base}>{inner}</div>
                )}
              </Reveal>
            );
          })}

          <Reveal delay={0.35}>
            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-plum-700 via-plum-800 to-plum-950 p-6 text-white shadow-lift">
              <LotusMark className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 text-white/10" />
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-plum-200">{t('contact.follow')}</p>
              <div className="relative mt-3">
                <SocialLinks tone="dark" withLabels />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div id="contact-form" className="relative scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-line bg-white p-6 shadow-lift sm:p-8">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-plum-700 via-plum-400 to-jaggery-500" aria-hidden />
            <div className="flex items-start gap-4">
              <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-700 ring-1 ring-plum-100 sm:grid">
                <Send className="h-5 w-5" aria-hidden />
              </span>
              <div className="min-w-0">
                <h2 className="font-display text-2xl font-semibold text-plum-900">{t('contact.formTitle')}</h2>
                <p className="mt-2 text-ink-muted">{t('enquiry.lead')}</p>
              </div>
            </div>
            <div className="mt-6">
              <EnquiryForm defaultType={type} />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ───────────── Map ───────────── */}
      <section className="container-site pb-14 sm:pb-20" aria-labelledby="contact-map">
        <Reveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-lift">
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex min-w-0 items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-plum-700 text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <h2 id="contact-map" className="font-display text-xl font-semibold text-plum-900">
                    {t('contact.address')}
                  </h2>
                  <p className="text-ink-muted [overflow-wrap:anywhere]">{t('contact.addressValue')}</p>
                </div>
              </div>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-full border border-plum-200 px-5 text-sm font-semibold text-plum-800 transition-colors hover:border-plum-500 hover:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
              >
                Google Maps
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <iframe
              title={`${t('contact.address')} – ${t('contact.addressValue')}`}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[280px] w-full border-0 grayscale-[30%] sm:h-[380px]"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}