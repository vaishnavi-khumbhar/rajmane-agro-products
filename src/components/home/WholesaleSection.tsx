import { useState } from 'react';
import { Building2, Handshake, PackageOpen, Truck } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';
import { Button } from '@/components/ui/Button';
import { Overlay } from '@/components/ui/Overlay';
import { LotusMark } from '@/components/ui/LotusMark';
import { EnquiryForm, type EnquiryType } from '@/components/forms/EnquiryForm';
import { useLang } from '@/context/LanguageContext';

export function WholesaleSection() {
  const { t } = useLang();
  const [type, setType] = useState<EnquiryType | null>(null);

  return (
    <section id="wholesale" className="section bg-ivory-100" aria-labelledby="wholesale-title">
      <div className="container-site">
        <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-lift lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-full">
            <Img image="facility6" alt="Jaggery processing equipment at the Rajmane Agro facility" sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-plum-950/70 via-plum-900/20 to-transparent" aria-hidden />
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
              {[t('home.wholesaleP1'), t('home.wholesaleP2'), t('home.wholesaleP3')].map((label) => (
                <span key={label} className="rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-semibold text-plum-900 backdrop-blur">
                  {label}
                </span>
              ))}
            </div>
          </div>
          <Reveal className="p-8 sm:p-12">
            <p className="eyebrow">
              <LotusMark className="h-4 w-4" />
              {t('home.wholesaleEyebrow')}
            </p>
            <h2 id="wholesale-title" className="mt-3 font-display text-display-md font-medium text-plum-900">
              {t('home.wholesaleTitle')}
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-muted">{t('home.wholesaleLead')}</p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Building2, label: t('home.wholesaleP1') },
                { icon: PackageOpen, label: t('home.wholesaleP2') },
                { icon: Truck, label: t('home.wholesaleP3') },
                { icon: Handshake, label: t('home.b4') },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 rounded-xl bg-plum-50 px-4 py-3 text-[0.95rem] font-semibold text-plum-900">
                  <Icon className="h-5 w-5 shrink-0 text-plum-600" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setType('distributor')} aria-haspopup="dialog">
                {t('home.becomeDistributor')}
              </Button>
              <Button variant="secondary" onClick={() => setType('bulk')} aria-haspopup="dialog">
                {t('home.bulkEnquiry')}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
      <Overlay
        open={type !== null}
        onClose={() => setType(null)}
        title={type === 'distributor' ? t('home.becomeDistributor') : t('home.bulkEnquiry')}
        placement="center"
        widthClass="!max-w-2xl"
      >
        <div className="p-5 sm:p-6">
          <p className="mb-5 text-ink-muted">{t('enquiry.lead')}</p>
          {type && <EnquiryForm defaultType={type} />}
        </div>
      </Overlay>
    </section>
  );
}
