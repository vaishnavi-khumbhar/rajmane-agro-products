// DEMO persistence for orders/enquiries. Nothing here reaches a server; it is replaced by API calls later.
import { STORAGE_KEYS } from '@/config/site';
import type { DemoOrder } from '@/data/types';
import { readJSON, writeJSON } from './storage';
import { normaliseMobile } from './validation';

export function createDemoOrderNumber(now = new Date()) {
  const p = (n: number) => String(n).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `DEMO-${String(now.getFullYear()).slice(2)}${p(now.getMonth() + 1)}${p(now.getDate())}-${rand}`;
}

export function saveDemoOrder(order: DemoOrder) {
  const all = readJSON<DemoOrder[]>(STORAGE_KEYS.demoOrders, []);
  writeJSON(STORAGE_KEYS.demoOrders, [order, ...all].slice(0, 20));
}

export function findDemoOrder(number: string, phone?: string) {
  const all = readJSON<DemoOrder[]>(STORAGE_KEYS.demoOrders, []);
  return all.find(
    (o) => o.number.toUpperCase() === number.trim().toUpperCase() && (phone === undefined || o.phone === normaliseMobile(phone)),
  );
}

export function saveDemoEnquiry(enquiry: Record<string, string>) {
  const all = readJSON<Record<string, string>[]>(STORAGE_KEYS.demoEnquiries, []);
  writeJSON(STORAGE_KEYS.demoEnquiries, [{ ...enquiry, savedAt: new Date().toISOString() }, ...all].slice(0, 20));
}
