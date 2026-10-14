/**
 * ⚠️ SAMPLE REVIEWS — LAYOUT PREVIEW ONLY ⚠️
 * These are NOT real customer reviews. They exist only so the review section can be designed and approved.
 * They render with a visible "Sample" badge and are hidden automatically when SITE.demoMode is false.
 * In the backend phase, reviews come from GET /api/reviews (customer-submitted, admin-moderated).
 * Sample text avoids health, purity and certification claims.
 */
import type { Localized } from './types';

export interface Review {
  id: string;
  name: string;
  city: Localized;
  role?: Localized;
  rating: number;
  date: string;
  text: Localized;
  isSample: boolean;
  /** Optional profile photo (e.g. '/assets/reviews/priya.webp') — shown only when a real customer has given permission. */
  photo?: string;
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Sample Customer A',
    city: { en: 'Pune', mr: 'पुणे', hi: 'पुणे' },
    role: { en: 'Home cook', mr: 'गृहिणी', hi: 'गृहिणी' },
    rating: 5,
    date: '2026-10-01',
    isSample: true,
    text: {
      en: 'We use the jaggery powder every morning in our tea and in sweets on festival days. It dissolves easily and the jar is convenient to store. The packing arrived neat and sealed, and the taste reminds us of the jaggery we grew up with. Ordering again for Diwali.',
      mr: 'आम्ही दररोज सकाळच्या चहात आणि सणाच्या दिवशी गोडधोडात गूळ पावडर वापरतो. ती सहज विरघळते आणि जार साठवायला सोयीचा आहे. पॅकिंग व्यवस्थित आणि सीलबंद आले, आणि चव लहानपणीच्या गुळाची आठवण करून देते. दिवाळीसाठी पुन्हा ऑर्डर करत आहोत.',
      hi: 'हम हर सुबह चाय में और त्योहारों पर मिठाइयों में गुड़ पाउडर इस्तेमाल करते हैं। यह आसानी से घुल जाता है और जार रखना सुविधाजनक है। पैकिंग साफ़ और सीलबंद आई, और स्वाद बचपन के गुड़ की याद दिलाता है। दिवाली के लिए फिर ऑर्डर कर रहे हैं।',
    },
  },
  {
    id: 'r2',
    name: 'Sample Customer B',
    city: { en: 'Satara', mr: 'सातारा', hi: 'सातारा' },
    role: { en: 'Grocery store owner', mr: 'किराणा दुकानदार', hi: 'किराना दुकानदार' },
    rating: 5,
    date: '2026-09-22',
    isSample: true,
    text: {
      en: 'Consistent packs and timely supply for my store. Customers like the cubes jar.',
      mr: 'माझ्या दुकानासाठी सातत्यपूर्ण पॅक आणि वेळेवर पुरवठा. ग्राहकांना क्यूब्स जार आवडतो.',
      hi: 'मेरी दुकान के लिए एक-से पैक और समय पर आपूर्ति। ग्राहकों को क्यूब्स जार पसंद है।',
    },
  },
  {
    id: 'r3',
    name: 'Sample Customer C',
    city: { en: 'Kolhapur', mr: 'कोल्हापूर', hi: 'कोल्हापुर' },
    rating: 4,
    date: '2026-09-10',
    isSample: true,
    text: {
      en: 'The cubes are perfectly sized — one after lunch is just right. Nicely packed jar.',
      mr: 'क्यूब्सचा आकार अगदी योग्य — जेवणानंतर एक पुरेसा. जार छान पॅक केलेला.',
      hi: 'क्यूब्स का आकार बिल्कुल सही है — खाने के बाद एक काफ़ी है। जार अच्छे से पैक।',
    },
  },
  {
    id: 'r4',
    name: 'Sample Customer D',
    city: { en: 'Mumbai', mr: 'मुंबई', hi: 'मुंबई' },
    rating: 5,
    date: '2026-08-28',
    isSample: true,
    text: {
      en: 'Ordering online was simple and the jaggery block tasted just like home. Will buy again.',
      mr: 'ऑनलाइन ऑर्डर करणे सोपे होते आणि गुळाची ढेप अगदी घरच्यासारखी लागली. पुन्हा घेईन.',
      hi: 'ऑनलाइन ऑर्डर करना आसान था और गुड़ ब्लॉक बिल्कुल घर जैसा लगा। फिर खरीदूँगी।',
    },
  },
  {
    id: 'r5',
    name: 'Sample Customer E',
    city: { en: 'Nashik', mr: 'नाशिक', hi: 'नासिक' },
    rating: 5,
    date: '2026-08-15',
    isSample: true,
    text: {
      en: 'Good for making laddoos and chikki at home. The powder mixes evenly.',
      mr: 'घरी लाडू आणि चिक्की बनवण्यासाठी छान. पावडर एकसारखी मिसळते.',
      hi: 'घर पर लड्डू और चिक्की बनाने के लिए बढ़िया। पाउडर एक-सा मिलता है।',
    },
  },
];