import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { readJSON, writeJSON } from '@/utils/storage';

/**
 * ⚠️ DEMO AUTH — FRONTEND ONLY ⚠️
 * Accounts are stored in THIS browser's localStorage (password saved only as a SHA-256 hash).
 * This is for UI approval only and is NOT secure. In the backend phase this is replaced by
 * PHP + MySQL (password_hash / password_verify + secure HTTP-only session cookie).
 */
const ACCOUNTS_KEY = 'rajmane.demoAccounts.v1';
const SESSION_KEY = 'rajmane.session.v1';

export interface User {
  name: string;
  email: string;
}
type Accounts = Record<string, { name: string; hash: string }>;
export type AuthError = 'noAccount' | 'wrongPassword' | 'exists';

interface AuthValue {
  user: User | null;
  login: (email: string, password: string) => Promise<AuthError | null>;
  register: (name: string, email: string, password: string) => Promise<AuthError | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | null>(null);

async function sha256(text: string) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

const norm = (email: string) => email.trim().toLowerCase();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const s = readJSON<User | null>(SESSION_KEY, null);
    return s && typeof s.email === 'string' && typeof s.name === 'string' ? s : null;
  });

  const start = useCallback((u: User) => {
    setUser(u);
    writeJSON(SESSION_KEY, u);
  }, []);

  const register = useCallback<AuthValue['register']>(
    async (name, email, password) => {
      const accounts = readJSON<Accounts>(ACCOUNTS_KEY, {});
      const key = norm(email);
      if (accounts[key]) return 'exists';
      accounts[key] = { name: name.trim(), hash: await sha256(password) };
      writeJSON(ACCOUNTS_KEY, accounts);
      start({ name: name.trim(), email: key });
      return null;
    },
    [start],
  );

  const login = useCallback<AuthValue['login']>(
    async (email, password) => {
      const accounts = readJSON<Accounts>(ACCOUNTS_KEY, {});
      const acc = accounts[norm(email)];
      if (!acc) return 'noAccount';
      if (acc.hash !== (await sha256(password))) return 'wrongPassword';
      start({ name: acc.name, email: norm(email) });
      return null;
    },
    [start],
  );

  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      /* storage blocked */
    }
  }, []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
