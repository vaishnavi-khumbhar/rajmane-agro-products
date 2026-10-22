import { useState } from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Building, Building2, Check, Copy, Factory, MapPin, Navigation, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { Reveal } from '@/components/ui/Reveal';
import { LotusMark } from '@/components/ui/LotusMark';
import { asset } from '@/config/paths';
import { LEADERS, OFFICES, REGISTRATIONS, mapLink, type Leader } from '@/config/company';

const ease = [0.22, 1, 0.36, 1] as const;
/** "Mr. Mallikarjun Vinayak Rajmane" → "MR" (first name + surname). */
const initials = (name: string) => {
  const words = name.replace(/^(Mrs|Ms|Mr|Dr)\.?\s+/i, '').split(/\s+/).filter(Boolean);
  return `${words[0]?.[0] ?? ''}${words.length > 1 ? words[words.length - 1][0] : ''}`.toUpperCase();
};

/** Photo with an animated gradient ring. Falls back to a monogram until a real photo is added in config/company.ts. */
function Portrait({ leader, size }: { leader: Leader; size: 'lg' | 'sm' }) {
  const { t, L } = useLang();
  const name = L(leader.name);
  const lg = size === 'lg';
  return (
    <div className={`relative shrink-0 ${lg ? 'mx-auto -mt-2 w-full max-w-[22rem] sm:-mt-1' : 'h-32 w-32 sm:h-36 sm:w-36'}`}>
      {lg ? (
        /* glowing gradient frame (static shape, breathing glow) */
        <motion.span
          className="absolute -inset-1.5 rounded-[2.2rem] bg-gradient-to-br from-jaggery-300 via-plum-400 to-plum-600"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
      ) : (
        /* rotating ring */
        <motion.span
          className="absolute -inset-1.5 rounded-full bg-[conic-gradient(from_0deg,#7A2470,#E0A458,#B5468F,#7A2470)] opacity-80"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          aria-hidden
        />
      )}
      <div className={`relative overflow-hidden border-4 border-white bg-gradient-to-br from-plum-600 via-plum-700 to-plum-900 ${lg ? 'aspect-[4/5] rounded-[2rem]' : 'h-full w-full rounded-full'}`}>
        {leader.photo ? (
          <img
            src={asset(leader.photo)}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover"
            style={{
              objectPosition: leader.photoFocus ?? 'center',
              transform: `scale(${leader.photoZoom ?? 1})`,
              transformOrigin: leader.photoFocus ?? 'center',
            }}
          />
        ) : (
          <div className="grid h-full w-full place-items-center text-white" role="img" aria-label={name}>
            <LotusMark className={`absolute text-white/10 ${lg ? '-bottom-10 -right-10 h-56 w-56' : 'h-24 w-24'}`} />
            <div className="relative text-center">
              <span className={`block font-display font-semibold ${lg ? 'text-7xl' : 'text-4xl'}`}>{initials(leader.name.en)}</span>
              {lg && (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
                  <UserRound className="h-3.5 w-3.5" aria-hidden />
                  {t('company.photoSoon')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PhoneLink({ leader, light = false }: { leader: Leader; light?: boolean }) {
  return (
    <a
      href={`tel:${leader.phoneE164}`}
      className={`group inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${
        light ? 'bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/25' : 'bg-plum-50 text-plum-800 ring-1 ring-plum-100 hover:bg-plum-100'
      }`}
    >
      <Phone className="h-4 w-4 transition-transform group-hover:rotate-12" aria-hidden />
      {leader.phoneDisplay}
    </a>
  );
}

function CopyValue({ label, value }: { label: string; value: string }) {
  const { t } = useLang();
  const { notify } = useToast();
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      notify(`${label} ${t('company.copied').toLowerCase()}`);
      window.setTimeout(() => setDone(false), 1800);
    } catch {
      /* clipboard blocked — value is still selectable */
    }
  };
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative flex min-w-0 items-center justify-between gap-3 overflow-hidden rounded-2xl border border-plum-100 bg-white/90 p-4 pl-5 shadow-[0_2px_6px_rgba(58,16,53,.05),0_16px_32px_-22px_rgba(58,16,53,.45)] backdrop-blur"
    >
      <span className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-plum-600 to-jaggery-500" aria-hidden />
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-plum-600">{label}</p>
        <p className="mt-1 select-all font-mono text-[1.05rem] font-bold tracking-wide text-plum-950 [overflow-wrap:anywhere]">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={`${t('company.copy')} ${label}`}
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${
          done ? 'bg-success text-white' : 'bg-plum-50 text-plum-700 hover:bg-plum-700 hover:text-white'
        }`}
      >
        {done ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
      </button>
    </motion.div>
  );
}

const OFFICE_ICON = { factory: Factory, head: Building2, branch: Building } as const;

/** "Our Story" page: leadership + company registrations + offices. */
export function CompanyDetails() {
  const { t, L } = useLang();
  const featured = LEADERS.find((l) => l.featured) ?? LEADERS[0];
  const others = LEADERS.filter((l) => l !== featured);

  return (
    <>
      {/* ───────────── Leadership ───────────── */}
      <section className="relative overflow-hidden pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10" aria-labelledby="leaders-title">
        <motion.div
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-plum-100/60 blur-3xl"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <div className="container-site relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm">
              <LotusMark className="h-4 w-4 text-plum-500" />
              {t('company.eyebrow')}
            </p>
            <h2 id="leaders-title" className="mt-5 font-display text-display-md font-semibold text-plum-950">
              {t('company.title')}
            </h2>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="mx-auto mt-4 block h-1 w-24 rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
              aria-hidden
            />
            <p className="mt-4 text-lg text-ink-muted">{t('company.lead')}</p>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
            {/* Featured: owner */}
            <Reveal>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="relative h-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-700 via-plum-800 to-plum-950 p-6 text-white shadow-lift sm:p-8"
              >
                <LotusMark className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 text-white/5" />
                <div className="relative grid items-center gap-8 sm:grid-cols-[1fr_1.05fr]">
                  <Portrait leader={featured} size="lg" />
                  <div className="text-center sm:text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-jaggery-300/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-jaggery-300 ring-1 ring-jaggery-300/30">
                      <BadgeCheck className="h-4 w-4" aria-hidden />
                      {t(featured.role)}
                    </span>
                    <h3 className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.3rem)] font-semibold leading-tight">{L(featured.name)}</h3>
                    <p className="mt-3 text-plum-100">{t('company.ownerLine')}</p>
                    <div className="mt-6">
                      <PhoneLink leader={featured} light />
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>

            {/* Chairman & MD */}
            <div className="grid gap-6">
              {others.map((leader, i) => (
                <Reveal key={leader.id} delay={0.12 + i * 0.1}>
                  <motion.article
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group relative flex h-full flex-col items-center gap-6 overflow-hidden rounded-[1.75rem] border border-line bg-white p-6 text-center shadow-[0_2px_6px_rgba(58,16,53,.05),0_20px_40px_-26px_rgba(58,16,53,.4)] sm:flex-row sm:p-7 sm:text-left"
                  >
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-plum-700 via-plum-400 to-jaggery-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                    <Portrait leader={leader} size="sm" />
                    <div className="min-w-0">
                      <p className="text-sm font-bold uppercase tracking-[0.14em] text-plum-600">{t(leader.role)}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold leading-snug text-plum-950 sm:text-[1.75rem]">{L(leader.name)}</h3>
                      <div className="mt-4">
                        <PhoneLink leader={leader} />
                      </div>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Company details (light, animated) ───────────── */}
      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#FDF1E4] via-[#FBF2F8] to-ivory py-16 sm:py-20 lg:py-24"
        aria-labelledby="company-title"
      >
        {/* soft moving blobs */}
        <motion.div
          className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-plum-200/50 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-jaggery-100 blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        />
        {/* dotted texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#e9c3db_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
          aria-hidden
        />
        <motion.span
          className="pointer-events-none absolute right-[8%] top-12 hidden text-plum-200 lg:block"
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden
        >
          <LotusMark className="h-16 w-16" />
        </motion.span>

        <div className="container-site relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white/80 px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm backdrop-blur">
                <LotusMark className="h-4 w-4 text-plum-500" />
                {t('company.mfgBy')}
              </p>
              <h2
                id="company-title"
                className="animate-gradient mt-4 bg-gradient-to-r from-plum-800 via-plum-500 to-jaggery-600 bg-[length:200%_auto] bg-clip-text font-display text-[clamp(2rem,1.4rem+2.4vw,3.2rem)] font-semibold leading-tight text-transparent"
              >
                {REGISTRATIONS.legalName}
              </h2>
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease }}
                className="mt-4 block h-1 w-24 origin-left rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
                aria-hidden
              />
              <p className="mt-4 max-w-md text-lg text-ink-muted">{t('company.detailsLead')}</p>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-success-bg px-4 py-2 text-sm font-semibold text-success ring-1 ring-success/20">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                {t('company.registered')}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
              <CopyValue label={t('company.gst')} value={REGISTRATIONS.gst} />
              <CopyValue label={t('company.fssai')} value={REGISTRATIONS.fssai} />
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-5 md:grid-cols-3 lg:mt-14">
            {OFFICES.map((o, i) => {
              const Icon = OFFICE_ICON[o.kind];
              return (
                <Reveal as="li" key={o.id} delay={i * 0.12}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-white p-6 shadow-[0_2px_6px_rgba(58,16,53,.05),0_20px_40px_-28px_rgba(58,16,53,.45)] transition-shadow hover:shadow-lift"
                  >
                    {/* top bar grows on hover */}
                    <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-plum-700 via-plum-400 to-jaggery-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                    {/* corner glow */}
                    <span className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-plum-50 transition-transform duration-500 group-hover:scale-150" aria-hidden />
                    <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-plum-600 to-plum-800 text-white shadow-[0_10px_20px_-10px_rgba(122,36,112,.9)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-6 w-6" aria-hidden />
                    </span>
                    <h3 className="relative mt-5 font-display text-xl font-semibold text-plum-950">{t(o.label)}</h3>
                    <address className="relative mt-3 flex-1 not-italic leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
                      {o.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                    <a
                      href={mapLink(o.mapQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative mt-5 inline-flex min-h-[44px] items-center gap-2 self-start rounded-full border border-plum-200 px-4 text-sm font-semibold text-plum-800 transition-colors hover:border-plum-700 hover:bg-plum-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
                    >
                      <MapPin className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:animate-bounce" aria-hidden />
                      {t('company.directions')}
                      <Navigation className="h-3.5 w-3.5 opacity-70" aria-hidden />
                    </a>
                  </motion.div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}