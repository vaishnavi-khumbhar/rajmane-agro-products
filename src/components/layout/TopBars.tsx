import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SITE } from '@/config/site';
import { LotusMark } from '@/components/ui/LotusMark';
import type { TKey } from '@/i18n';

const MESSAGES: TKey[] = ['promo.m1', 'promo.m2', 'promo.m3', 'promo.m4', 'promo.m5'];

/** Red scrolling announcement + dark offer bar. Both scroll away; the main header stays sticky. */
export function TopBars() {
  const { t } = useLang();
  const items = MESSAGES.map((k) => t(k));
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((m, i) => (
        <li key={i} className="flex items-center whitespace-nowrap px-5 text-[0.85rem] font-semibold tracking-wide">
          <LotusMark className="mr-5 h-3.5 w-3.5 text-white/70" />
          {m}
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      {/* Red marquee */}
      <div className="group relative overflow-hidden bg-gradient-to-r from-[#A3122A] via-[#C8182F] to-[#A3122A] text-white">
        <p className="sr-only">{items.join(' • ')}</p>
        <div className="flex h-9 w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:hidden" aria-hidden>
          {row()}
          {row(true)}
        </div>
        <p className="hidden h-9 items-center justify-center px-4 text-center text-[0.85rem] font-semibold motion-reduce:flex" aria-hidden>
          {items[0]}
        </p>
      </div>

      {/* Offer bar */}
      <div className="bg-gradient-to-r from-plum-950 via-plum-900 to-plum-950 text-white">
        <div className="container-site grid h-12 grid-cols-[1fr_auto] items-center gap-3 sm:grid-cols-3">
          <a
            href={`tel:${SITE.phoneE164}`}
            className="hidden items-center gap-2 justify-self-start rounded text-[0.8rem] font-bold uppercase tracking-[0.12em] text-jaggery-300 hover:text-white sm:inline-flex"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10">
              <Phone className="h-3.5 w-3.5" aria-hidden />
            </span>
            <span className="hidden md:inline">{t('promo.call')}</span>
          </a>
          <div className="flex min-w-0 items-center gap-2.5 justify-self-start sm:justify-self-center">
            <span className="truncate font-display text-[0.95rem] font-semibold sm:text-base">{t('promo.badge')}</span>
            <span className="hidden items-center rounded-full border border-jaggery-300/60 bg-white/5 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-jaggery-300 md:inline-flex">
              Rajmane
            </span>
          </div>
          <Link
            to="/shop"
            className="group/shop inline-flex items-center gap-1.5 justify-self-end rounded text-sm font-bold text-jaggery-300 hover:text-white"
          >
            {t('promo.shopNow')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/shop:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}