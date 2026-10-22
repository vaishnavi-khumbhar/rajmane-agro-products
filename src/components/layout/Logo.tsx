import { Link } from 'react-router-dom';
import { BRAND } from '@/config/assets';
import { SITE } from '@/config/site';

export function Logo({ className = 'h-20', linked = true }: { className?: string; linked?: boolean }) {
  const img = (
    <img
      src={BRAND.logo}
      width={BRAND.logoWidth}
      height={BRAND.logoHeight}
      alt={linked ? `${SITE.brand} — home` : SITE.brand}
      className={`w-auto object-contain ${className}`}
      decoding="async"
    />
  );

  return linked ? (
    <Link to="/" className="inline-flex shrink-0 rounded-lg">
      {img}
    </Link>
  ) : (
    img
  );
}