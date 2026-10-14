import { Factory, PackageCheck, Repeat2, Store } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useLang } from '@/context/LanguageContext';
import type { TKey } from '@/i18n';

const BENEFITS: { icon: typeof Factory; title: TKey; text: TKey }[] = [
  { icon: Factory, title: 'home.b1', text: 'home.b1d' },
  { icon: PackageCheck, title: 'home.b2', text: 'home.b2d' },
  { icon: Repeat2, title: 'home.b3', text: 'home.b3d' },
  { icon: Store, title: 'home.b4', text: 'home.b4d' },
];

export function BenefitsSection() {
  const { t } = useLang();
  return (
    <section className="section relative overflow-hidden bg-plum-900 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(187,70,148,.35),transparent_55%)]" aria-hidden />
      <div className="container-site relative">
        <SectionHeading eyebrow={t('home.benefitsEyebrow')} title={t('home.benefitsTitle')} align="center" tone="light" />
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="group h-full rounded-xl3 border border-white/10 bg-white/[0.06] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/25 hover:bg-white/[0.1]">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-plum-400 to-plum-600 text-white shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon className="h-7 w-7" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold">{t(title)}</h3>
                <p className="mt-2 leading-relaxed text-plum-100">{t(text)}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
