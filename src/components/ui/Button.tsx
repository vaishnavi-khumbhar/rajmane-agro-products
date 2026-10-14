import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export type Variant = 'primary' | 'secondary' | 'ghost' | 'light' | 'outline-light';
type Size = 'md' | 'sm' | 'lg';

// Full class names written out so Tailwind's content scanner keeps them in the build.
const VARIANTS: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  light: 'btn-light',
  'outline-light': 'btn-outline-light',
};
const SIZES: Record<Size, string> = { sm: 'btn-sm', md: '', lg: 'btn-lg' };

const cls = (variant: Variant, size: Size, full?: boolean, extra = '') =>
  ['btn', VARIANTS[variant], SIZES[size], full ? 'w-full' : '', extra]
    .filter(Boolean)
    .join(' ');

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  full?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', loading, full, icon, iconRight, className, children, disabled, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cls(variant, size, full, className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </button>
  );
});

interface ButtonLinkProps extends LinkProps {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

export function ButtonLink({ variant = 'primary', size = 'md', full, icon, iconRight, className, children, ...rest }: ButtonLinkProps) {
  return (
    <Link className={cls(variant, size, full, className)} {...rest}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </Link>
  );
}

export function ButtonAnchor({
  variant = 'primary',
  size = 'md',
  full,
  icon,
  className,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; full?: boolean; icon?: ReactNode }) {
  return (
    <a className={cls(variant, size, full, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </a>
  );
}
