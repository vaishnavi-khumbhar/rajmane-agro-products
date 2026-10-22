import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';
import { useLang } from '@/context/LanguageContext';

interface Base {
  label: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  /** Hide the * / (optional) marker, e.g. inside a filter panel where every field is optional */
  plain?: boolean;
  className?: string;
}

function useFieldIds(error?: string, hint?: string) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return { id, hintId, errId, describedBy: [errId, hintId].filter(Boolean).join(' ') || undefined };
}

function Shell({ id, label, optional, plain, hint, hintId, error, errId, className, children }: Base & { id: string; hintId?: string; errId?: string; children: ReactNode }) {
  const { t } = useLang();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}
        {plain ? null : optional ? (
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

export function TextField({ label, hint, error, optional, plain, className, ...input }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, plain, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <input
        id={ids.id}
        className="field"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        required={!optional && !plain}
        {...input}
      />
    </Shell>
  );
}

export function TextArea({ label, hint, error, optional, plain, className, ...input }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, plain, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <textarea
        id={ids.id}
        rows={4}
        className="field min-h-[120px] resize-y"
        aria-invalid={error ? true : undefined}
        aria-describedby={ids.describedBy}
        required={!optional && !plain}
        {...input}
      />
    </Shell>
  );
}

export function SelectField({ label, hint, error, optional, plain, className, children, ...input }: Base & SelectHTMLAttributes<HTMLSelectElement>) {
  const ids = useFieldIds(error, hint);
  return (
    <Shell {...{ label, hint, error, optional, plain, className }} id={ids.id} hintId={ids.hintId} errId={ids.errId}>
      <div className="relative">
        <select
          id={ids.id}
          className="field cursor-pointer appearance-none pr-11"
          aria-invalid={error ? true : undefined}
          aria-describedby={ids.describedBy}
          required={!optional && !plain}
          {...input}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-plum-700" aria-hidden />
      </div>
    </Shell>
  );
}