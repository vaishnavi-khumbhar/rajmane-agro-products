import { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 2 | 3 }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
  const base = useId();
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <div className="space-y-2.5 sm:space-y-3">
      {items.map((item, i) => {
        const expanded = open === item.id;
        const btnId = `${base}-${item.id}-btn`;
        const panelId = `${base}-${item.id}-panel`;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
              expanded
                ? 'border-plum-400/50 shadow-lift'
                : 'border-line shadow-card hover:-translate-y-0.5 hover:border-plum-200 hover:shadow-lift'
            }`}
          >
            {/* animated accent bar */}
            <span
              aria-hidden
              className={`absolute inset-y-0 left-0 w-1.5 origin-top bg-gradient-to-b from-plum-400 via-plum-600 to-plum-800 transition-transform duration-500 ${
                expanded ? 'scale-y-100' : 'scale-y-0'
              }`}
            />
            {/* soft glow when open */}
            <span
              aria-hidden
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-plum-50 via-white to-ivory transition-opacity duration-500 ${
                expanded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <H className="relative font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : item.id)}
                className="flex w-full items-center gap-3 px-3.5 py-3.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700 sm:gap-4 sm:px-6 sm:py-4"
              >
                <span
                  aria-hidden
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-xs sm:h-10 sm:w-10 sm:text-sm font-bold transition-all duration-300 ${
                    expanded ? 'bg-plum-700 text-white shadow-[0_8px_18px_-8px_rgba(122,36,112,.9)]' : 'bg-plum-50 text-plum-700 group-hover:bg-plum-100'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`min-w-0 flex-1 text-[0.95rem] font-semibold leading-snug transition-colors duration-300 sm:text-lg sm:leading-normal ${expanded ? 'text-plum-800' : 'text-ink group-hover:text-plum-800'}`}>
                  {item.title}
                </span>
                <motion.span
                  animate={{ rotate: expanded ? 135 : 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border sm:h-9 sm:w-9 transition-colors duration-300 ${
                    expanded ? 'border-plum-700 bg-plum-700 text-white' : 'border-line text-plum-700 group-hover:border-plum-400'
                  }`}
                >
                  <Plus className="h-4 w-4" aria-hidden />
                </motion.span>
              </button>
            </H>
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                  className="relative overflow-hidden"
                >
                  <motion.p
                    initial={{ y: -8 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
                    className="px-4 pb-4 pl-[3.6rem] text-[0.95rem] leading-relaxed text-ink-muted sm:px-6 sm:pb-5 sm:pl-[4.9rem] sm:text-[1.02rem]"
                  >
                    {item.content}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}