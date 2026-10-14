import type { ImageKey } from '@/config/assets';

export type Lang = 'en' | 'mr' | 'hi';
/** Text with an English source and optional Marathi / Hindi translations (English is the fallback). */
export type Localized = { en: string } & Partial<Record<Exclude<Lang, 'en'>, string>>;

export type CategorySlug = 'jaggery' | 'jaggery-powder' | 'jaggery-cubes';

export interface Category {
  slug: CategorySlug;
  /** i18n key prefix inside `categories` and `shop` dictionaries */
  key: 'jaggery' | 'powder' | 'cubes';
  image: ImageKey;
  heroImage: ImageKey;
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';

export interface Product {
  id: string;
  slug: string;
  sku: string;
  category: CategorySlug;
  name: Localized;
  short: Localized;
  description: Localized;
  form: Localized;
  packaging: Localized;
  images: ImageKey[];
  /** DEMO ONLY — placeholder value so the cart can be demonstrated. Replace with admin-managed prices. */
  demoPrice: number;
  /** Optional compare-at price; only shown when actually configured. */
  compareAtPrice?: number;
  /** Pack size / weight is not yet supplied — null renders "To be confirmed". */
  packSize: string | null;
  stock: StockStatus;
  status: 'active' | 'discontinued';
  featured: boolean;
  createdAt: string;
}

export interface CartLine {
  productId: string;
  qty: number;
}

export interface DemoOrder {
  number: string;
  createdAt: string;
  phone: string;
  name: string;
  city: string;
  pincode: string;
  items: { productId: string; name: string; qty: number; unitPrice: number }[];
  subtotal: number;
  result: 'success' | 'failed';
}
