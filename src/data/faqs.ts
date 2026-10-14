/**
 * DRAFT FAQs — written from the supplied brand content only. They avoid delivery-time, refund-window and
 * health promises. Please review/replace with Rajmane Agro's approved answers (admin-managed in backend phase).
 */
import type { Localized } from './types';

export interface Faq {
  id: string;
  q: Localized;
  a: Localized;
  preview?: boolean;
}

export const FAQS: Faq[] = [
  {
    id: 'products',
    preview: true,
    q: {
      en: 'What jaggery products does Rajmane Agro offer?',
      mr: 'राजमाने ॲग्रो कोणती गुळाची उत्पादने देते?',
      hi: 'राजमाने एग्रो कौन-से गुड़ उत्पाद देता है?',
    },
    a: {
      en: 'We offer three ranges: Jaggery (traditional sweetness in every bite), Jaggery Powder (convenient sweetness for everyday cooking) and Jaggery Cubes (perfectly portioned sweetness, ready to enjoy).',
      mr: 'आमच्याकडे तीन प्रकार आहेत: गूळ (प्रत्येक घासात पारंपरिक गोडवा), गूळ पावडर (रोजच्या स्वयंपाकासाठी सोयीस्कर गोडवा) आणि गूळ क्यूब्स (योग्य प्रमाणातील गोडवा, आस्वादासाठी तयार).',
      hi: 'हमारे तीन प्रकार हैं: गुड़ (हर निवाले में पारंपरिक मिठास), गुड़ पाउडर (रोज़ के खाने के लिए सुविधाजनक मिठास) और गुड़ क्यूब्स (सही मात्रा में मिठास, आनंद के लिए तैयार)।',
    },
  },
  {
    id: 'choose',
    preview: true,
    q: {
      en: 'Which form of jaggery should I choose?',
      mr: 'गुळाचा कोणता प्रकार निवडावा?',
      hi: 'मुझे गुड़ का कौन-सा रूप चुनना चाहिए?',
    },
    a: {
      en: 'Choose jaggery for traditional Indian recipes and everyday use, jaggery powder for beverages, cooking and homemade sweets, and jaggery cubes when you want convenient portions for everyday use and sharing.',
      mr: 'पारंपरिक पाककृती व रोजच्या वापरासाठी गूळ, पेये, स्वयंपाक व घरगुती मिठायांसाठी गूळ पावडर, आणि रोजच्या वापरासाठी व वाटून खाण्यासाठी सोयीचे प्रमाण हवे असल्यास गूळ क्यूब्स निवडा.',
      hi: 'पारंपरिक भारतीय व्यंजनों और रोज़ के उपयोग के लिए गुड़, पेय, खाना पकाने और घर की मिठाइयों के लिए गुड़ पाउडर, और रोज़ के उपयोग व बाँटने के लिए सुविधाजनक मात्रा चाहिए तो गुड़ क्यूब्स चुनें।',
    },
  },
  {
    id: 'order',
    preview: true,
    q: { en: 'How do I place an order?', mr: 'ऑर्डर कशी द्यावी?', hi: 'ऑर्डर कैसे करें?' },
    a: {
      en: 'Add products to your cart, review your order summary and complete checkout with your delivery details. Our online store is being set up — until online payment goes live, please call +91 73871 01619 to place an order.',
      mr: 'उत्पादने कार्टमध्ये जोडा, ऑर्डर सारांश तपासा आणि डिलिव्हरी तपशीलांसह चेकआउट पूर्ण करा. आमचे ऑनलाइन स्टोअर तयार होत आहे — ऑनलाइन पेमेंट सुरू होईपर्यंत ऑर्डरसाठी कृपया +91 73871 01619 वर कॉल करा.',
      hi: 'उत्पाद कार्ट में जोड़ें, ऑर्डर सारांश देखें और डिलीवरी विवरण के साथ चेकआउट पूरा करें। हमारा ऑनलाइन स्टोर तैयार हो रहा है — ऑनलाइन भुगतान शुरू होने तक ऑर्डर के लिए कृपया +91 73871 01619 पर कॉल करें।',
    },
  },
  {
    id: 'bulk',
    preview: true,
    q: {
      en: 'Do you supply jaggery in bulk for shops and businesses?',
      mr: 'दुकाने व व्यवसायांसाठी घाऊक गूळ पुरवठा करता का?',
      hi: 'क्या आप दुकानों और व्यवसायों के लिए थोक में गुड़ देते हैं?',
    },
    a: {
      en: 'Yes. We offer retail and bulk supply options. Send a bulk order enquiry from our Contact page or call +91 73871 01619, and our team will discuss your requirement.',
      mr: 'हो. आम्ही किरकोळ व घाऊक पुरवठा करतो. संपर्क पेजवरून घाऊक ऑर्डर चौकशी पाठवा किंवा +91 73871 01619 वर कॉल करा, आमची टीम तुमच्या गरजेविषयी चर्चा करेल.',
      hi: 'हाँ। हम खुदरा और थोक आपूर्ति करते हैं। संपर्क पेज से थोक ऑर्डर पूछताछ भेजें या +91 73871 01619 पर कॉल करें, हमारी टीम आपकी ज़रूरत पर चर्चा करेगी।',
    },
  },
  {
    id: 'distributor',
    q: { en: 'How can I become a distributor?', mr: 'वितरक कसे व्हावे?', hi: 'वितरक कैसे बनें?' },
    a: {
      en: 'Choose “Becoming a distributor” in our business enquiry form and share your business name, city and requirement. You can also call us directly.',
      mr: 'व्यावसायिक चौकशी फॉर्ममध्ये “वितरक होणे” निवडा आणि तुमच्या व्यवसायाचे नाव, शहर व गरज कळवा. तुम्ही थेट कॉलही करू शकता.',
      hi: 'व्यावसायिक पूछताछ फ़ॉर्म में “वितरक बनना” चुनें और अपने व्यवसाय का नाम, शहर और ज़रूरत बताएँ। आप सीधे कॉल भी कर सकते हैं।',
    },
  },
  {
    id: 'payment',
    q: { en: 'Which payment methods will be available?', mr: 'कोणते पेमेंट पर्याय उपलब्ध असतील?', hi: 'कौन-से भुगतान विकल्प उपलब्ध होंगे?' },
    a: {
      en: 'Secure online payment is being set up and will be confirmed at launch. Until then, please call us to place your order.',
      mr: 'सुरक्षित ऑनलाइन पेमेंटची व्यवस्था सुरू आहे आणि लाँचच्या वेळी निश्चित केली जाईल. तोपर्यंत ऑर्डरसाठी कृपया कॉल करा.',
      hi: 'सुरक्षित ऑनलाइन भुगतान की व्यवस्था की जा रही है और लॉन्च पर पुष्टि की जाएगी। तब तक ऑर्डर के लिए कृपया कॉल करें।',
    },
  },
  {
    id: 'track',
    q: { en: 'How can I track my order?', mr: 'ऑर्डर ट्रॅक कशी करावी?', hi: 'अपना ऑर्डर कैसे ट्रैक करें?' },
    a: {
      en: 'Use the Track Order page with your order number and the mobile number used at checkout.',
      mr: 'ऑर्डर नंबर आणि चेकआउटवेळी दिलेल्या मोबाईल नंबरसह “ऑर्डर ट्रॅक करा” पेज वापरा.',
      hi: 'ऑर्डर नंबर और चेकआउट में दिए गए मोबाइल नंबर के साथ “ऑर्डर ट्रैक करें” पेज का उपयोग करें।',
    },
  },
  {
    id: 'shipping',
    q: {
      en: 'Where do you deliver, and what are the shipping charges?',
      mr: 'तुम्ही कुठे डिलिव्हरी करता आणि शिपिंग शुल्क किती?',
      hi: 'आप कहाँ डिलीवरी करते हैं और शिपिंग शुल्क कितना है?',
    },
    a: {
      en: 'Delivery areas and charges will be shown at checkout and in our Shipping Policy once online ordering goes live. Call us for current availability in your area.',
      mr: 'ऑनलाइन ऑर्डरिंग सुरू झाल्यावर डिलिव्हरी क्षेत्र व शुल्क चेकआउटवर आणि शिपिंग धोरणात दाखवले जातील. तुमच्या भागातील उपलब्धतेसाठी कॉल करा.',
      hi: 'ऑनलाइन ऑर्डरिंग शुरू होने पर डिलीवरी क्षेत्र और शुल्क चेकआउट और शिपिंग नीति में दिखाए जाएँगे। अपने क्षेत्र में उपलब्धता के लिए कॉल करें।',
    },
  },
  {
    id: 'cancel',
    q: { en: 'Can I cancel or return an order?', mr: 'ऑर्डर रद्द किंवा परत करता येते का?', hi: 'क्या मैं ऑर्डर रद्द या वापस कर सकता हूँ?' },
    a: {
      en: 'Please read our Refund & Cancellation Policy and contact us as soon as possible with your order number. Our team will help you.',
      mr: 'कृपया आमचे परतावा व रद्द करण्याचे धोरण वाचा आणि ऑर्डर नंबरसह लवकरात लवकर संपर्क करा. आमची टीम मदत करेल.',
      hi: 'कृपया हमारी रिफ़ंड और रद्दीकरण नीति पढ़ें और ऑर्डर नंबर के साथ जल्द से जल्द संपर्क करें। हमारी टीम आपकी मदद करेगी।',
    },
  },
];