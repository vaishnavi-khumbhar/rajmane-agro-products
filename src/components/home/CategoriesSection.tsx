import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { LotusMark } from '@/components/ui/LotusMark';
import { CategoryCard } from '@/components/product/CategoryCard';
import { CATEGORIES } from '@/data/catalog';
import { useLang } from '@/context/LanguageContext';

export function CategoriesSection() {
  const { t } = useLang();
  return (
    <section className="relative overflow-hidden pb-14 pt-8 sm:pb-20 sm:pt-10" aria-labelledby="cat-title">
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-plum-100/50 blur-3xl" aria-hidden />
      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-plum-200 bg-white px-4 py-1.5 text-[0.8rem] font-extrabold uppercase tracking-[0.16em] text-plum-700 shadow-sm">
            <LotusMark className="h-4 w-4 text-plum-500" />
           Welcome To Rajmane Products!
          </p>
          <h2 id="cat-title" className="mt-4 font-display text-[clamp(2rem,1.5rem+2.2vw,3.1rem)] font-semibold leading-tight text-plum-950">
            {t('home.discoverTitle')}
          </h2>
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-3 block h-1 w-20 origin-center rounded-full bg-gradient-to-r from-plum-600 via-plum-400 to-jaggery-500"
            aria-hidden
          />
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-muted sm:text-lg">{t('home.discoverLead')}</p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.12} className={i === 2 ? 'sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.75rem)] lg:col-span-1 lg:mx-0 lg:w-auto' : ''}>
              <CategoryCard category={c} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}