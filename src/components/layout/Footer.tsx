import { Link } from 'react-router-dom';
import { Phone, Globe, Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SITE } from '@/config/site';
import { BRAND } from '@/config/assets';
import { LotusMark } from '@/components/ui/LotusMark';
import type { TKey } from '@/i18n';

// Optional contact details: shown only when they exist in config/site.ts (prevents TypeScript errors if absent)
const S = SITE as typeof SITE &
  Partial<{ whatsappUrl: string; whatsappDisplay: string; email: string; mapUrl: string; social: Partial<Record<'instagram' | 'facebook' | 'youtube', string>> }>;
const SOCIAL = (S.social ?? {}) as Partial<Record<'instagram' | 'facebook' | 'youtube', string>>;

// Google Maps search for the business location (Masur, Tal. Karad, Dist. Satara – 415106)
const MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Masur%2C%20Karad%2C%20Satara%2C%20Maharashtra%20415106';

const DEV = { name: 'Advertising Branding & Marketing', url: 'https://advertisingandbrandingmarketing.com/' };

const SOCIALS = [
  { key: 'instagram', label: 'Instagram', Icon: Instagram, always: true, hover: 'hover:border-transparent hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]' },
  { key: 'facebook', label: 'Facebook', Icon: Facebook, always: true, hover: 'hover:border-transparent hover:bg-[#1877F2]' },
  { key: 'youtube', label: 'YouTube', Icon: Youtube, always: false, hover: 'hover:border-transparent hover:bg-[#FF0000]' },
] as const;

export function Footer() {
  const { t } = useLang();
  const cols: { title: TKey; links: { to: string; label: TKey }[] }[] = [
    {
      title: 'footer.shop',
      links: [
        { to: '/shop', label: 'nav.allProducts' },
        { to: '/products/jaggery', label: 'categories.jaggery' },
        { to: '/products/jaggery-powder', label: 'categories.powder' },
        { to: '/products/jaggery-cubes', label: 'categories.cubes' },
      ],
    },
    {
      title: 'footer.company',
      links: [
        { to: '/about', label: 'footer.about2' },
        { to: '/contact', label: 'nav.contact' },
        { to: '/faq', label: 'nav.faqs' },
        { to: '/track-order', label: 'nav.track' },
      ],
    },
    {
      title: 'footer.policies',
      links: [
        { to: '/privacy-policy', label: 'footer.privacy' },
        { to: '/terms-and-conditions', label: 'footer.terms' },
        { to: '/shipping-policy', label: 'footer.shipping' },
        { to: '/refund-and-cancellation-policy', label: 'footer.refund' },
      ],
    },
  ];
  const socials = SOCIALS.filter((s) => s.always || SOCIAL[s.key]);
  const chip =
    'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-[0.92rem] text-plum-100 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-white';
  const socialBtn =
    'grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 focus-visible:outline-white';

  return (
    <footer className="relative overflow-hidden bg-plum-950 text-center text-plum-100">
      <LotusMark className="pointer-events-none absolute -right-16 -top-10 h-80 w-80 text-white/[0.03]" />
      <LotusMark className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 text-white/[0.03]" />

      {/* Brand + contact */}
      <div className="container-site relative flex flex-col items-center pb-10 pt-14 md:pt-16">
        <div className="inline-block rounded-2xl bg-white p-3 shadow-lg shadow-black/20">
          <img src={BRAND.logo} width={BRAND.logoWidth} height={BRAND.logoHeight} alt={SITE.brand} className="h-14 w-auto" loading="lazy" />
        </div>
        <p className="mt-6 font-display text-xl text-white md:text-2xl">{t('common.tagline')}</p>
        <p className="mx-auto mt-3 max-w-xl text-[0.95rem] leading-relaxed text-plum-200">{t('footer.about')}</p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <li>
            <a href={`tel:${SITE.phoneE164}`} className={`${chip} font-semibold text-white`}>
              <Phone className="h-4 w-4" aria-hidden />
              {SITE.phoneDisplay}
            </a>
          </li>
          {S.whatsappUrl && (
            <li>
              <a href={S.whatsappUrl} target="_blank" rel="noopener noreferrer" className={chip}>
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t('contact.whatsapp')}: {S.whatsappDisplay ?? SITE.phoneDisplay}
              </a>
            </li>
          )}
          {S.email && (
            <li>
              <a href={`mailto:${S.email}`} className={`${chip} break-all`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {S.email}
              </a>
            </li>
          )}
          <li>
            <a href={SITE.url} rel="noopener" className={chip}>
              <Globe className="h-4 w-4" aria-hidden />
              www.rajmaneagroproducts.com
            </a>
          </li>
        </ul>

        <a href={S.mapUrl ?? MAP_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex max-w-md items-start justify-center gap-2 text-[0.92rem] text-plum-200 hover:text-white hover:underline focus-visible:outline-white">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          <span>{t('contact.addressValue')}</span>
        </a>

        {/* Social icons. Add the official URLs in config/site.ts → SITE.social to make them clickable. */}
        <ul className="mt-7 flex flex-wrap items-center justify-center gap-3" aria-label="Social media">
          {socials.map(({ key, label, Icon, hover }) => {
            const url = SOCIAL[key];
            return (
              <li key={key}>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} title={label} className={`${socialBtn} ${hover}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                ) : (
                  <span title={label} className={`${socialBtn} cursor-default ${hover}`}>
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="sr-only">{label}</span>
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Link columns */}
      <div className="container-site relative grid gap-8 border-t border-white/10 py-10 sm:grid-cols-3 sm:gap-6">
        {cols.map((col) => (
          <nav key={col.title} aria-label={t(col.title)}>
            <h2 className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-white">{t(col.title)}</h2>
            <span className="mx-auto mt-2 block h-0.5 w-8 rounded-full bg-plum-400/60" aria-hidden />
            <ul className="mt-3 space-y-1">
              {col.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-[40px] items-center justify-center text-[0.95rem] text-plum-200 transition-colors hover:text-white focus-visible:outline-white">
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar: copyright left, credit right (desktop); stacked & centred on mobile */}
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center gap-3 py-6 text-sm md:flex-row md:justify-between">
          <p className="text-plum-200 md:text-left">{t('footer.rights', { year: new Date().getFullYear() })}</p>
          <p className="text-plum-200 md:text-right">
            {t('footer.devBy')}{' '}
            <a href={DEV.url} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white focus-visible:outline-white">
              {DEV.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}