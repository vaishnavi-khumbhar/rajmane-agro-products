import { Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/data/types';

/** Share via the device's share sheet when available (mobile); otherwise copies the product link. */
export function ShareButton({ product, className = '' }: { product: Product; className?: string }) {
  const { t, L } = useLang();
  const { notify } = useToast();
  const name = L(product.name);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: L(product.short), url });
      } catch {
        /* user dismissed the share sheet */
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      notify(t('product.linkCopied'), { tone: 'success' });
    } catch {
      window.prompt(t('product.share'), url);
    }
  };

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={share}
      aria-label={`${t('product.share')}: ${name}`}
      title={t('product.share')}
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white/95 text-plum-800 shadow-card backdrop-blur transition-colors hover:border-plum-300 hover:bg-plum-50 hover:text-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 ${className}`}
    >
      <Share2 className="h-5 w-5" aria-hidden />
    </motion.button>
  );
}