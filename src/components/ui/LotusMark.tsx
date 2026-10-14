/** Original lotus ornament inspired by the mark above the Rajmane wordmark (decorative only). */
export function LotusMark({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden focusable="false">
      <path d="M12 3c1.6 2 2.4 4.1 2.4 6.2 0 2.2-.9 4-2.4 5.6-1.5-1.6-2.4-3.4-2.4-5.6C9.6 7.1 10.4 5 12 3Z" />
      <path d="M4.2 7.6c2.5.2 4.5 1.2 5.9 2.9.9 1.1 1.4 2.5 1.6 4.2-1.9.1-3.6-.5-5-1.7C5.2 11.6 4.4 9.8 4.2 7.6Zm15.6 0c-.2 2.2-1 4-2.5 5.4-1.4 1.2-3.1 1.8-5 1.7.2-1.7.7-3.1 1.6-4.2 1.4-1.7 3.4-2.7 5.9-2.9Z" opacity=".75" />
      <path d="M3 15.5c3 .1 6 .8 9 2.5 3-1.7 6-2.4 9-2.5-1.6 2.6-5 4.5-9 4.5s-7.4-1.9-9-4.5Z" opacity=".55" />
    </svg>
  );
}
