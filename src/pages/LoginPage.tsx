import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, PackageSearch, Zap, ArrowRight } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { Button, ButtonLink } from '@/components/ui/Button';
import { TextField } from '@/components/ui/Field';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { Img } from '@/components/ui/Img';
import { Logo } from '@/components/layout/Logo';
import { isIndianMobile } from '@/utils/validation';

type Tab = 'login' | 'register';

/** Customer login UI (mobile + OTP pattern). DEMO ONLY: no OTP is sent and no account is created. */
export default function LoginPage() {
  const { t } = useLang();
  const [tab, setTab] = useState<Tab>('login');
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState<{ mobile?: string; name?: string }>({});
  const [done, setDone] = useState(false);
  usePageMeta(t('nav.login'));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!isIndianMobile(mobile)) er.mobile = t('checkout.errPhone');
    if (tab === 'register' && name.trim().length < 2) er.name = t('checkout.errName');
    setErrors(er);
    if (Object.keys(er).length) return;
    setDone(true);
  };

  const tabCls = (active: boolean) =>
    `relative flex-1 rounded-full py-2.5 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 ${active ? 'text-white' : 'text-plum-900 hover:text-plum-700'}`;

  return (
    <section className="container-site py-10 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift lg:grid-cols-2">
        <div className="relative hidden min-h-[560px] lg:block">
          <Img image="cubesPlate" alt="" priority sizes="40vw" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-plum-950/95 via-plum-900/50 to-plum-900/10" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white">
            <p className="font-display text-3xl font-medium leading-tight">{t('common.tagline')}</p>
            <ul className="mt-6 space-y-3">
              {[
                { icon: PackageSearch, label: t('login.b1') },
                { icon: Heart, label: t('login.b2') },
                { icon: Zap, label: t('login.b3') },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 font-semibold">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <Logo className="h-12" />
          <h1 className="mt-6 font-display text-display-md font-medium text-plum-900">{t('login.title')}</h1>
          <p className="mt-2 text-ink-muted">{t('login.lead')}</p>

          <div role="tablist" aria-label={t('nav.account')} className="relative mt-7 flex rounded-full bg-plum-50 p-1">
            {(['login', 'register'] as Tab[]).map((k) => (
              <button
                key={k}
                role="tab"
                type="button"
                aria-selected={tab === k}
                className={tabCls(tab === k)}
                onClick={() => {
                  setTab(k);
                  setDone(false);
                  setErrors({});
                }}
              >
                {tab === k && <motion.span layoutId="login-tab" className="absolute inset-0 rounded-full bg-plum-700 shadow" transition={{ type: 'spring', stiffness: 400, damping: 32 }} aria-hidden />}
                <span className="relative">{k === 'login' ? t('login.tabLogin') : t('login.tabRegister')}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-7 space-y-5" role="status">
                <DemoNotice title={t('login.demoTitle')}>{t('login.demoText')}</DemoNotice>
                <ButtonLink to="/shop" full size="lg" iconRight={<ArrowRight className="h-5 w-5" aria-hidden />}>
                  {t('login.guest')}
                </ButtonLink>
              </motion.div>
            ) : (
              <motion.form key={tab} noValidate onSubmit={submit} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-7 space-y-5">
                {tab === 'register' && <TextField label={t('login.name')} name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />}
                <TextField
                  label={t('login.mobile')}
                  name="mobile"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  maxLength={14}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  error={errors.mobile}
                  hint={t('checkout.phoneHint')}
                />
                <Button type="submit" full size="lg">
                  {t('login.sendOtp')}
                </Button>
                <ButtonLink to="/shop" variant="ghost" full>
                  {t('login.guest')}
                </ButtonLink>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
