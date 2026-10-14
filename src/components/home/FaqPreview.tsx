import { ArrowRight, MessageCircleQuestion, Phone } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { ButtonLink } from '@/components/ui/Button';
import { LotusMark } from '@/components/ui/LotusMark';
import { FAQS } from '@/data/faqs';
import { SITE } from '@/config/site';
import { useLang } from '@/context/LanguageContext';

export function FaqPreview() {
  const { t, L } = useLang();
  const items = FAQS.filter((f) => f.preview).map((f) => ({ id: f.id, title: L(f.q), content: L(f.a) }));
  return (
    <section className="relative overflow-hidden py-8 sm:py-12 lg:py-14" aria-labelledby="faq-preview-title">
      <LotusMark className="pointer-events-none absolute -left-16 top-4 h-60 w-60 sm:-left-24 sm:h-96 sm:w-96 animate-[spin_90s_linear_infinite] text-plum-700/[0.04]" />
      <div className="container-site relative grid gap-6 sm:gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:items-start">
        <div className="lg:sticky lg:top-24">
          <SectionHeading eyebrow={t('home.faqEyebrow')} title={t('home.faqTitle')} id="faq-preview-title" />
          <Reveal delay={0.1} className="mt-5 sm:mt-6">
            <ButtonLink to="/faq" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
              {t('home.faqAll')}
            </ButtonLink>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 hidden lg:block">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-plum-800 via-plum-700 to-plum-600 p-6 text-white shadow-lift">
              <span aria-hidden className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-white/15">
                <MessageCircleQuestion className="h-5 w-5" aria-hidden />
              </span>
              <p className="relative mt-4 font-display text-xl">{t('faq.still')}</p>
              <p className="relative mt-1 text-[0.95rem] text-plum-100">{t('faq.stillText')}</p>
              <a
                href={`tel:${SITE.phoneE164}`}
                className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-plum-800 transition-transform hover:scale-[1.03] focus-visible:outline-white"
              >
                <Phone className="h-4 w-4" aria-hidden />
                {SITE.phoneDisplay}
              </a>
            </div>
          </Reveal>
        </div>
        <Accordion items={items} />
      </div>
    </section>
  );
}