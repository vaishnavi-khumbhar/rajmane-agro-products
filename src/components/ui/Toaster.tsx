import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { useLang } from '@/context/LanguageContext';

const icons = { success: CheckCircle2, info: Info, error: XCircle };
const tones = {
  success: 'border-success/30 [&_svg.tone]:text-success',
  info: 'border-plum-200 [&_svg.tone]:text-plum-700',
  error: 'border-danger/30 [&_svg.tone]:text-danger',
};

/** Polite live region so screen readers announce cart updates and form results. */
export function Toaster() {
  const { toasts, dismiss } = useToast();
  const { t } = useLang();
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="pointer-events-none fixed inset-x-0 bottom-16 z-[90] flex flex-col items-center gap-2 p-4 sm:right-4 sm:left-auto sm:items-end lg:bottom-4"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = icons[toast.tone];
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.22 }}
              role={toast.tone === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl2 border bg-white p-4 shadow-lift ${tones[toast.tone]}`}
            >
              <Icon className="tone mt-0.5 h-5 w-5 shrink-0" aria-hidden />
              <div className="flex-1 text-[0.95rem] text-ink">
                <p>{toast.message}</p>
                {toast.action && (
                  <button
                    type="button"
                    className="link mt-1 text-sm"
                    onClick={() => {
                      toast.action?.onClick();
                      dismiss(toast.id);
                    }}
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>
              <button type="button" onClick={() => dismiss(toast.id)} className="icon-btn -m-1.5 h-9 w-9" aria-label={t('common.dismiss')}>
                <X className="h-4 w-4" aria-hidden />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}