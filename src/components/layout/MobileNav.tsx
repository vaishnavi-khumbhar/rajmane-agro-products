import { NavLink } from 'react-router-dom';
import { Phone, ChevronRight, PackageSearch, Heart, ShoppingBag, UserRound } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Overlay } from '@/components/ui/Overlay';
import { useLang } from '@/context/LanguageContext';
import { useUI } from '@/context/UIContext';
import { useAuth } from '@/context/AuthContext';
import { SITE } from '@/config/site';
import { LanguageButtons } from './LanguageSelector';
import { MAIN_LINKS } from './navLinks';
import { PRODUCTS } from '@/data/catalog';
import { Logo } from './Logo';
import { motion } from 'framer-motion';

const linkCls = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-[52px] items-center justify-between rounded-xl px-4 text-lg font-semibold transition-colors hover:bg-plum-50 ${
    isActive ? 'bg-plum-50 text-plum-700' : 'text-ink'
  }`;

export function MobileNav() {
  const { t, L } = useLang();
  const { menuOpen, setMenuOpen } = useUI();
  const close = () => setMenuOpen(false);
  const { count } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();
  const quick = [
    { to: '/login', label: user ? t('nav.account') : t('nav.login'), icon: UserRound },
    { to: '/wishlist', label: `${t('nav.wishlist')}${wishCount ? ` (${wishCount})` : ''}`, icon: Heart },
    { to: '/cart', label: `${t('nav.cart')}${count ? ` (${count})` : ''}`, icon: ShoppingBag },
  ];
  const links = [{ to: '/', label: t('nav.home') }];

  return (
    <Overlay open={menuOpen} onClose={close} title={t('common.menu')} hideTitle placement="right">
      <div className="flex flex-col gap-6 p-4">
        <Logo className="h-12" linked={false} />
        <ul className="grid grid-cols-3 gap-2">
          {quick.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={close}
                className={({ isActive }) =>
                  `flex min-h-[72px] flex-col items-center justify-center gap-1.5 rounded-2xl border px-2 text-center text-[0.8rem] font-semibold transition-colors ${
                    isActive ? 'border-plum-700 bg-plum-700 text-white' : 'border-line bg-plum-50/60 text-plum-900 hover:bg-plum-100'
                  }`
                }
              >
                <Icon className="h-5 w-5" aria-hidden />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
        <nav aria-label={t('nav.primary')}>
          <motion.ul
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
            className="flex flex-col gap-1"
          >
            {links.map((l) => (
              <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                <NavLink to={l.to} end onClick={close} className={linkCls}>
                  {l.label}
                  <ChevronRight className="h-5 w-5 text-ink-soft" aria-hidden />
                </NavLink>
              </motion.li>
            ))}
            <motion.li variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }} className="py-2">
              <NavLink to="/shop" onClick={close} className={linkCls}>
                {t('nav.products')}
                <ChevronRight className="h-5 w-5 text-ink-soft" aria-hidden />
              </NavLink>
              <ul className="ml-4 flex flex-col border-l border-line pl-2">
                {PRODUCTS.filter((p) => p.status === 'active').map((p) => (
                  <li key={p.id}>
                    <NavLink to={`/product/${p.slug}`} onClick={close} className={({ isActive }) => `${linkCls({ isActive })} !min-h-[44px] !text-base !font-medium`}>
                      {L(p.name)}
                      <ChevronRight className="h-4 w-4 text-ink-soft" aria-hidden />
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.li>
            {[...MAIN_LINKS, { to: '/track-order', label: 'nav.track' as const }].map((l) => (
              <motion.li key={l.to} variants={{ hidden: { opacity: 0, x: -12 }, show: { opacity: 1, x: 0 } }}>
                <NavLink to={l.to} onClick={close} className={linkCls}>
                  {t(l.label)}
                  {l.to === '/track-order' ? <PackageSearch className="h-5 w-5 text-ink-soft" aria-hidden /> : <ChevronRight className="h-5 w-5 text-ink-soft" aria-hidden />}
                </NavLink>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{t('common.language')}</p>
          <LanguageButtons />
        </div>
        <a href={`tel:${SITE.phoneE164}`} className="btn btn-secondary">
          <Phone className="h-4 w-4" aria-hidden />
          <span>{SITE.phoneDisplay}</span>
        </a>
      </div>
    </Overlay>
  );
}