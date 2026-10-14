import { ArrowRight, Globe, MessageCircle, Phone } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { LotusMark } from '@/components/ui/LotusMark';
import { useLang } from '@/context/LanguageContext';
import { SITE } from '@/config/site';

export function ContactCta() {
  const { t } = useLang();
  return (
    <section className="pb-[var(--space-section)]" aria-labelledby="cta-title">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-700 via-plum-800 to-plum-950 px-6 py-14 text-white shadow-lift sm:px-12 lg:px-16">
          <LotusMark className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-white/[0.07]" />
          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 id="cta-title" className="font-display text-display-md font-medium">
                {t('home.contactTitle')}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-plum-100">{t('home.contactLead')}</p>
              <p className="mt-4 text-sm font-semibold text-plum-200">{t('common.company')}</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={`tel:${SITE.phoneE164}`} className="group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15 focus-visible:outline-white">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-plum-800">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-plum-200">{t('contact.phone')}</span>
                  <span className="block text-lg font-semibold">{SITE.phoneDisplay}</span>
                </span>
              </a>
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15 focus-visible:outline-white">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-plum-800">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm text-plum-200">{t('contact.whatsapp')}</span>
                  <span className="block text-lg font-semibold">{SITE.whatsappDisplay}</span>
                </span>
              </a>
              <a href={SITE.url} rel="noopener" className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 transition-colors hover:bg-white/15 focus-visible:outline-white">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-plum-800">
                  <Globe className="h-5 w-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-plum-200">{t('contact.website')}</span>
                  <span className="block truncate font-semibold">rajmaneagroproducts.com</span>
                </span>
              </a>
              <ButtonLink to="/contact" variant="light" size="lg" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                {t('home.contactCta')}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}