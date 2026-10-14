import { useCallback } from 'react';
import { useCart } from '@/context/CartContext';
import { useLang } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/types';

/** Adds to cart and confirms with an announced toast offering to open the cart. */
export function useAddToCart() {
  const { add } = useCart();
  const { t, L } = useLang();
  const { notify } = useToast();
  const navigate = useNavigate();
  return useCallback(
    (product: Product, qty: number) => {
      add(product.id, qty);
      notify(t('product.added', { name: L(product.name) }), { action: { label: t('cart.viewCart'), onClick: () => navigate('/cart') } });
    },
    [add, notify, t, L, navigate],
  );
}
