import { useId, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, ArrowRight, Eye, EyeOff, Heart, Info, LogOut, PackageSearch, ShoppingBag } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { useAuth, type AuthError } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { asset } from '@/config/paths';
import { Logo } from '@/components/layout/Logo';
import { isEmail } from '@/utils/validation';
import type { TKey } from '@/i18n';

type Tab = 'login' | 'register';
type Errors = Partial<Record<'name' | 'email' | 'password' | 'confirm' | 'form', string>>;

const AUTH_ERR: Record<AuthError, TKey> = {
  noAccount: 'login.errNoAccount',
  wrongPassword: 'login.errWrongPassword',
  exists: 'login.errExists',
};

/** Password input with show / hide toggle (same look as TextField). */
function PasswordField({
  label,
  value,
  onChange,
  error,
  hint,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  autoComplete: string;
}) {
  const { t } = useLang();
  const id = useId();
  const [show, setShow] = useState(false);
  const describedBy = [error ? `${id}-err` : '', hint && !error ? `${id}-hint` : ''].filter(Boolean).join(' ') || undefined;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        <span className="ml-0.5 text-danger" aria-hidden>
          *
        </span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          className="field pr-12"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? t('login.hide') : t('login.show')}
          aria-pressed={show}
          className="absolute right-1.5 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink-muted hover:bg-plum-50 hover:text-plum-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
        >
          {show ? <EyeOff className="h-5 w-5" aria-hidden /> : <Eye className="h-5 w-5" aria-hidden />}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} className="field-error">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

