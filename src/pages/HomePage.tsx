import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { Hero } from '@/components/home/Hero';
import { CategoriesSection } from '@/components/home/CategoriesSection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BenefitsSection } from '@/components/home/BenefitsSection';
import { WholesaleSection } from '@/components/home/WholesaleSection';
import { StorySection } from '@/components/home/StorySection';
import { ProcessSection } from '@/components/home/ProcessSection';
import { FaqPreview } from '@/components/home/FaqPreview';
import { ContactCta } from '@/components/home/ContactCta';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { ExperienceCta } from '@/components/home/ExperienceCta';

export default function HomePage() {
  const { t } = useLang();
  usePageMeta('', t('home.heroLead'), '/');
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <BenefitsSection />
      <ReviewsSection />
      <WholesaleSection />
      <StorySection />
      <ProcessSection />
      <FaqPreview />
      <ExperienceCta />
      <ContactCta />
    </>
  );
}