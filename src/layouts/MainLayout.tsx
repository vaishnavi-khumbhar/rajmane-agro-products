import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LanguageContext';
import { TopBars } from '@/components/layout/TopBars';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { SearchDialog } from '@/components/layout/SearchDialog';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { Toaster } from '@/components/ui/Toaster';
import { MobileTabBar } from '@/components/layout/MobileTabBar';
import { FloatingContact } from '@/components/layout/FloatingContact';

function PageFallback() {
  return (
    <div className="container-site py-24" aria-busy="true">
      <div className="skeleton h-10 w-2/3 max-w-lg" />
      <div className="skeleton mt-4 h-5 w-full max-w-2xl" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton aspect-[4/5] rounded-xl3" />
        ))}
      </div>
    </div>
  );
}

export function MainLayout() {
  const { t } = useLang();
  const { pathname } = useLocation();
  return (
    <>
      <a href="#main" className="skip-link">
        {t('common.skipToContent')}
      </a>
      <ScrollToTop />
      <TopBars />
      <Header />
      <main id="main" tabIndex={-1} className="min-h-[60vh] focus:outline-none">
        <Suspense fallback={<PageFallback />}>
          <motion.div key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <Outlet />
          </motion.div>
        </Suspense>
      </main>
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <FloatingContact />
      <MobileTabBar />
      <MobileNav />
      <SearchDialog />
      <Toaster />
    </>
  );
}