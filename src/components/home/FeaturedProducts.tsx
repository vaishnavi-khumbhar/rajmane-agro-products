import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCTS } from '@/data/catalog';
import { useLang } from '@/context/LanguageContext';

export function FeaturedProducts() {
  const { t } = useLang();
  const featured = PRODUCTS.filter((p) => p.status === 'active')
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 8);
  return (
    <section className="section !pt-6 sm:!pt-8 bg-gradient-to-b from-plum-50/70 to-ivory">
      <div className="container-site">
        <SectionHeading
          eyebrow={t('home.featuredEyebrow')}
          title={t('home.featuredTitle')}
          lead={t('home.featuredLead')}
          action={
            <ButtonLink to="/shop" variant="secondary" iconRight={<ArrowRight className="h-4 w-4" aria-hidden />}>
              {t('nav.allProducts')}
            </ButtonLink>
          }
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.08} className="h-full">
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}