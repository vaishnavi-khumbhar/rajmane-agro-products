# Rajmane Agro Products — Storefront (Frontend Phase)

React 18 + Vite 5 + TypeScript + Tailwind CSS 3 + React Router 6 + Framer Motion + Lucide React.

> **Demo mode.** No backend is connected yet. Products, prices and pack sizes come from
> `src/data/catalog.ts` (clearly marked mock data). Every price shows a "Demo price" label in the UI.
> Checkout, order tracking and enquiries save to **this browser's localStorage only**. Nothing is sent to a server.

## Run locally (Windows PowerShell)

Requires Node.js 18.18+ (20 LTS or 22 LTS recommended).

```powershell
cd rajmane-agro-products\frontend
npm install
npm run dev          # http://localhost:5173
```

Other commands:

```powershell
npm run build        # type-check + production build into .\dist
npm run preview      # serve the production build at http://localhost:4173
npm test             # unit tests (cart maths, validation, translation completeness)
```

If PowerShell blocks `npm` scripts: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

## Where to change things

| What | File |
|---|---|
| Phone, website, social links (hidden until filled), demo flag | `src/config/site.ts` |
| Logo and all photo paths | `src/config/assets.ts` (files in `public/assets`) |
| Homepage hero banners (drop in your designed banner here) | `src/config/banners.ts` |
| Products / demo prices / pack sizes | `src/data/catalog.ts` |
| FAQs (draft — please review) | `src/data/faqs.ts` |
| Policy drafts (`[brackets]` = awaiting confirmation) | `src/data/policies.ts` |
| English / Marathi / Hindi text | `src/i18n/en.ts`, `mr.ts`, `hi.ts` |
| Colours, fonts, button/field styles | `tailwind.config.js`, `src/styles/index.css` |

## Structure

```
src/
  config/      site + asset registry
  data/        MOCK catalogue, FAQs, policies, states, types
  i18n/        dictionaries + typed translate() with English fallback
  context/     Language, Cart (localStorage), Toast, UI (drawers)
  hooks/       usePageMeta, useFocusTrap, useAddToCart
  utils/       cart maths, validation, formatting, demo storage, search
  components/  ui/ layout/ product/ home/ forms/
  layouts/     MainLayout
  pages/       one file per route
  routes/      AppRoutes (lazy-loaded)
```

## Backend hand-off points

- `src/utils/demoStore.ts` → replace with `POST /api/checkout`, `POST /api/payments/verify`, `GET /api/orders/track`, `POST /api/enquiries`
- `src/data/catalog.ts` → replace with `GET /api/products`, `GET /api/categories`
- `src/data/faqs.ts` → `GET /api/faqs`
- `/login` (UI only) → customer OTP login; wishlist (`WishlistContext`) → sync to customer account
- Checkout "Place demo order" → Razorpay Checkout after the server creates the order
