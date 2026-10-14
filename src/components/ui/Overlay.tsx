import { useId, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLang } from '@/context/LanguageContext';

type Placement = 'center' | 'right' | 'left' | 'top';

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title: string;
  placement?: Placement;
  children: ReactNode;
  footer?: ReactNode;
  /** Visually hide the title (still announced) */
  hideTitle?: boolean;
  widthClass?: string;
}

const panelMotion: Record<Placement, object> = {
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  top: { initial: { y: -24, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: -24, opacity: 0 } },
  center: { initial: { y: 24, opacity: 0, scale: 0.98 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 16, opacity: 0, scale: 0.98 } },
};

const panelPos: Record<Placement, string> = {
  right: 'inset-y-0 right-0 h-full max-h-[100dvh] w-full max-w-[440px]',
  left: 'inset-y-0 left-0 h-full max-h-[100dvh] w-[88vw] max-w-[380px]',
  // Height is capped to the visible viewport so the result list scrolls instead of running off-screen.
  top: 'inset-x-0 top-0 mx-auto max-h-[100dvh] w-full sm:top-12 sm:max-h-[calc(100dvh-6rem)] sm:max-w-2xl sm:rounded-xl2',
  center: 'inset-0 m-auto h-fit max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg rounded-xl2',
};

/** Accessible dialog/drawer: role=dialog, aria-modal, focus trap, Escape + backdrop close, focus restore. */
export function Overlay({ open, onClose, title, placement = 'center', children, footer, hideTitle, widthClass }: OverlayProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  useFocusTrap(ref, open, onClose);
  const titleId = useId();

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[80]">
          <motion.div
            className="absolute inset-0 bg-plum-950/55 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className={`absolute flex flex-col overflow-hidden bg-white shadow-lift focus:outline-none ${panelPos[placement]} ${widthClass ?? ''}`}
            transition={{ type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.32 }}
            {...panelMotion[placement]}
          >
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <h2 id={titleId} className={hideTitle ? 'sr-only' : 'font-display text-xl font-semibold text-plum-900'}>
                {title}
              </h2>
              <button type="button" onClick={onClose} className="icon-btn ml-auto" aria-label={t('common.close')}>
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer && <div className="border-t border-line bg-ivory-100/60 px-5 py-4">{footer}</div>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}