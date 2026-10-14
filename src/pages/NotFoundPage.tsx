import { Home, ShoppingBag } from 'lucide-react';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { ButtonLink } from '@/components/ui/Button';
import { LotusMark } from '@/components/ui/LotusMark';

export default function NotFoundPage({ title, text }: { title?: string; text?: string }) {
  const { t } = useLang();
  usePageMeta(title ?? t('notFound.title'));
  return (
    <section className="container-site flex flex-col items-center py-24 text-center">
      <LotusMark className="h-16 w-16 text-plum-300" />
      <p className="mt-4 font-display text-7xl font-semibold text-plum-200">404</p>
      <h1 className="mt-2 font-display text-display-md font-medium text-plum-900">{title ?? t('notFound.title')}</h1>
      <p className="mt-3 max-w-md text-ink-muted">{text ?? t('notFound.text')}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink to="/" icon={<Home className="h-4 w-4" aria-hidden />}>
          {t('notFound.home')}
        </ButtonLink>
        <ButtonLink to="/shop" variant="secondary" icon={<ShoppingBag className="h-4 w-4" aria-hidden />}>
          {t('nav.allProducts')}
        </ButtonLink>
      </div>
    </section>
  );
}
