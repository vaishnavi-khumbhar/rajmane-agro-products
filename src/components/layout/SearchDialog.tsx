import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { Overlay } from '@/components/ui/Overlay';
import { Img } from '@/components/ui/Img';
import { useLang } from '@/context/LanguageContext';
import { useUI } from '@/context/UIContext';
import { PRODUCTS } from '@/data/catalog';
import { matchesQuery } from '@/utils/search';

export function SearchDialog() {
  const { t, L, money } = useLang();
  const { searchOpen, setSearchOpen } = useUI();
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const close = () => setSearchOpen(false);
  const results = useMemo(() => PRODUCTS.filter((p) => p.status === 'active' && matchesQuery(p, q)), [q]);

  return (
    <Overlay open={searchOpen} onClose={close} title={t('nav.searchTitle')} placement="top">
      <form
        role="search"
        className="sticky top-0 z-10 bg-white p-5 pb-4 shadow-[0_8px_12px_-12px_rgba(58,16,53,.25)]"
        onSubmit={(e) => {
          e.preventDefault();
          close();
          navigate(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
        }}
      >
        <label htmlFor="site-search" className="sr-only">
          {t('nav.searchTitle')}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" aria-hidden />
          <input
            id="site-search"
            data-autofocus
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t('nav.searchPlaceholder')}
            className="field !min-h-[56px] pl-12 text-lg"
            autoComplete="off"
            aria-describedby="search-status"
          />
        </div>
        <p id="search-status" className="sr-only" aria-live="polite">
          {q && (results.length ? t(results.length === 1 ? 'shop.countOne' : 'shop.count', { count: results.length }) : t('nav.searchEmpty', { q }))}
        </p>
      </form>
      <div className="px-5 pb-5">
        {results.length === 0 ? (
          <div className="rounded-xl2 bg-ivory-100 p-6 text-center">
            <p className="font-semibold text-ink">{t('nav.searchEmpty', { q })}</p>
            <p className="mt-1 text-sm text-ink-muted">{t('nav.searchHint')}</p>
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {results.map((p) => (
              <li key={p.id}>
                <Link to={`/product/${p.slug}`} onClick={close} className="group flex items-center gap-4 rounded-xl p-2 hover:bg-plum-50">
                  <span className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-ivory-200">
                    <Img image={p.images[0]} alt="" sizes="64px" className="h-full w-full object-cover" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink group-hover:text-plum-700">{L(p.name)}</span>
                    <span className="block truncate text-sm text-ink-muted">{L(p.short)}</span>
                  </span>
                  <span className="hidden text-right text-sm sm:block">
                    <span className="block font-semibold">{money(p.demoPrice)}</span>
                    <span className="text-xs text-warn">{t('common.demoPrice')}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Overlay>
  );
}