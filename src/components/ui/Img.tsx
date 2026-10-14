import { useState, type ImgHTMLAttributes } from 'react';
import { IMAGES, type ImageKey } from '@/config/assets';

interface ImgProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  image: ImageKey;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

/** Responsive image from the asset registry with srcset, intrinsic size (no layout shift) and a soft fade-in. */
export function Img({ image, alt, sizes = '(min-width: 1024px) 50vw, 100vw', priority, className = '', ...rest }: ImgProps) {
  const a = IMAGES[image];
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={a.src}
      srcSet={`${a.srcSm} 700w, ${a.src} ${a.width}w`}
      sizes={sizes}
      width={a.width}
      height={a.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      // @ts-expect-error fetchpriority is valid HTML but not yet in React 18 types
      fetchpriority={priority ? 'high' : undefined}
      onLoad={() => setLoaded(true)}
      className={`transition-opacity duration-700 ${loaded || priority ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...rest}
    />
  );
}
