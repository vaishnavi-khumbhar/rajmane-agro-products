import { Globe2 } from 'lucide-react';
import { Dropdown } from '@/components/ui/Dropdown';
import { useLang } from '@/context/LanguageContext';
import { LANGUAGES } from '@/i18n';

export function LanguageSelector({ compact }: { compact?: boolean }) {
  const { lang, setLang, t } = useLang();
  const current = LANGUAGES.find((l) => l.code === lang)!;
  return (
    <Dropdown
      selectable
      align="right"
      ariaLabel={`${t('common.language')}: ${current.native}`}
      buttonClassName="h-11 rounded-full border border-line bg-white px-2.5 text-sm font-semibold text-plum-900 hover:bg-plum-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-700"
      label={
        <>
          <Globe2 className="h-[18px] w-[18px] text-plum-600" aria-hidden />
          <span className="inline-grid h-6 min-w-[2rem] place-items-center rounded-md bg-gradient-to-br from-plum-600 to-plum-800 px-1.5 text-[0.72rem] font-extrabold tracking-wider text-white">
            {current.code.toUpperCase()}
          </span>
          {!compact && <span className="hidden xl:inline">{current.native}</span>}
        </>
      }
      items={LANGUAGES.map((l) => ({
        key: l.code,
        icon: (
          <span className="inline-grid h-7 w-9 shrink-0 place-items-center rounded-md bg-plum-50 text-[0.72rem] font-extrabold tracking-wider text-plum-800">
            {l.code.toUpperCase()}
          </span>
        ),
        label: l.native,
        description: l.label,
        selected: l.code === lang,
        onSelect: () => setLang(l.code),
      }))}
    />
  );
}

/** Segmented control version for the mobile drawer and footer. */
export function LanguageButtons({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t('common.language')} className="flex flex-wrap gap-2">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.code}
          aria-pressed={lang === l.code}
          onClick={() => setLang(l.code)}
          className={`min-h-[44px] rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 ${
            tone === 'dark'
              ? 'border-white/25 text-plum-50 hover:bg-white/10 focus-visible:ring-white aria-pressed:border-white aria-pressed:bg-white aria-pressed:text-plum-900'
              : 'border-line text-plum-900 hover:bg-plum-50 focus-visible:ring-plum-700 aria-pressed:border-plum-700 aria-pressed:bg-plum-700 aria-pressed:text-white'
          }`}
        >
          {l.native}
        </button>
      ))}
    </div>
  );
}