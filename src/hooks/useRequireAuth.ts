import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';

/**
 * Returns a guard: `if (!requireAuth()) return;`
 * When the customer is not logged in it shows a message and sends them to /login,
 * remembering the current page so they come straight back after logging in.
 */
export function useRequireAuth() {
  const { user } = useAuth();
  const { t } = useLang();
  const { notify } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  return useCallback(() => {
    if (user) return true;
    notify(t('login.required'), { tone: 'info' });
    navigate('/login', { state: { from: location.pathname + location.search } });
    return false;
  }, [user, notify, t, navigate, location.pathname, location.search]);
}