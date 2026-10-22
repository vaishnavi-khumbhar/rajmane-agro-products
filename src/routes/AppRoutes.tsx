import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import { RequireAuth } from '@/routes/RequireAuth';

// Route-level code splitting: only the homepage ships in the initial bundle.
const ShopPage = lazy(() => import('@/pages/ShopPage'));
const ProductDetailPage = lazy(() => import('@/pages/ProductDetailPage'));
const CartPage = lazy(() => import('@/pages/CartPage'));
const CheckoutPage = lazy(() => import('@/pages/CheckoutPage'));
const OrderSuccessPage = lazy(() => import('@/pages/OrderSuccessPage'));
const OrderFailedPage = lazy(() => import('@/pages/OrderFailedPage'));
const TrackOrderPage = lazy(() => import('@/pages/TrackOrderPage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const PolicyPage = lazy(() => import('@/pages/PolicyPage'));
const WishlistPage = lazy(() => import('@/pages/WishlistPage'));
const LoginPage = lazy(() => import('@/pages/LoginPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="products/jaggery" element={<ShopPage key="jaggery" category="jaggery" />} />
        <Route path="products/jaggery-powder" element={<ShopPage key="jaggery-powder" category="jaggery-powder" />} />
        <Route path="products/jaggery-cubes" element={<ShopPage key="jaggery-cubes" category="jaggery-cubes" />} />
        <Route path="product/:slug" element={<ProductDetailPage />} />
       <Route path="cart" element={<RequireAuth><CartPage /></RequireAuth>} />
<Route path="wishlist" element={<RequireAuth><WishlistPage /></RequireAuth>} />
<Route path="checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />
        <Route path="login" element={<LoginPage />} />
        <Route path="order-success" element={<OrderSuccessPage />} />
        <Route path="order-failed" element={<OrderFailedPage />} />
        <Route path="track-order" element={<TrackOrderPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PolicyPage key="privacy" slug="privacy-policy" />} />
        <Route path="terms-and-conditions" element={<PolicyPage key="terms" slug="terms-and-conditions" />} />
        <Route path="shipping-policy" element={<PolicyPage key="shipping" slug="shipping-policy" />} />
        <Route path="refund-and-cancellation-policy" element={<PolicyPage key="refund" slug="refund-and-cancellation-policy" />} />
        <Route path="disclaimer" element={<PolicyPage key="disclaimer" slug="disclaimer" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}