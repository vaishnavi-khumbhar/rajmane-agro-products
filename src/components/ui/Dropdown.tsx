import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface DropdownItem {
  key: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  onSelect: () => void;
}

interface DropdownProps {
  label: ReactNode;
  /** Accessible name when label is visual only */
  ariaLabel?: string;
  items: DropdownItem[];
  align?: 'left' | 'right';
  buttonClassName?: string;
  menuClassName?: string;
  /** "menu" for actions/navigation, "listbox"-like selection is expressed via menuitemradio */
  selectable?: boolean;
}

/** WAI-ARIA menu button: Enter/Space/ArrowDown opens, arrows/Home/End move, Escape closes and returns focus. */
export function Dropdown({ label, ariaLabel, items, align = 'left', buttonClassName = '', menuClassName = '', selectable }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (open) menuRef.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]')[active]?.focus();
  }, [open, active]);

  const openAt = (i: number) => {
    setActive(i);
    setOpen(true);
  };
  const close = (focusButton = true) => {
    setOpen(false);
    if (focusButton) btnRef.current?.focus();
  };

  const onMenuKey = (e: React.KeyboardEvent) => {
    const n = items.length;
    if (e.key === 'ArrowDown') setActive((a) => (a + 1) % n);
    else if (e.key === 'ArrowUp') setActive((a) => (a - 1 + n) % n);
    else if (e.key === 'Home') setActive(0);
    else if (e.key === 'End') setActive(n - 1);
    else if (e.key === 'Escape') close();
    else if (e.key === 'Tab') setOpen(false);
    else return;
    if (e.key !== 'Tab') e.preventDefault();
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        id={`${id}-btn`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        aria-label={ariaLabel}
        className={`inline-flex items-center gap-1.5 ${buttonClassName}`}
        onClick={() => (open ? close() : openAt(Math.max(0, items.findIndex((i) => i.selected))))}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            openAt(e.key === 'ArrowDown' ? 0 : items.length - 1);
          }
        }}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            id={`${id}-menu`}
            role="menu"
            aria-labelledby={`${id}-btn`}
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className={`absolute z-50 mt-2 min-w-[14rem] origin-top rounded-xl2 border border-line bg-white p-2 shadow-lift ${
              align === 'right' ? 'right-0' : 'left-0'
            } ${menuClassName}`}
          >
            {items.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role={selectable ? 'menuitemradio' : 'menuitem'}
                aria-checked={selectable ? !!item.selected : undefined}
                tabIndex={i === active ? 0 : -1}
                onClick={() => {
                  item.onSelect();
                  close(false);
                }}
                onMouseEnter={() => setActive(i)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[0.95rem] text-ink outline-none transition-colors hover:bg-plum-50 focus-visible:bg-plum-50 focus-visible:ring-2 focus-visible:ring-plum-700 ${
                  item.selected ? 'font-semibold text-plum-800' : ''
                }`}
              >
                {item.icon}
                <span className="flex-1">
                  <span className="block">{item.label}</span>
                  {item.description && <span className="block text-sm font-normal text-ink-muted">{item.description}</span>}
                </span>
                {selectable && item.selected && <span className="h-2 w-2 rounded-full bg-plum-700" aria-hidden />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
