import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Home, ShoppingBag, Store, UserRound } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import type { TKey } from '@/i18n';

/** App-style bottom navigation on phones and small tablets (hidden on desktop). */
export function MobileTabBar() {
  const { t } = useLang();
  const { count } = useCart();
  const { count: wish } = useWishlist();
  const tabs: { to: string; label: TKey; icon: typeof Home; badge?: number; end?: boolean }[] = [
    { to: '/', label: 'nav.home', icon: Home, end: true },
    { to: '/shop', label: 'nav.shop', icon: Store },
    { to: '/wishlist', label: 'nav.wishlist', icon: Heart, badge: wish },
    { to: '/cart', label: 'nav.cart', icon: ShoppingBag, badge: count },
    { to: '/login', label: 'nav.login', icon: UserRound },
  ];
  return (
    <nav
      aria-label={t('nav.primary')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-16px_rgba(58,16,53,.35)] backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-xl grid-cols-5">
        {tabs.map(({ to, label, icon: Icon, badge, end }) => (
          <li key={to}>
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `relative flex h-full flex-col items-center justify-center gap-1 text-[0.68rem] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-plum-700 ${
                  isActive ? 'text-plum-700' : 'text-ink-muted hover:text-plum-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.span layoutId="tab-pill" className="absolute top-0 h-[3px] w-10 rounded-b-full bg-plum-700" aria-hidden />}
                  <span className="relative">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 1.8} aria-hidden />
                    {!!badge && (
                      <span className="absolute -right-2.5 -top-1.5 grid h-4 min-w-[1rem] place-items-center rounded-full bg-plum-700 px-1 text-[0.6rem] font-bold text-white ring-2 ring-white" aria-hidden>
                        {badge > 9 ? '9+' : badge}
                      </span>
                    )}
                  </span>
                  <span className="max-w-full truncate px-0.5">
                    {t(label)}
                    {!!badge && <span className="sr-only"> ({badge})</span>}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}