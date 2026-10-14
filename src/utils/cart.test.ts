import { describe, expect, it } from 'vitest';
import { PRODUCTS } from '@/data/catalog';
import { addLine, cartTotals, clampQty, resolveCart } from './cart';
import { isIndianMobile, isPincode } from './validation';
import { translate } from '@/i18n';
import en from '@/i18n/en';
import mr from '@/i18n/mr';
import hi from '@/i18n/hi';

describe('cart maths', () => {
  it('adds, merges and totals lines', () => {
    let lines = addLine([], 'p1', 2);
    lines = addLine(lines, 'p1', 1);
    lines = addLine(lines, 'p2', 1);
    const resolved = resolveCart(lines, PRODUCTS);
    const p1 = PRODUCTS.find((p) => p.id === 'p1')!;
    const p2 = PRODUCTS.find((p) => p.id === 'p2')!;
    expect(resolved).toHaveLength(2);
    expect(cartTotals(resolved)).toEqual({ subtotal: p1.demoPrice * 3 + p2.demoPrice, count: 4 });
  });
  it('drops unknown products and clamps quantity', () => {
    expect(resolveCart([{ productId: 'nope', qty: 1 }], PRODUCTS)).toHaveLength(0);
    expect(clampQty(0)).toBe(1);
    expect(clampQty(999)).toBe(20);
    expect(clampQty(NaN)).toBe(1);
  });
});

describe('validation', () => {
  it('validates Indian mobiles and PIN codes', () => {
    expect(isIndianMobile('9172680896')).toBe(true);
    expect(isIndianMobile('+91 91726 80896')).toBe(true);
    expect(isIndianMobile('5172680896')).toBe(false);
    expect(isPincode('411001')).toBe(true);
    expect(isPincode('011001')).toBe(false);
  });
});

describe('i18n', () => {
  it('has every English key translated in Marathi and Hindi', () => {
    for (const dict of [mr, hi]) {
      for (const [section, keys] of Object.entries(en)) {
        for (const [k, v] of Object.entries(keys as Record<string, string>)) {
          const tr = (dict as unknown as Record<string, Record<string, string>>)[section]?.[k];
          if (v) expect(tr, `${section}.${k}`).toBeTruthy();
        }
      }
    }
  });
  it('interpolates variables', () => {
    expect(translate('en', 'shop.count', { count: 3 })).toBe('3 products');
    expect(translate('mr', 'nav.cart')).toBe('कार्ट');
  });
});
