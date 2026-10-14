import { useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, XCircle } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button, ButtonLink } from '@/components/ui/Button';
import { DemoNotice } from '@/components/ui/DemoNotice';
import { SelectField, TextArea, TextField } from '@/components/ui/Field';
import { OrderSummary } from '@/components/product/OrderSummary';
import { INDIAN_STATES } from '@/data/states';
import { isEmail, isIndianMobile, isPincode, normaliseMobile } from '@/utils/validation';
import { createDemoOrderNumber, saveDemoOrder } from '@/utils/demoStore';

type Addr = { address: string; city: string; state: string; pincode: string };
type Values = { name: string; phone: string; email: string; notes: string } & Addr & { billing: Addr };
type Errors = Partial<Record<string, string>>;

const blankAddr: Addr = { address: '', city: '', state: 'Maharashtra', pincode: '' };

export default function CheckoutPage() {
  const { t, L } = useLang();
  const { lines, subtotal, clear } = useCart();
  const { notify } = useToast();
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [v, setV] = useState<Values>({ name: '', phone: '', email: '', notes: '', ...blankAddr, billing: { ...blankAddr } });
  const [billingSame, setBillingSame] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState<null | 'success' | 'failed'>(null);
  usePageMeta(t('checkout.title'));

  const set = (k: keyof Omit<Values, 'billing'>) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };
  const setB = (k: keyof Addr) => (e: { target: { value: string } }) => {
    setV((s) => ({ ...s, billing: { ...s.billing, [k]: e.target.value } }));
    if (errors[`b_${k}`]) setErrors((er) => ({ ...er, [`b_${k}`]: undefined }));
  };

  const validate = (): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = t('checkout.errName');
    if (!isIndianMobile(v.phone)) e.phone = t('checkout.errPhone');
    if (!isEmail(v.email)) e.email = t('checkout.errEmail');
    const addr = (a: Addr, p: string) => {
      if (a.address.trim().length < 8) e[`${p}address`] = t('checkout.errAddress');
      if (a.city.trim().length < 2) e[`${p}city`] = t('checkout.errCity');
      if (!a.state) e[`${p}state`] = t('checkout.errState');
      if (!isPincode(a.pincode)) e[`${p}pincode`] = t('checkout.errPincode');
    };
    addr(v, '');
    if (!billingSame) addr(v.billing, 'b_');
    return e;
  };

  const submit = (result: 'success' | 'failed') => (e?: FormEvent) => {
    e?.preventDefault();
    if (submitting) return; // duplicate-submit guard
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify(t('checkout.fixErrors'), { tone: 'error' });
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(errs)[0]}"]`)?.focus();
      return;
    }
    setSubmitting(result);
    // DEMO ONLY — in the backend phase this becomes POST /api/checkout → Razorpay Checkout → POST /api/payments/verify.
    window.setTimeout(() => {
      if (result === 'failed') {
        navigate('/order-failed');
        return;
      }
      const number = createDemoOrderNumber();
      saveDemoOrder({
        number,
        createdAt: new Date().toISOString(),
        phone: normaliseMobile(v.phone),
        name: v.name.trim(),
        city: v.city.trim(),
        pincode: v.pincode.trim(),
        items: lines.map((l) => ({ productId: l.product.id, name: L(l.product.name), qty: l.qty, unitPrice: l.product.demoPrice })),
        subtotal,
        result: 'success',
      });
      clear();
      navigate(`/order-success?order=${encodeURIComponent(number)}`);
    }, 900);
  };

  if (lines.length === 0 && !submitting) {
    return (
      <>
        <PageHeader title={t('checkout.title')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.cart'), to: '/cart' }, { label: t('checkout.title') }]} />
        <div className="container-site py-16 text-center">
          <p className="text-lg text-ink-muted">{t('checkout.emptyCart')}</p>
          <ButtonLink to="/shop" className="mt-6">
            {t('cart.startShopping')}
          </ButtonLink>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader title={t('checkout.title')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('nav.cart'), to: '/cart' }, { label: t('checkout.title') }]} />
      <div className="container-site py-10 sm:py-14">
        <DemoNotice title={t('checkout.demoTitle')} className="mb-8">
          {t('checkout.demoText')}
        </DemoNotice>
        <form ref={formRef} noValidate onSubmit={submit('success')} className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-8">
            <fieldset className="card p-6 sm:p-8">
              <legend className="sr-only">{t('checkout.contact')}</legend>
              <h2 className="font-display text-2xl font-semibold text-plum-900" aria-hidden>
                1. {t('checkout.contact')}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <TextField className="sm:col-span-2" label={t('checkout.name')} name="name" autoComplete="name" value={v.name} onChange={set('name')} error={errors.name} />
                <TextField label={t('checkout.phone')} name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={14} value={v.phone} onChange={set('phone')} error={errors.phone} hint={t('checkout.phoneHint')} />
                <TextField label={t('checkout.email')} name="email" type="email" autoComplete="email" value={v.email} onChange={set('email')} error={errors.email} />
              </div>
            </fieldset>

            <fieldset className="card p-6 sm:p-8">
              <legend className="sr-only">{t('checkout.shippingAddress')}</legend>
              <h2 className="font-display text-2xl font-semibold text-plum-900" aria-hidden>
                2. {t('checkout.shippingAddress')}
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <TextArea className="sm:col-span-2" rows={2} label={t('checkout.address')} name="address" autoComplete="street-address" value={v.address} onChange={set('address')} error={errors.address} />
                <TextField label={t('checkout.city')} name="city" autoComplete="address-level2" value={v.city} onChange={set('city')} error={errors.city} />
                <SelectField label={t('checkout.state')} name="state" autoComplete="address-level1" value={v.state} onChange={set('state')} error={errors.state}>
                  <option value="">{t('checkout.selectState')}</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </SelectField>
                <TextField label={t('checkout.pincode')} name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} value={v.pincode} onChange={set('pincode')} error={errors.pincode} />
                <TextArea className="sm:col-span-2" rows={2} optional label={t('checkout.notes')} name="notes" value={v.notes} onChange={set('notes')} hint={t('checkout.notesHint')} />
              </div>
              <label className="mt-6 flex min-h-[44px] cursor-pointer items-center gap-3 text-[0.95rem] font-medium">
                <input type="checkbox" checked={billingSame} onChange={(e) => setBillingSame(e.target.checked)} className="h-5 w-5 rounded border-line accent-plum-700" />
                {t('checkout.billingSame')}
              </label>
            </fieldset>

            {!billingSame && (
              <fieldset className="card p-6 sm:p-8">
                <legend className="sr-only">{t('checkout.billing')}</legend>
                <h2 className="font-display text-2xl font-semibold text-plum-900" aria-hidden>
                  {t('checkout.billing')}
                </h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <TextArea className="sm:col-span-2" rows={2} label={t('checkout.address')} name="b_address" autoComplete="billing street-address" value={v.billing.address} onChange={setB('address')} error={errors.b_address} />
                  <TextField label={t('checkout.city')} name="b_city" autoComplete="billing address-level2" value={v.billing.city} onChange={setB('city')} error={errors.b_city} />
                  <SelectField label={t('checkout.state')} name="b_state" value={v.billing.state} onChange={setB('state')} error={errors.b_state}>
                    <option value="">{t('checkout.selectState')}</option>
                    {INDIAN_STATES.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </SelectField>
                  <TextField label={t('checkout.pincode')} name="b_pincode" inputMode="numeric" autoComplete="billing postal-code" maxLength={6} value={v.billing.pincode} onChange={setB('pincode')} error={errors.b_pincode} />
                </div>
              </fieldset>
            )}

            <section className="card p-6 sm:p-8" aria-labelledby="pay-title">
              <h2 id="pay-title" className="font-display text-2xl font-semibold text-plum-900">
                3. {t('checkout.payment')}
              </h2>
              <div className="mt-5 flex items-start gap-4 rounded-xl2 border border-dashed border-plum-200 bg-plum-50/50 p-5">
                <CreditCard className="mt-0.5 h-6 w-6 shrink-0 text-plum-600" aria-hidden />
                <p className="text-ink-muted">{t('checkout.paymentDemo')}</p>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <OrderSummary lines={lines} subtotal={subtotal} showItems>
              <div className="flex flex-col gap-3">
                <Button type="submit" full size="lg" loading={submitting === 'success'} disabled={!!submitting} icon={<Lock className="h-4 w-4" aria-hidden />}>
                  {submitting === 'success' ? t('checkout.processing') : t('checkout.placeDemo')}
                </Button>
                <Button variant="ghost" full loading={submitting === 'failed'} disabled={!!submitting} onClick={() => submit('failed')()} icon={<XCircle className="h-4 w-4" aria-hidden />}>
                  {t('checkout.simulateFail')}
                </Button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink-muted">
                {t('checkout.terms')}{' '}
                <Link to="/terms-and-conditions" className="link">
                  {t('checkout.termsLink')}
                </Link>{' '}
                {t('checkout.and')}{' '}
                <Link to="/refund-and-cancellation-policy" className="link">
                  {t('checkout.refundLink')}
                </Link>
                .
              </p>
            </OrderSummary>
          </div>
        </form>
      </div>
    </>
  );
}
