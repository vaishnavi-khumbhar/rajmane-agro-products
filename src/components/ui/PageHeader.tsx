import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs } from './Breadcrumbs';
import { LotusMark } from './LotusMark';

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs: { label: string; to?: string }[];
  children?: ReactNode;
}

/** Compact page hero used on inner pages. */
export function PageHeader({ eyebrow, title, lead, crumbs, children }: Props) {
  return (
    <header className="relative overflow-hidden border-b border-line bg-gradient-to-b from-plum-50 to-ivory">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum-200/40 blur-3xl" aria-hidden />
      <div className="container-site relative py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-6 max-w-3xl">
          {eyebrow && (
            <p className="eyebrow">
              <LotusMark className="h-4 w-4" />
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 font-display text-display-lg font-medium text-plum-900">{title}</h1>
          {lead && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{lead}</p>}
        </motion.div>
        {children}
      </div>
    </header>
  );
}
