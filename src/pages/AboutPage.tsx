import { useState } from 'react';
import { ArrowRight, Eye, Factory, PackageCheck, Repeat2, Store, Target, Expand } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';
import { Overlay } from '@/components/ui/Overlay';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ButtonLink } from '@/components/ui/Button';
import { ContactCta } from '@/components/home/ContactCta';
import type { ImageKey } from '@/config/assets';

const FACILITY: { image: ImageKey; alt: string; span: string }[] = [
  { image: 'facility1', alt: 'Team members reviewing the jaggery boiling pan at the facility', span: 'sm:col-span-2 sm:row-span-2' },
  { image: 'facility4', alt: 'Stainless-steel processing equipment inside the facility', span: '' },
  { image: 'facility2', alt: 'Visitors outside the Rajmane Agro processing unit', span: '' },
  { image: 'facility6', alt: 'Processing line and boiling pans', span: 'sm:col-span-2' },
  { image: 'facility3', alt: 'Team discussion beside the processing pan', span: '' },
  { image: 'facility5', alt: 'Team inspecting the facility grounds', span: 'sm:row-span-2' },
  { image: 'facility7', alt: 'Processing equipment and storage tanks', span: '' },
];

export default function AboutPage() {
  const { t } = useLang();
  const [zoom, setZoom] = useState<(typeof FACILITY)[number] | null>(null);
  usePageMeta(t('about.eyebrow'), t('home.story1'));

  const values = [
    { icon: Factory, title: t('home.b1'), text: t('home.b1d') },
    { icon: PackageCheck, title: t('home.b2'), text: t('home.b2d') },
    { icon: Repeat2, title: t('home.b3'), text: t('home.b3d') },
    { icon: Store, title: t('home.b4'), text: t('home.b4d') },
  ];

  return (
    <>
      <PageHeader eyebrow={t('about.eyebrow')} title={t('about.title')} lead={t('home.story1')} crumbs={[{ label: t('common.home'), to: '/' }, { label: t('about.eyebrow') }]} />

      <section className="section">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] border-[6px] border-white shadow-lift">
            <div className="aspect-[4/5]">
              <Img image="blockCane" alt="Rajmane jaggery blocks with fresh sugarcane" sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <div>
            <Reveal className="space-y-5 text-lg leading-relaxed text-ink-muted">
              <p>{t('home.story2')}</p>
              <p className="font-display text-2xl leading-snug text-plum-900">{t('home.story3')}</p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                { icon: Target, title: t('home.mission'), text: t('home.missionText') },
                { icon: Eye, title: t('home.vision'), text: t('home.visionText') },
              ].map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.1} className="rounded-xl3 bg-plum-900 p-6 text-white shadow-lift">
                  <Icon className="h-7 w-7 text-plum-200" aria-hidden />
                  <h2 className="mt-4 font-display text-2xl font-medium">{title}</h2>
                  <p className="mt-2 leading-relaxed text-plum-100">{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-ivory-100">
        <div className="container-site">
          <SectionHeading eyebrow={t('about.values')} title={t('home.benefitsTitle')} align="center" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal as="li" key={title} delay={i * 0.08} className="card p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-plum-50 text-plum-700">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-plum-900">{title}</h3>
                <p className="mt-2 text-ink-muted">{text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHeading eyebrow={t('common.company')} title={t('about.facility')} lead={t('about.facilityLead')} />
          <ul className="mt-12 grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-3 lg:auto-rows-[230px] lg:grid-cols-4">
            {FACILITY.map((f, i) => (
              <Reveal as="li" key={f.image} delay={(i % 4) * 0.06} className={`group relative overflow-hidden rounded-xl3 bg-ivory-200 ${f.span}`}>
                <button type="button" onClick={() => setZoom(f)} className="block h-full w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-plum-400" aria-label={f.alt} aria-haspopup="dialog">
                  <Img image={f.image} alt="" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 100vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-plum-800 opacity-0 shadow-card transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Expand className="h-4 w-4" aria-hidden />
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-plum-50/70 to-ivory">
        <div className="container-site grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-display-md font-medium text-plum-900">{t('about.familyTitle')}</h2>
            <p className="mt-4 text-lg text-ink-muted">{t('about.familyText')}</p>
            <ButtonLink to="/shop" className="mt-8" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
              {t('home.heroCta')}
            </ButtonLink>
          </Reveal>
          <div className="grid grid-cols-3 gap-4">
            {(['familyModel', 'familyDenim', 'familyModel2'] as ImageKey[]).map((img, i) => (
              <Reveal key={img} delay={i * 0.1} className={`overflow-hidden rounded-xl3 bg-ivory-200 shadow-card ${i === 1 ? 'mt-10' : ''}`}>
                <div className="aspect-[2/3]">
                  <Img image={img} alt="" sizes="(min-width: 1024px) 18vw, 33vw" className="h-full w-full object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactCta />

      <Overlay open={!!zoom} onClose={() => setZoom(null)} title={zoom?.alt ?? ''} placement="center" widthClass="!max-w-4xl">
        {zoom && <Img image={zoom.image} alt={zoom.alt} priority sizes="90vw" className="max-h-[75dvh] w-full object-contain" />}
      </Overlay>
    </>
  );
}
