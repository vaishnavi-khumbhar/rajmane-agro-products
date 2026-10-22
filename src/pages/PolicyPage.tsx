import { usePageMeta } from '@/hooks/usePageMeta';
import { useLang } from '@/context/LanguageContext';
import { PageHeader } from '@/components/ui/PageHeader';
import { POLICIES, type PolicySlug } from '@/data/policies';
import { formatDate } from '@/utils/format';

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export default function PolicyPage({ slug }: { slug: PolicySlug }) {
  const { t, lang } = useLang();
  const policy = POLICIES[slug];
  const title = t(`policy.${policy.titleKey}`);
  usePageMeta(title, policy.intro);

  return (
    <>
      <PageHeader title={title} lead={t('policy.lastUpdated', { date: formatDate(policy.updated, lang) })} crumbs={[{ label: t('common.home'), to: '/' }, { label: title }]} />
      <div className="container-site grid gap-10 py-10 sm:py-14 lg:grid-cols-[16rem_1fr]">
        <nav aria-label={t('policy.onThisPage')} className="hidden lg:block">
          <div className="sticky top-28">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">{t('policy.onThisPage')}</p>
            <ul className="mt-3 space-y-1 border-l border-line">
              {policy.sections.map((s) => (
                <li key={s.heading}>
                  <a href={`#${slugify(s.heading)}`} className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-ink-muted hover:border-plum-700 hover:text-plum-800">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <article className="min-w-0 max-w-3xl [overflow-wrap:anywhere]" lang="en">
          {lang !== 'en' && <p className="mb-6 rounded-xl bg-plum-50 p-4 text-sm text-plum-900" lang={lang}>{t('policy.englishOnly')}</p>}
          <p className="text-lg leading-relaxed text-ink">{policy.intro}</p>
          {policy.sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} className="mt-10 scroll-mt-28">
              <h2 className="font-display text-2xl font-semibold text-plum-900">{s.heading}</h2>
              {s.body?.map((p, i) => (
                <p key={i} className="mt-3 leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink-muted">
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-plum-500" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((p, i) => (
                <p key={`a${i}`} className="mt-3 leading-relaxed text-ink-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </>
  );
}