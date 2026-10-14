import { ArrowRight, Eye, Target } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Img } from '@/components/ui/Img';
import { ButtonLink } from '@/components/ui/Button';
import { LotusMark } from '@/components/ui/LotusMark';
import { useLang } from '@/context/LanguageContext';

export function StorySection() {
  const { t } = useLang();
  return (
    <section className="section" aria-labelledby="story-title">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="grid grid-cols-5 grid-rows-6 gap-4">
            <div className="col-span-3 row-span-6 overflow-hidden rounded-xl3 shadow-card">
              <Img image="facility1" alt="Rajmane Agro team at the jaggery processing facility" sizes="(min-width: 1024px) 28vw, 60vw" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-xl3 shadow-card">
              <Img image="facility4" alt="Processing equipment inside the facility" sizes="(min-width: 1024px) 18vw, 40vw" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-2 row-span-3 overflow-hidden rounded-xl3 shadow-card">
              <Img image="cubesPlate" alt="" sizes="(min-width: 1024px) 18vw, 40vw" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-6 right-6 hidden items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lift sm:flex">
            <LotusMark className="h-8 w-8 text-plum-600" />
            <p className="max-w-[12rem] text-sm font-semibold leading-snug text-plum-900">{t('common.company')}</p>
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">
              <LotusMark className="h-4 w-4" />
              {t('home.storyEyebrow')}
            </p>
            <h2 id="story-title" className="mt-3 font-display text-display-md font-medium text-plum-900">
              {t('home.storyTitle')}
            </h2>
            <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-ink-muted">
              <p>{t('home.story1')}</p>
              <p>{t('home.story2')}</p>
              <p className="font-medium text-ink">{t('home.story3')}</p>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { icon: Target, title: t('home.mission'), text: t('home.missionText') },
              { icon: Eye, title: t('home.vision'), text: t('home.visionText') },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.1} className="rounded-xl2 border border-line bg-white p-5 shadow-card">
                <Icon className="h-6 w-6 text-plum-600" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-semibold text-plum-900">{title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-muted">{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-8">
            <ButtonLink to="/about" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
              {t('home.heroCta2')}
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
