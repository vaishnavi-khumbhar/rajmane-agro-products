import { useSearchParams } from 'react-router-dom';
import { Building2, Globe, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm, type EnquiryType } from '@/components/forms/EnquiryForm';
import { SITE } from '@/config/site';

export default function ContactPage() {
  const { t } = useLang();
  const [params] = useSearchParams();
  const typeParam = params.get('type');
  const type: EnquiryType = typeParam === 'bulk' || typeParam === 'distributor' ? typeParam : 'contact';
  usePageMeta(t('nav.contact'), t('contact.lead'));

  const cards = [
    { icon: Phone, label: t('contact.phone'), value: SITE.phoneDisplay, href: `tel:${SITE.phoneE164}` },
    { icon: MessageCircle, label: t('contact.whatsapp'), value: SITE.whatsappDisplay, href: SITE.whatsappUrl, external: true },
    { icon: Mail, label: t('contact.email'), value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: MapPin, label: t('contact.address'), value: t('contact.addressValue'), sub: t('contact.viewMap'), href: SITE.mapUrl, external: true },
    { icon: Globe, label: t('contact.website'), value: 'www.rajmaneagroproducts.com', href: SITE.url },
    { icon: Building2, label: t('contact.business'), value: t('common.company') },
  ];

  return (
    <>
      <PageHeader eyebrow={t('contact.eyebrow')} title={t('contact.title')} lead={t('contact.lead')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.contact') }]} />
      <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_1.6fr]">
        <div className="min-w-0 space-y-4">
          {cards.map(({ icon: Icon, label, value, href, sub, external }, i) => {
            const inner = (
              <>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-plum-700 text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-ink-muted">{label}</span>
                  <span className="block font-semibold [overflow-wrap:anywhere] text-ink">{value}</span>
                  {sub && <span className="mt-1 block text-sm font-semibold text-plum-700 underline-offset-2 group-hover:underline">{sub}</span>}
                </span>
              </>
            );
            return (
              <Reveal key={label} delay={i * 0.08}>
                {href ? (
                  <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="card group flex items-center gap-4 p-5 transition-shadow hover:shadow-lift">
                    {inner}
                  </a>
                ) : (
                  <div className="card flex items-center gap-4 p-5">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1} className="card p-6 sm:p-8">
          <h2 className="font-display text-2xl font-semibold text-plum-900">{t('contact.formTitle')}</h2>
          <p className="mb-6 mt-2 text-ink-muted">{t('enquiry.lead')}</p>
          <EnquiryForm defaultType={type} />
        </Reveal>
      </div>
    </>
  );
}