import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Phone, Send, FlaskConical } from 'lucide-react';
import { Button, ButtonAnchor } from '@/components/ui/Button';
import { SelectField, TextArea, TextField } from '@/components/ui/Field';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { SITE } from '@/config/site';
import { isEmail, isIndianMobile, normaliseMobile } from '@/utils/validation';
import { saveDemoEnquiry } from '@/utils/demoStore';

export type EnquiryType = 'contact' | 'bulk' | 'distributor';
type Values = { type: EnquiryType; name: string; phone: string; email: string; business: string; city: string; quantity: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const empty = (type: EnquiryType): Values => ({ type, name: '', phone: '', email: '', business: '', city: '', quantity: '', message: '' });

export function EnquiryForm({ defaultType = 'contact' }: { defaultType?: EnquiryType }) {
  const { t } = useLang();
  const { notify } = useToast();
  const [values, setValues] = useState<Values>(() => empty(defaultType));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => setValues((v) => ({ ...v, type: defaultType })), [defaultType]);
  useEffect(() => {
    if (status === 'saved') resultRef.current?.focus();
  }, [status]);

  const set = (k: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (v: Values): Errors => {
    const e: Errors = {};
    if (v.name.trim().length < 2) e.name = t('checkout.errName');
    if (!isIndianMobile(v.phone)) e.phone = t('checkout.errPhone');
    if (v.email && !isEmail(v.email)) e.email = t('checkout.errEmail');
    if (v.city.trim().length < 2) e.city = t('checkout.errCity');
    if (v.message.trim().length < 10) e.message = t('enquiry.errMessage');
    return e;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      notify(t('checkout.fixErrors'), { tone: 'error' });
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus('saving');
    // DEMO: no network request. Replace with POST /api/enquiries in the backend phase.
    window.setTimeout(() => {
      saveDemoEnquiry({ ...values, phone: normaliseMobile(values.phone) });
      setStatus('saved');
    }, 700);
  };

  const isBusiness = values.type !== 'contact';

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === 'saved' ? (
        <motion.div
          key="done"
          ref={resultRef}
          tabIndex={-1}
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="rounded-xl2 border border-warn/25 bg-warn-bg p-6 focus:outline-none"
        >
          <FlaskConical className="h-8 w-8 text-warn" aria-hidden />
          <h3 className="mt-3 font-display text-2xl font-semibold text-plum-900">{t('enquiry.demoTitle')}</h3>
          <p className="mt-2 text-[#5c3d00]">{t('enquiry.demoText')}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <ButtonAnchor href={`tel:${SITE.phoneE164}`} icon={<Phone className="h-4 w-4" aria-hidden />}>
              {SITE.phoneDisplay}
            </ButtonAnchor>
            <Button
              variant="secondary"
              onClick={() => {
                setValues(empty(values.type));
                setStatus('idle');
              }}
            >
              {t('enquiry.another')}
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          noValidate
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid gap-5 sm:grid-cols-2"
          aria-label={t('enquiry.title')}
        >
          <SelectField className="sm:col-span-2" label={t('enquiry.type')} name="type" value={values.type} onChange={set('type')}>
            <option value="contact">{t('enquiry.typeContact')}</option>
            <option value="bulk">{t('enquiry.typeBulk')}</option>
            <option value="distributor">{t('enquiry.typeDistributor')}</option>
          </SelectField>
          <TextField label={t('enquiry.name')} name="name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} />
          <TextField
            label={t('enquiry.phone')}
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            maxLength={14}
            value={values.phone}
            onChange={set('phone')}
            error={errors.phone}
            hint={t('checkout.phoneHint')}
          />
          <TextField label={t('enquiry.email')} name="email" type="email" autoComplete="email" optional value={values.email} onChange={set('email')} error={errors.email} />
          <TextField label={t('enquiry.city')} name="city" autoComplete="address-level2" value={values.city} onChange={set('city')} error={errors.city} />
          {isBusiness && (
            <>
              <TextField label={t('enquiry.business')} name="business" autoComplete="organization" optional value={values.business} onChange={set('business')} />
              <TextField label={t('enquiry.quantity')} name="quantity" optional value={values.quantity} onChange={set('quantity')} />
            </>
          )}
          <TextArea className="sm:col-span-2" label={t('enquiry.message')} name="message" value={values.message} onChange={set('message')} error={errors.message} hint={t('enquiry.messageHint')} />
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-sm text-warn">
              <FlaskConical className="h-4 w-4 shrink-0" aria-hidden />
              {t('common.demoBanner')}
            </p>
            <Button type="submit" loading={status === 'saving'} icon={<Send className="h-4 w-4" aria-hidden />} className="shrink-0">
              {status === 'saving' ? t('enquiry.sending') : t('enquiry.submit')}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
