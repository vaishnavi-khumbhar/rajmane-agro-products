import { BrowserRouter } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { UIProvider } from '@/context/UIContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { AppRoutes } from '@/routes/AppRoutes';

export default function App() {
  return (
    // reducedMotion="user": Framer Motion drops transform/layout animations for prefers-reduced-motion users.
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
            <BrowserRouter>
              <UIProvider>
                <AppRoutes />
              </UIProvider>
            </BrowserRouter>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