/** Logged-in view: who is logged in + quick links + logout. */
function AccountPanel() {
  const { t } = useLang();
  const { user, logout } = useAuth();
  const { notify } = useToast();
  const { clear } = useCart();
  const { ids, remove } = useWishlist();
  const navigate = useNavigate();
  if (!user) return null;

  const onLogout = () => {
    clear();
    ids.forEach(remove);
    logout();
    notify(t('login.loggedOut'), { tone: 'info' });
    navigate('/');
  };

  const links = [
    { to: '/wishlist', label: t('nav.wishlist'), icon: Heart },
    { to: '/cart', label: t('nav.cart'), icon: ShoppingBag },
    { to: '/track-order', label: t('nav.track'), icon: PackageSearch },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-7">
      <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-plum-50 to-[#FDF1E4] p-5 ring-1 ring-plum-100">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-plum-600 to-plum-800 text-xl font-extrabold text-white shadow-md" aria-hidden>
          {user.name.slice(0, 1).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="text-sm text-ink-muted">{t('login.loggedInAs')}</p>
          <p className="truncate font-display text-xl font-semibold text-plum-950">{user.name}</p>
          <p className="truncate text-sm text-ink-muted">{user.email}</p>
        </div>
      </div>
      <ul className="mt-5 grid gap-3 sm:grid-cols-3">
        {links.map(({ to, label, icon: Icon }) => (
          <li key={to}>
            <ButtonLink to={to} variant="secondary" full icon={<Icon className="h-4 w-4" aria-hidden />}>
              {label}
            </ButtonLink>
          </li>
        ))}
      </ul>
      <Button variant="ghost" full className="mt-5" onClick={onLogout} icon={<LogOut className="h-4 w-4" aria-hidden />}>
        {t('login.logout')}
      </Button>
    </motion.div>
  );
}

/** Customer login / registration with email + password. DEMO: accounts live in this browser until the backend is connected. */
export default function LoginPage() {
  const { t } = useLang();
  const { user, login, register } = useAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from;

  const [tab, setTab] = useState<Tab>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);
  usePageMeta(user ? t('nav.account') : t('nav.login'));

  const switchTab = (k: Tab) => {
    setTab(k);
    setErrors({});
    setPassword('');
    setConfirm('');
    setForgot(false);
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Errors = {};
    if (tab === 'register' && name.trim().length < 2) er.name = t('checkout.errName');
    if (!isEmail(email)) er.email = t('checkout.errEmail');
    if (tab === 'register' ? password.length < 8 : !password) er.password = t('login.errPassword');
    if (tab === 'register' && confirm !== password) er.confirm = t('login.errMatch');
    setErrors(er);
    if (Object.keys(er).length) return;

    setBusy(true);
    const res = tab === 'login' ? await login(email, password) : await register(name, email, password);
    setBusy(false);
    if (res) {
      setErrors({ form: t(AUTH_ERR[res]) });
      return;
    }
    notify(tab === 'login' ? t('login.welcome') : t('login.welcomeNew'));
    navigate(from && from !== '/login' ? from : '/', { replace: true });
  };

  const tabCls = (active: boolean) =>
    `relative flex-1 rounded-full py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${active ? 'text-white' : 'text-plum-900 hover:text-plum-700'}`;

  return (
    <section className="container-site py-6 sm:py-10 lg:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-white shadow-lift lg:grid-cols-2 lg:rounded-[2rem]">
        {/* Image panel — banner on top for mobile/tablet, left column on desktop */}
        <div className="relative h-[340px] overflow-hidden sm:h-[420px] lg:h-auto lg:min-h-[640px]">
          <motion.img
            src={asset('assets/images/login-side.png')}
            alt=""
            width={1024}
            height={1536}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-[center_10%] lg:object-[center_30%]"
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-plum-950/90 via-plum-900/45 to-transparent sm:h-3/4 lg:h-3/5" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-5 pb-12 text-white sm:p-8 sm:pb-14 lg:p-10">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="max-w-sm font-display text-[1.4rem] font-medium leading-tight sm:text-3xl"
            >
              {t('common.tagline')}
            </motion.p>
            <ul className="mt-3 hidden flex-wrap gap-2 sm:flex lg:mt-6 lg:flex-col lg:gap-3">
              {[
                { icon: PackageSearch, label: t('login.b1') },
                { icon: Heart, label: t('login.b2') },
                { icon: ShoppingBag, label: t('login.b3') },
              ].map(({ icon: Icon, label }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur lg:gap-3 lg:bg-transparent lg:p-0 lg:text-base lg:backdrop-blur-0"
                >
                  <span className="grid h-5 w-5 place-items-center lg:h-9 lg:w-9 lg:rounded-full lg:bg-white/15 lg:backdrop-blur">
                    <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden />
                  </span>
                  {label}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form panel — overlaps the image on mobile like an app sheet */}
        <div className="relative -mt-7 min-w-0 rounded-t-[1.75rem] bg-white p-5 pt-7 sm:p-10 lg:mt-0 lg:rounded-none">
          <span className="mx-auto mb-5 block h-1.5 w-12 rounded-full bg-plum-100 lg:hidden" aria-hidden />
          <Logo className="hidden h-12 lg:block" />
          <h1 className="font-display text-display-md font-medium text-plum-900 lg:mt-6">{user ? t('nav.account') : t('login.title')}</h1>
          <p className="mt-2 text-ink-muted">{user ? t('login.accountLead') : from ? t('login.required') : t('login.lead')}</p>

          {user ? (
            <AccountPanel />
          ) : (
            <>
              <div role="tablist" aria-label={t('nav.account')} className="relative mt-7 flex rounded-full bg-plum-50 p-1">
                {(['login', 'register'] as Tab[]).map((k) => (
                  <button key={k} role="tab" type="button" aria-selected={tab === k} className={tabCls(tab === k)} onClick={() => switchTab(k)}>
                    {tab === k && (
                      <motion.span layoutId="login-tab" className="absolute inset-0 rounded-full bg-plum-700 shadow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} aria-hidden />
                    )}
                    <span className="relative">{k === 'login' ? t('login.tabLogin') : t('login.tabRegister')}</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.form
                  key={tab}
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-7 space-y-5"
                >
                  {errors.form && (
                    <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-semibold text-danger ring-1 ring-red-100">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                      {errors.form}
                    </p>
                  )}
                  {tab === 'register' && (
                    <TextField label={t('login.name')} name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
                  )}
                  <TextField
                    label={t('login.email')}
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={errors.email}
                  />
                  <PasswordField
                    label={t('login.password')}
                    value={password}
                    onChange={setPassword}
                    error={errors.password}
                    hint={tab === 'register' ? t('login.passwordHint') : undefined}
                    autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                  />
                  {tab === 'register' && (
                    <PasswordField label={t('login.confirmPassword')} value={confirm} onChange={setConfirm} error={errors.confirm} autoComplete="new-password" />
                  )}

                  {tab === 'login' && (
                    <div className="-mt-2 text-right">
                      <button type="button" className="link text-sm" onClick={() => setForgot((f) => !f)} aria-expanded={forgot}>
                        {t('login.forgot')}
                      </button>
                      <AnimatePresence>
                        {forgot && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 overflow-hidden rounded-xl bg-plum-50 p-3 text-left text-sm text-plum-900"
                          >
                            {t('login.forgotText')}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  <Button type="submit" full size="lg" loading={busy} iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                    {tab === 'login' ? t('login.loginBtn') : t('login.registerBtn')}
                  </Button>

                  <p className="text-center text-sm text-ink-muted">
                    {tab === 'login' ? t('login.noAccount') : t('login.haveAccount')}{' '}
                    <button type="button" className="link font-semibold" onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}>
                      {tab === 'login' ? t('login.tabRegister') : t('login.tabLogin')}
                    </button>
                  </p>
                </motion.form>
              </AnimatePresence>

              <p className="mt-6 flex items-start gap-2 rounded-xl border border-dashed border-amber-300 bg-amber-50/70 p-3 text-xs leading-relaxed text-amber-900">
                <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {t('login.demoNote')}
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}