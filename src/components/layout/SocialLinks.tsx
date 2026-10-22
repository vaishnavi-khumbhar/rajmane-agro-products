import { Facebook, Instagram, Youtube } from 'lucide-react';
import { SITE } from '@/config/site';

const META = {
  facebook: { label: 'Facebook', icon: Facebook, color: 'hover:bg-[#1877F2] hover:border-[#1877F2]' },
  instagram: { label: 'Instagram', icon: Instagram, color: 'hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent' },
  youtube: { label: 'YouTube', icon: Youtube, color: 'hover:bg-[#FF0000] hover:border-[#FF0000]' },
} as const;

// Read SITE.social loosely so this file compiles even if a key (e.g. youtube) is missing from site.ts
const SOCIAL = SITE.social as Partial<Record<keyof typeof META, string>>;

/** Official social profiles from SITE.social — empty or missing URLs are skipped automatically. */
export function SocialLinks({ tone = 'dark', withLabels = false }: { tone?: 'dark' | 'light'; withLabels?: boolean }) {
  const links = (Object.keys(META) as (keyof typeof META)[]).filter((k) => !!SOCIAL[k]);
  if (!links.length) return null;
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((k) => {
        const { label, icon: Icon, color } = META[k];
        return (
          <li key={k}>
            <a
              href={SOCIAL[k]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
              className={`inline-flex h-11 items-center gap-2 rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:text-white focus-visible:outline-none focus-visible:ring-2 ${color} ${
                withLabels ? 'px-4 text-sm font-semibold' : 'w-11 justify-center'
              } ${tone === 'dark' ? 'border-white/25 text-white focus-visible:ring-white' : 'border-line bg-white text-plum-800 focus-visible:ring-plum-700'}`}
            >
              <Icon className="h-5 w-5" aria-hidden />
              {withLabels && <span>{label}</span>}
            </a>
          </li>
        );
      })}
    </ul>
  );
}