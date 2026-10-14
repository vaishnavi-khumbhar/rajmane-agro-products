/**
 * ⚠️  MOCK PRODUCT DATA — FRONTEND DEMONSTRATION ONLY  ⚠️
 *
 * - Prices (`demoPrice`) are placeholders so the cart and checkout can be demonstrated. They are labelled
 *   "Demo price" everywhere in the UI. They are NOT Rajmane Agro's real prices.
 * - Pack sizes / weights have not been supplied, so `packSize` is null and renders "To be confirmed".
 * - Product names and forms are taken from the supplied product photography.
 * - No certifications, nutrition facts, health claims, ratings or reviews are included.
 *
 * In the backend phase this file is replaced by GET /api/products (MySQL), managed from the admin panel.
 */
import type { Category, Product } from './types';

export const CATEGORIES: Category[] = [
  { slug: 'jaggery', key: 'jaggery', image: 'blockCane', heroImage: 'blockPack' },
  { slug: 'jaggery-powder', key: 'powder', image: 'powderBowl', heroImage: 'heroPowder' },
  { slug: 'jaggery-cubes', key: 'cubes', image: 'cubesPlate', heroImage: 'cubesJar' },
];

const catDesc = {
  jaggery: {
    en: 'Enjoy the familiar taste of jaggery, suitable for traditional Indian recipes and everyday use.',
    mr: 'पारंपरिक भारतीय पाककृती व रोजच्या वापरासाठी योग्य, गुळाची ओळखीची चव अनुभवा.',
    hi: 'पारंपरिक भारतीय व्यंजनों और रोज़मर्रा के उपयोग के लिए उपयुक्त, गुड़ का जाना-पहचाना स्वाद पाएँ।',
  },
  powder: {
    en: 'Make everyday sweetening convenient with jaggery powder. Ideal for beverages, cooking and homemade sweets.',
    mr: 'गूळ पावडरमुळे रोजचे गोड करणे सोयीचे. पेये, स्वयंपाक आणि घरगुती मिठायांसाठी उत्तम.',
    hi: 'गुड़ पाउडर से रोज़ की मिठास आसान बनाएँ। पेय, खाना पकाने और घर की मिठाइयों के लिए आदर्श।',
  },
  cubes: {
    en: 'Conveniently portioned jaggery cubes, ideal for everyday use and sharing.',
    mr: 'योग्य प्रमाणात कापलेले गुळाचे क्यूब्स — रोजच्या वापरासाठी व वाटून खाण्यासाठी.',
    hi: 'सुविधाजनक रूप से कटे गुड़ के क्यूब्स, रोज़ के उपयोग और बाँटने के लिए आदर्श।',
  },
};

const packed = {
  en: 'Carefully processed and hygienically packed by Rajmane Agro Farmers Producers Limited.',
  mr: 'राजमाने ॲग्रो फार्मर्स प्रोड्युसर्स लिमिटेडद्वारे काळजीपूर्वक प्रक्रिया व स्वच्छ पॅकिंग.',
  hi: 'राजमाने एग्रो फार्मर्स प्रोड्यूसर्स लिमिटेड द्वारा सावधानी से प्रसंस्कृत और स्वच्छ रूप से पैक।',
};

