import { motion } from 'framer-motion';
import { Phone, RotateCcw, XCircle } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { ButtonAnchor, ButtonLink } from '@/components/ui/Button';
import { SITE } from '@/config/site';

export default function OrderFailedPage() {
  const { t } = useLang();
  usePageMeta(t('order.failedTitle'));
  return (
    <section className="container-site flex justify-center py-14 sm:py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card w-full max-w-xl p-6 text-center sm:p-10">
        <motion.span
          initial={{ rotate: -20, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 14 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-danger-bg text-danger"
        >
          <XCircle className="h-10 w-10" aria-hidden />
        </motion.span>
        <h1 className="mt-5 font-display text-display-md font-medium text-plum-900" role="alert">
          {t('order.failedTitle')}
        </h1>
        <p className="mt-3 text-ink-muted">{t('order.failedText')}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/checkout" icon={<RotateCcw className="h-4 w-4" aria-hidden />}>
            {t('order.retry')}
          </ButtonLink>
          <ButtonLink to="/cart" variant="secondary">
            {t('order.backToCart')}
          </ButtonLink>
          <ButtonAnchor href={`tel:${SITE.phoneE164}`} variant="ghost" icon={<Phone className="h-4 w-4" aria-hidden />}>
            {t('common.call')}
          </ButtonAnchor>
        </div>
      </motion.div>
    </section>
  );
}
