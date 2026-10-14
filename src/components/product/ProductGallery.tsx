import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Img } from '@/components/ui/Img';
import { useLang } from '@/context/LanguageContext';
import { IMAGES, type ImageKey } from '@/config/assets';

const ZOOM = 2.5;

/** Accessible gallery: main image with cross-fade, arrow buttons, keyboard arrows and thumbnail buttons. */
export function ProductGallery({ images, alt }: { images: ImageKey[]; alt: string }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);
  const total = images.length;
  const go = (i: number) => setIndex((i + total) % total);

  // Hover zoom (desktop mouse only): a lens follows the pointer and the zoomed area opens in a pane on the right.
  const boxRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ x: number; y: number; w: number; h: number } | null>(null);
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !boxRef.current) return;
    const r = boxRef.current.getBoundingClientRect();
    const lw = r.width / ZOOM;
    const lh = r.height / ZOOM;
    const x = Math.min(Math.max(e.clientX - r.left - lw / 2, 0), r.width - lw);
    const y = Math.min(Math.max(e.clientY - r.top - lh / 2, 0), r.height - lh);
    setZoom({ x, y, w: r.width, h: r.height });
  };

  return (
    <section aria-label={t('product.gallery')} className="relative flex flex-col gap-4 lg:sticky lg:top-28 lg:z-30">
      <div
        ref={boxRef}
        onPointerMove={onMove}
        onPointerLeave={() => setZoom(null)}
        className="relative aspect-square cursor-crosshair overflow-hidden rounded-xl3 border border-line bg-ivory-200 shadow-card sm:aspect-[5/5]"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') go(index + 1);
          if (e.key === 'ArrowLeft') go(index - 1);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={images[index]}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Img image={images[index]} alt={`${alt} — ${index + 1}/${total}`} priority={index === 0} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full object-cover" />
          </motion.div>
        </AnimatePresence>
        {zoom && (
          <span
            aria-hidden
            className="pointer-events-none absolute z-10 hidden border border-plum-600/70 bg-white/25 shadow-[0_0_0_1px_rgba(255,255,255,.6)] lg:block"
            style={{ left: zoom.x, top: zoom.y, width: zoom.w / ZOOM, height: zoom.h / ZOOM }}
          />
        )}
        {total > 1 && (
          <>
            <button type="button" onClick={() => go(index - 1)} className="icon-btn absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-card backdrop-blur" aria-label={t('product.prevImage')}>
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button type="button" onClick={() => go(index + 1)} className="icon-btn absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 shadow-card backdrop-blur" aria-label={t('product.nextImage')}>
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
            <p className="absolute bottom-3 right-3 rounded-full bg-plum-950/70 px-3 py-1 text-xs font-semibold text-white" aria-live="polite">
              {index + 1} / {total}
            </p>
          </>
        )}
      </div>
      {zoom && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-[calc(100%+1.5rem)] top-0 z-40 hidden aspect-square w-full overflow-hidden rounded-xl3 border border-line bg-white shadow-[0_30px_70px_-20px_rgba(58,16,53,.45)] lg:block"
        >
          <img
            src={IMAGES[images[index]].src}
            alt=""
            className="absolute max-w-none object-cover"
            style={{ width: zoom.w * ZOOM, height: zoom.h * ZOOM, left: -zoom.x * ZOOM, top: -zoom.y * ZOOM }}
          />
        </div>
      )}
      {total > 1 && (
        <ul className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <li key={img}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t('product.showImage', { n: i + 1, total })}
                aria-current={i === index ? 'true' : undefined}
                className={`block aspect-square w-full overflow-hidden rounded-xl border-2 bg-ivory-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700 focus-visible:ring-offset-2 ${
                  i === index ? 'border-plum-700' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <Img image={img} alt="" sizes="120px" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}