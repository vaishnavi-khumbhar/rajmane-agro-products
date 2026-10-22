import { useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/types';
import { useRequireAuth } from '@/hooks/useRequireAuth';

/** Adds to cart (login required) and confirms with an announced toast offering to open the cart. Returns false if the customer had to log in first. */
export function useAddToCart() {
  const { add } = useCart();
  const { t, L } = useLang();
  const { notify } = useToast();
  const navigate = useNavigate();
  const requireAuth = useRequireAuth();
  return useCallback(
    (product: Product, qty: number) => {
      if (!requireAuth()) return false;
      add(product.id, qty);
      notify(t('product.added', { name: L(product.name) }), { action: { label: t('cart.viewCart'), onClick: () => navigate('/cart') } });
      return true;
    },
    [add, notify, t, L, navigate, requireAuth],
  );
}