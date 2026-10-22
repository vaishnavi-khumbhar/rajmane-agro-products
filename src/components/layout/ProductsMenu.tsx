import { useEffect, useId, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { Img } from '@/components/ui/Img';
import { PRODUCTS } from '@/data/catalog';

/**
 * Navbar "Products": the word itself opens the Shop page; hovering (or the arrow button / ArrowDown key)
 * opens a list of every product, each linking straight to its details page.
 */
export function ProductsMenu({ linkClass, underline }: { linkClass: (active: boolean) => string; underline: (show: boolean) => React.ReactNode }) {
  const { t, L, money } = useLang();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number>();
  const id = useId();
  const products = PRODUCTS.filter((p) => p.status === 'active');
  const active = pathname === '/shop' || pathname.startsWith('/products') || pathname.startsWith('/product/');

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => !wrapRef.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = window.setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node) && setOpen(false)}
    >
      <NavLink to="/shop" className={`${linkClass(active)} !pr-1`} onKeyDown={(e) => e.key === 'ArrowDown' && (e.preventDefault(), show(), setTimeout(() => wrapRef.current?.querySelector<HTMLElement>('[data-menu-item]')?.focus(), 30))}>
        {t('nav.products')}
        {underline(active)}
      </NavLink>
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-menu`}
        aria-label={`${t('nav.products')} — ${t('nav.allProducts')}`}
        onClick={() => (open ? setOpen(false) : show())}
        className="grid h-8 w-7 place-items-center rounded-md text-ink/70 hover:text-plum-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
      >
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={`${id}-menu`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
              <ul className="max-h-[60vh] overflow-y-auto p-2">
                {products.map((p) => (
                  <li key={p.id}>
                    <Link
                      data-menu-item
                      to={`/product/${p.slug}`}
                      className={`flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-plum-50 focus-visible:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${
                        pathname === `/product/${p.slug}` ? 'bg-plum-50' : ''
                      }`}
                    >
                      <span className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-ivory-200">
                        <Img image={p.images[0]} alt="" sizes="48px" className="h-full w-full object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[0.95rem] font-semibold text-ink">{L(p.name)}</span>
                        <span className="block truncate text-xs text-ink-muted">{L(p.short)}</span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-plum-800">{money(p.demoPrice)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                data-menu-item
                to="/shop"
                className="flex items-center justify-between border-t border-line bg-plum-50/60 px-4 py-3 text-sm font-bold text-plum-800 hover:bg-plum-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700"
              >
                {t('nav.allProducts')}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}