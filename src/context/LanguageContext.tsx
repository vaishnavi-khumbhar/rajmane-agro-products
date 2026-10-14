import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/site';
import type { Lang, Localized } from '@/data/types';
import { translate, type TKey } from '@/i18n';
import { formatINR, pickLocalized } from '@/utils/format';

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey, vars?: Record<string, string | number>) => string;
  L: (text: Localized) => string;
  money: (n: number) => string;
}

const LanguageContext = createContext<LanguageValue | null>(null);
const isLang = (v: unknown): v is Lang => v === 'en' || v === 'mr' || v === 'hi';

function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEYS.lang);
    if (isLang(saved)) return saved;
  } catch {
    /* ignore */
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEYS.lang, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const value = useMemo<LanguageValue>(
    () => ({
      lang,
      setLang,
      t: (key, vars) => translate(lang, key, vars),
      L: (text) => pickLocalized(text, lang),
      money: (n) => formatINR(n, lang),
    }),
    [lang, setLang],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
  return ctx;
}
