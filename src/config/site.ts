// Verified business details supplied by Rajmane Agro. Edit here only — every component reads from this file.
export const SITE = {
  brand: 'Rajmane Agro Products',
  company: 'Rajmane Agro Farmers Producers Limited',
  url: 'https://www.rajmaneagroproducts.com',
  phoneDisplay: '+91 73871 01619',
  phoneE164: '+917387101619',
  whatsappDisplay: '+91 91681 01619',
  whatsappUrl: 'https://wa.me/919168101619',
  email: 'rajmaneagrofpc4400@gmail.com',
  mapUrl: 'https://maps.app.goo.gl/FTyV5ciXBnKdxxd5A',
  // Social links: intentionally empty until official URLs are confirmed. Footer hides empty entries.
   social: {
    facebook: 'https://www.facebook.com/profile.php?id=61593061823773',
    instagram: 'https://www.instagram.com/rajmane_agro_farmer/',
    
  },
  // Frontend phase flag. When the PHP API is connected, set to false and wire services/ to real endpoints.
  demoMode: true,
} as const;

export const STORAGE_KEYS = {
  cart: 'rajmane.cart.v1',
  lang: 'rajmane.lang',
  announcement: 'rajmane.announcement.dismissed',
  wishlist: 'rajmane.wishlist.v1',
  demoOrders: 'rajmane.demoOrders.v1',
  demoEnquiries: 'rajmane.demoEnquiries.v1',
} as const;