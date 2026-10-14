import { FlaskConical } from 'lucide-react';
import type { ReactNode } from 'react';

/** Clearly marks demo-only behaviour until the PHP backend is connected. */
export function DemoNotice({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div role="note" className={`flex gap-3 rounded-xl2 border border-warn/25 bg-warn-bg p-4 text-[0.95rem] text-[#5c3d00] ${className}`}>
      <FlaskConical className="mt-0.5 h-5 w-5 shrink-0 text-warn" aria-hidden />
      <div>
        {title && <p className="font-semibold">{title}</p>}
        <div className={title ? 'mt-0.5' : ''}>{children}</div>
      </div>
    </div>
  );
}
