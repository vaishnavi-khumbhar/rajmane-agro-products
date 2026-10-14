import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { LotusMark } from './LotusMark';

interface Props {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  action?: ReactNode;
  tone?: 'default' | 'light';
  id?: string;
}

export function SectionHeading({ eyebrow, title, lead, align = 'left', as: H = 'h2', action, tone = 'default', id }: Props) {
  const center = align === 'center';
  const light = tone === 'light';
  return (
    <Reveal className={`flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'mx-auto max-w-4xl' : 'max-w-4xl'}>
        {eyebrow && (
          <p className={`eyebrow ${light ? '!text-plum-100' : ''}`}>
            <LotusMark className="h-4 w-4" />
            {eyebrow}
          </p>
        )}
        <H id={id} className={`mt-3 font-display ${H === 'h1' ? 'text-display-lg' : 'text-display-md'} font-medium ${light ? 'text-white' : 'text-plum-900'}`}>
          {title}
        </H>
        {lead && <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-plum-100' : 'text-ink-muted'}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </Reveal>
  );
}
