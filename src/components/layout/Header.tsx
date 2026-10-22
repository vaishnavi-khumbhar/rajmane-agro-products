import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import { ProductsMenu } from './ProductsMenu';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { MAIN_LINKS } from './navLinks';

function Underline({ show }: { show: boolean }) {
  return show ? (
    <motion.span
      layoutId="nav-underline"
      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-gradient-to-r from-plum-700 via-plum-500 to-jaggery-500"
      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
      aria-hidden
    />
  ) : null;
}

const linkBase =
  'relative inline-flex h-11 items-center px-3 text-[0.97rem] font-semibold transition-colors focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700';

function CountBadge({ count }: { count: number }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.3, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className="absolute -right-0.5 -top-0.5 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-gradient-to-br from-plum-600 to-plum-800 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white"
          aria-hidden
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function IconLink({ to, label, children, count, className = '' }: { to: string; label: string; children: ReactNode; count?: number; className?: string }) {
  return (
    <NavLink to={to} aria-label={label} className={({ isActive }) => `icon-btn relative ${isActive ? 'bg-plum-50 text-plum-700' : ''} ${className}`}>
      {children}
      {count !== undefined && <CountBadge count={count} />}
    </NavLink>
  );
}

export function Header() {
  const { t } = useLang();
  const { user } = useAuth();
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { setSearchOpen, setMenuOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 90);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'border-line shadow-[0_10px_30px_-20px_rgba(58,16,53,.5)]' : 'border-line/60'
      }`}
    >
      <div className={`container-site flex items-center gap-2 transition-[height] duration-300 ${scrolled ? 'h-[66px]' : 'h-[76px]'}`}>
        <Logo className={`transition-[height] duration-300 ${scrolled ? 'h-10' : 'h-11 sm:h-[52px]'}`} />

        <nav aria-label={t('nav.primary')} className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-1 xl:gap-2">
            <li>
              <NavLink to="/" end className={({ isActive }) => `${linkBase} ${isActive ? 'text-plum-800' : 'text-ink/80 hover:text-plum-800'}`}>
                {({ isActive }) => (
                  <>
                    {t('nav.home')}
                    <Underline show={isActive} />
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <ProductsMenu
                linkClass={(active) => `${linkBase} ${active ? 'text-plum-800' : 'text-ink/80 hover:text-plum-800'}`}
                underline={(show) => <Underline show={show} />}
              />
            </li>
            {MAIN_LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => `${linkBase} ${isActive ? 'text-plum-800' : 'text-ink/80 hover:text-plum-800'}`}>
                  {({ isActive }) => (
                    <>
                      {t(l.label)}
                      <Underline show={isActive} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1 lg:ml-0">
          <button type="button" className="icon-btn" onClick={() => setSearchOpen(true)} aria-label={t('nav.search')} aria-haspopup="dialog">
            <Search className="h-5 w-5" aria-hidden />
          </button>
          <div className="hidden md:block">
            <LanguageSelector compact />
          </div>
          <IconLink to="/wishlist" label={`${t('nav.wishlist')} (${wishCount})`} count={wishCount} className="hidden lg:inline-grid">
            <Heart className="h-5 w-5" aria-hidden />
          </IconLink>
          <IconLink to="/cart" label={t('nav.cartCount', { count })} count={count} className="hidden lg:inline-grid">
            <ShoppingBag className="h-5 w-5" aria-hidden />
          </IconLink>
          <Link
            to="/login"
            aria-label={user ? `${t('nav.account')}: ${user.name}` : undefined}
            className="ml-2 hidden h-11 items-center gap-2 rounded-full bg-gradient-to-r lg:inline-flex from-plum-700 to-plum-600 px-5 text-sm font-bold text-white shadow-[0_10px_20px_-12px_rgba(122,36,112,.9)] transition-all hover:from-plum-800 hover:to-plum-700 hover:shadow-[0_14px_24px_-12px_rgba(122,36,112,.9)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 active:scale-[0.97]"
          >
            {user ? (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs font-extrabold" aria-hidden>
                {user.name.slice(0, 1).toUpperCase()}
              </span>
            ) : (
              <UserRound className="h-4 w-4" aria-hidden />
            )}
            <span className="max-w-[8rem] truncate">{user ? user.name.split(' ')[0] : t('nav.login')}</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="ml-1 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-plum-600 to-plum-800 text-white shadow-[0_8px_18px_-10px_rgba(122,36,112,.9)] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 lg:hidden"
            aria-label={t('nav.openMenu')}
            aria-haspopup="dialog"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}