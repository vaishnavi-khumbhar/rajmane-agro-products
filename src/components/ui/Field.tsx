import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

interface Base {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  className?: string;
}

function useFieldIds(error?: string, hint?: string) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return { id, hintId, errId, describedBy: [errId, hintId].filter(Boolean).join(' ') || undefined };
}

function Shell({ id, label, optional, hint, hintId, error, errId, className, children }: Base & { id: string; hintId?: string; errId?: string; children: ReactNode }) {
  const { t } = useLang();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-ink-muted">({t('common.optional')})</span>
        ) : (
          <span className="ml-0.5 text-danger" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={errId} className="field-error">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

export function TextField({ label, hint, error, optional, className, ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <input
        id={ids.id}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        required={!optional}
        {...input}
      />
    </Shell>
  );
}

export function TextArea({ label, hint, error, optional, className, ...input }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <textarea
        id={ids.id}
        rows={4}
        className="field min-h-[120px] resize-y"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        required={!optional}
        {...input}
      />
    </Shell>
  );
}

export function SelectField({ label, hint, error, optional, className, children, ...input }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <select
        id={ids.id}
        className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%237a2470%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        required={!optional}
        {...input}
      >
        {children}
      </select>
    </Shell>
  );
}
