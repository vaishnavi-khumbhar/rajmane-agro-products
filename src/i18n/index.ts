import en, { type Dict } from './en';
import mr from './mr';
import hi from './hi';
import type { Lang } from '@/data/types';

export const DICTIONARIES: Record<Lang, Dict> = { en, mr, hi };

export const LANGUAGES: { code: Lang; label: string; native: string; locale: string }[] = [
  { code: 'en', label: 'English', native: 'English', locale: 'en-IN' },
  { code: 'mr', label: 'Marathi', native: 'मराठी', locale: 'mr-IN' },
  { code: 'hi', label: 'Hindi', native: 'हिन्दी', locale: 'hi-IN' },
];

type Section = keyof Dict;
export type TKey = { [S in Section]: `${S}.${Extract<keyof Dict[S], string>}` }[Section];

/** Looks up `section.key` in the active dictionary, falling back to English, then interpolates {vars}. */
export function translate(lang: Lang, key: TKey, vars?: Record<string, string | number>): string {
  const [section, k] = key.split('.') as [Section, string];
  const pick = (d: Dict) => (d[section] as Record<string, string> | undefined)?.[k];
  let out = pick(DICTIONARIES[lang]) || pick(en) || key;
  if (vars) for (const [name, v] of Object.entries(vars)) out = out.split(`{${name}}`).join(String(v));
  return out;
}
