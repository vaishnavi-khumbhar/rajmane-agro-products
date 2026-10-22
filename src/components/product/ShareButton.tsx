import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Facebook, Link2, MessageCircle, Share2 } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';

/** Share a product: WhatsApp, Facebook, copy link, and the phone's native share sheet when available. */
export function ShareButton({ title, className = '' }: { title: string; className?: string }) {
  const { t } = useLang();
  const { notify } = useToast();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const canNative = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => !wrap.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      notify(t('product.linkCopied'));
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify(t('product.copyFailed'), { tone: 'error' });
    }
  };

  const native = async () => {
    try {
      await navigator.share({ title, url });
      setOpen(false);
    } catch {
      /* user cancelled */
    }
  };

  const text = encodeURIComponent(`${title} – ${url}`);
  const item =
    'flex w-full min-h-[44px] items-center gap-3 rounded-xl px-3 text-left text-sm font-semibold text-ink hover:bg-plum-50 hover:text-plum-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700';

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={t('product.share')}
        onClick={() => setOpen((o) => !o)}
        className="grid h-12 w-12 place-items-center rounded-full border border-line bg-white text-plum-800 shadow-sm transition-all hover:-translate-y-0.5 hover:border-plum-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
      >
        <Share2 className="h-5 w-5" aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-14 z-30 w-56 origin-top-right rounded-2xl border border-line bg-white p-2 shadow-lift"
          >
            <p className="px-3 pb-1 pt-1.5 text-xs font-bold uppercase tracking-[0.12em] text-plum-600">{t('product.share')}</p>
            <a href={`https://wa.me/?text=${text}`} target="_blank" rel="noopener noreferrer" className={item} onClick={() => setOpen(false)}>
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden />
              WhatsApp
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={item}
              onClick={() => setOpen(false)}
            >
              <Facebook className="h-4 w-4 text-blue-600" aria-hidden />
              Facebook
            </a>
            <button type="button" className={item} onClick={copy}>
              {copied ? <Check className="h-4 w-4 text-emerald-600" aria-hidden /> : <Link2 className="h-4 w-4 text-plum-600" aria-hidden />}
              {copied ? t('product.linkCopied') : t('product.copyLink')}
            </button>
            {canNative && (
              <button type="button" className={item} onClick={native}>
                <Share2 className="h-4 w-4 text-plum-600" aria-hidden />
                {t('product.moreOptions')}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}