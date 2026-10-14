// Client-side validation. The PHP backend will repeat every check server-side in the next phase.
export const isIndianMobile = (v: string) => /^[6-9]\d{9}$/.test(v.replace(/[\s-]/g, '').replace(/^(\+91|0)/, ''));
export const isPincode = (v: string) => /^[1-9]\d{5}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const normaliseMobile = (v: string) => v.replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');