const join = (a: typeof packed, b: typeof packed) => ({ en: `${a.en} ${b.en}`, mr: `${a.mr} ${b.mr}`, hi: `${a.hi} ${b.hi}` });

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    slug: 'jaggery-block-pack',
    sku: 'DEMO-JAG-BLK',
    category: 'jaggery',
    name: { en: 'Jaggery Block Pack', mr: 'गूळ ढेप पॅक', hi: 'गुड़ ब्लॉक पैक' },
    short: { en: 'Traditional sweetness in every bite.', mr: 'प्रत्येक घासात पारंपरिक गोडवा.', hi: 'हर निवाले में पारंपरिक मिठास।' },
    description: join(catDesc.jaggery, packed),
    form: { en: 'Block', mr: 'ढेप', hi: 'ब्लॉक' },
    packaging: { en: 'Sealed pack', mr: 'सीलबंद पॅक', hi: 'सीलबंद पैक' },
    images: ['blockPack', 'blockCane', 'heroRange'],
    demoPrice: 120,
    compareAtPrice: 135, // DEMO MRP
    packSize: null,
    stock: 'in_stock',
    status: 'active',
    featured: true,
    createdAt: '2026-10-01',
  },
  {
    id: 'p2',
    slug: 'jaggery-powder-jar',
    sku: 'DEMO-JAG-PWD',
    category: 'jaggery-powder',
    name: { en: 'Jaggery Powder Jar', mr: 'गूळ पावडर जार', hi: 'गुड़ पाउडर जार' },
    short: { en: 'Convenient sweetness for everyday cooking.', mr: 'रोजच्या स्वयंपाकासाठी सोयीस्कर गोडवा.', hi: 'रोज़ के खाने के लिए सुविधाजनक मिठास।' },
    description: join(catDesc.powder, packed),
    form: { en: 'Powder', mr: 'पावडर', hi: 'पाउडर' },
    packaging: { en: 'Jar with screw cap', mr: 'झाकण असलेला जार', hi: 'ढक्कन वाला जार' },
    images: ['powderJar', 'powderPair', 'powderBowl', 'heroPowder'],
    demoPrice: 150,
    compareAtPrice: 180, // DEMO MRP
    packSize: null,
    stock: 'in_stock',
    status: 'active',
    featured: true,
    createdAt: '2026-10-05',
  },
  {
    id: 'p3',
    slug: 'jaggery-cubes-jar',
    sku: 'DEMO-JAG-CUB',
    category: 'jaggery-cubes',
    name: { en: 'Jaggery Cubes Jar', mr: 'गूळ क्यूब्स जार', hi: 'गुड़ क्यूब्स जार' },
    short: { en: 'Perfectly portioned sweetness, ready to enjoy.', mr: 'योग्य प्रमाणातील गोडवा, आस्वादासाठी तयार.', hi: 'सही मात्रा में मिठास, आनंद के लिए तैयार।' },
    description: join(catDesc.cubes, packed),
    form: { en: 'Cubes', mr: 'क्यूब्स', hi: 'क्यूब्स' },
    packaging: { en: 'Jar with screw cap', mr: 'झाकण असलेला जार', hi: 'ढक्कन वाला जार' },
    images: ['cubesJar', 'cubesPlate'],
    demoPrice: 160,
    compareAtPrice: 190, // DEMO MRP
    packSize: null,
    stock: 'in_stock',
    status: 'active',
    featured: true,
    createdAt: '2026-10-08',
  },
  {
    id: 'p4',
    slug: 'jaggery-tub',
    sku: 'DEMO-JAG-TUB',
    category: 'jaggery',
    name: { en: 'Jaggery Tub', mr: 'गूळ टब', hi: 'गुड़ टब' },
    short: { en: 'Traditional jaggery in a reusable tub.', mr: 'टबमध्ये पारंपरिक गूळ.', hi: 'टब में पारंपरिक गुड़।' },
    description: join(catDesc.jaggery, packed),
    form: { en: 'Block', mr: 'ढेप', hi: 'ब्लॉक' },
    packaging: { en: 'Tub with lid', mr: 'झाकण असलेला टब', hi: 'ढक्कन वाला टब' },
    images: ['blockTub', 'blockCane'],
    demoPrice: 180,
    compareAtPrice: 200, // DEMO MRP
    packSize: null,
    stock: 'in_stock',
    status: 'active',
    featured: false,
    createdAt: '2026-09-20',
  },
  {
    id: 'p5',
    slug: 'jaggery-bar-pack',
    sku: 'DEMO-JAG-BAR',
    category: 'jaggery',
    name: { en: 'Jaggery Bar Pack', mr: 'गूळ बार पॅक', hi: 'गुड़ बार पैक' },
    short: { en: 'A neat bar of everyday sweetness.', mr: 'रोजच्या गोडव्याचा सुबक बार.', hi: 'रोज़ की मिठास का साफ़-सुथरा बार।' },
    description: join(catDesc.jaggery, packed),
    form: { en: 'Bar', mr: 'बार', hi: 'बार' },
    packaging: { en: 'Sealed pack', mr: 'सीलबंद पॅक', hi: 'सीलबंद पैक' },
    images: ['barOven', 'barBoard'],
    demoPrice: 90,
    compareAtPrice: 100, // DEMO MRP
    packSize: null,
    stock: 'in_stock',
    status: 'active',
    featured: false,
    createdAt: '2026-09-12',
  },
];

export const getProduct = (slug: string) => PRODUCTS.find((p) => p.slug === slug);
export const getProductById = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
