import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On route change: scroll to top and move focus to <main> so keyboard/screen-reader users land on the new
 * content. Skipped on first load so the "Skip to main content" link stays the first Tab stop.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
