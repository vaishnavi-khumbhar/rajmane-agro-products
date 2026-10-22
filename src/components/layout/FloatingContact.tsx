import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { SITE } from '@/config/site';

// Works whether or not your site.ts has a whatsappUrl field.
const S = SITE as typeof SITE & Partial<{ whatsappUrl: string }>;
const WA_NUMBER = SITE.phoneE164.replace(/\D/g, ''); // +91 91726 80896 → 919172680896

/** WhatsApp brand glyph (official logo shape, used only to link to WhatsApp). */
function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3C9.06 3 3.4 8.6 3.4 15.52c0 2.21.59 4.37 1.7 6.27L3.3 28.5l6.9-1.78a12.7 12.7 0 0 0 5.84 1.42h.01c6.98 0 12.65-5.6 12.65-12.52C28.7 8.6 23.03 3 16.04 3Zm0 22.92h-.01a10.6 10.6 0 0 1-5.38-1.46l-.39-.23-4.1 1.06 1.1-3.96-.25-.4a10.3 10.3 0 0 1-1.6-5.5c0-5.750 4.72-10.43 10.53-10.43 5.8 0 10.52 4.68 10.52 10.43 0 5.76-4.72 10.49-10.52 10.49Zm5.77-7.830c-.32-.16-1.87-.91-2.16-1.02-.29-.1-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.2-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.55a9.5 9.5 0 0 1-1.77-2.17c-.18-.31-.02-.48.14-.64.14-.14.32-.37.48-.55.16-.18.21-.31.32-.52.1-.21.05-.39-.03-.55-.08-.15-.71-1.690-.97-2.31-.26-.61-.52-.53-.71-.54h-.6c-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.6 0 1.54 1.13 3.02 1.29 3.23.16.2 2.22 3.36 5.38 4.71.75.32 1.34.51 1.8.66.75.24 1.44.2 1.98.12.6-.09 1.87-.76 2.130-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.6-.36Z" />
    </svg>
  );
}

/** Floating WhatsApp + Call buttons shown on every page (sits above the mobile tab bar). */
export function FloatingContact() {
  const { t } = useLang();
  const waHref = S.whatsappUrl ?? `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t('contact.waMessage'))}`;

  const pill =
    'pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-plum-950 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100 lg:block translate-x-2';

  return (
    <div className="fixed bottom-[5.25rem] right-3 z-40 flex flex-col items-center gap-3 print:hidden sm:right-5 lg:bottom-6 lg:right-6">
      {/* Call */}
      <motion.a
        href={`tel:${SITE.phoneE164}`}
        aria-label={`${t('contact.callUs')}: ${SITE.phoneDisplay}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.6 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group relative grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-plum-600 to-plum-800 text-white shadow-[0_10px_24px_-8px_rgba(122,36,112,.8)] ring-2 ring-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-plum-300"
      >
        <span className={pill}>{t('contact.callUs')}</span>
        <Phone className="h-5 w-5" aria-hidden />
      </motion.a>

      {/* WhatsApp */}
      <motion.a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('contact.whatsappChat')}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.75 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-8px_rgba(37,211,102,.9)] ring-2 ring-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
      >
        {/* soft pulse ring (disabled automatically for reduced-motion users) */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping" style={{ animationDuration: '2.4s' }} aria-hidden />
        <span className={pill}>{t('contact.whatsappChat')}</span>
        <WhatsAppIcon className="relative h-8 w-8" />
      </motion.a>
    </div>
  );
}