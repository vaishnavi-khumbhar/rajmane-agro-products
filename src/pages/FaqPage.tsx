import { Phone } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Accordion } from '@/components/ui/Accordion';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { FAQS } from '@/data/faqs';
import { SITE } from '@/config/site';

export default function FaqPage() {
  const { t, L } = useLang();
  usePageMeta(t('faq.title'), t('faq.lead'));
  const items = FAQS.map((f) => ({ id: f.id, title: L(f.q), content: L(f.a) }));
  return (
    <>
      <PageHeader eyebrow={t('faq.eyebrow')} title={t('faq.title')} lead={t('faq.lead')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.faqs') }]} />
      <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1.6fr_1fr]">
        <Reveal>
          <Accordion items={items} headingLevel={2} />
        </Reveal>
        <Reveal delay={0.1}>
          <aside className="rounded-xl3 bg-plum-900 p-7 text-white shadow-lift lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-medium">{t('faq.still')}</h2>
            <p className="mt-2 text-plum-100">{t('faq.stillText')}</p>
            <div className="mt-6 flex flex-col gap-3">
              <ButtonAnchor href={`tel:${SITE.phoneE164}`} variant="light" icon={<Phone className="h-4 w-4" aria-hidden />}>
                {SITE.phoneDisplay}
              </ButtonAnchor>
              <ButtonLink to="/contact" variant="outline-light">
                {t('faq.contactUs')}
              </ButtonLink>
            </div>
          </aside>
        </Reveal>
      </div>
    </>
  );
}
