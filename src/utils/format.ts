import type { Lang, Localized } from '@/data/types';
import { LANGUAGES } from '@/i18n';

const localeOf = (lang: Lang) => LANGUAGES.find((l) => l.code === lang)?.locale ?? 'en-IN';

export function formatINR(amount: number, lang: Lang = 'en') {
  return new Intl.NumberFormat(localeOf(lang), {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
    numberingSystem: 'latn',
  } as Intl.NumberFormatOptions).format(amount);
}

export function formatDate(iso: string, lang: Lang = 'en') {
  return new Intl.DateTimeFormat(localeOf(lang), { dateStyle: 'medium', numberingSystem: 'latn' } as Intl.DateTimeFormatOptions).format(new Date(iso));
}

export const pickLocalized = (text: Localized, lang: Lang) => text[lang] || text.en;
