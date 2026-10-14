/**
 * DRAFT POLICY TEMPLATES — NOT LEGAL ADVICE.
 * Text in [square brackets] must be confirmed by Rajmane Agro and reviewed by a qualified professional
 * before launch. No delivery times, refund windows or charges have been invented.
 */
export type PolicySlug = 'privacy-policy' | 'terms-and-conditions' | 'shipping-policy' | 'refund-and-cancellation-policy';

export interface PolicySection {
  heading: string;
  body: string[];
}
export interface Policy {
  slug: PolicySlug;
  titleKey: 'privacy' | 'terms' | 'shipping' | 'refund';
  updated: string;
  intro: string;
  sections: PolicySection[];
}

const CO = 'Rajmane Agro Farmers Producers Limited';

export const POLICIES: Record<PolicySlug, Policy> = {
  'privacy-policy': {
    slug: 'privacy-policy',
    titleKey: 'privacy',
    updated: '2026-10-14',
    intro: `This Privacy Policy explains how ${CO} ("Rajmane Agro", "we") collects and uses information when you use www.rajmaneagroproducts.com.`,
    sections: [
      {
        heading: 'Information we collect',
        body: [
          'Details you provide when placing an order or sending an enquiry: name, mobile number, email address, delivery and billing address, and any notes you add.',
          'Order information such as the products, quantities and amounts in your order.',
          'Basic technical information such as the page you arrived on and the link or campaign that referred you, used to understand which channels are useful to our customers.',
        ],
      },
      {
        heading: 'How we use your information',
        body: [
          'To process, deliver and support your orders.',
          'To respond to your questions, bulk order and distributor enquiries.',
          'To improve our website and customer service.',
        ],
      },
      {
        heading: 'Payments',
        body: [
          'Online payments will be processed by a third-party payment gateway. We do not see or store your full card, UPI PIN or net-banking credentials.',
        ],
      },
      {
        heading: 'Data stored in your browser',
        body: [
          'Your cart and preferred language are saved in your browser (localStorage) so they remain after you refresh the page. You can clear them at any time from your browser settings.',
        ],
      },
      {
        heading: 'Sharing',
        body: [
          'We share information only with service providers needed to fulfil your order (for example payment and courier partners) or when required by law. We do not sell your personal information.',
        ],
      },
      {
        heading: 'Contact',
        body: ['For privacy questions, call +91 73871 01619. [Grievance officer name and email to be added.]'],
      },
    ],
  },
  'terms-and-conditions': {
    slug: 'terms-and-conditions',
    titleKey: 'terms',
    updated: '2026-10-14',
    intro: `These Terms and Conditions govern your use of www.rajmaneagroproducts.com, operated by ${CO}.`,
    sections: [
      {
        heading: 'Products and information',
        body: [
          'We try to display product information and images accurately. Packaging and appearance may vary slightly between batches.',
          'Prices, pack sizes and availability are shown on the product page and confirmed at checkout.',
        ],
      },
      {
        heading: 'Orders',
        body: [
          'An order is confirmed only after successful payment verification. We may cancel an order in case of stock unavailability, pricing errors or suspected misuse, and any amount paid will be refunded as per our Refund & Cancellation Policy.',
        ],
      },
      {
        heading: 'Pricing and payment',
        body: ['All prices are in Indian Rupees (INR). [Tax treatment to be confirmed.]'],
      },
      { heading: 'Governing law', body: ['These terms are governed by the laws of India. [Jurisdiction to be confirmed.]'] },
      { heading: 'Contact', body: ['Call +91 73871 01619 for any questions about these terms.'] },
    ],
  },
  'shipping-policy': {
    slug: 'shipping-policy',
    titleKey: 'shipping',
    updated: '2026-10-14',
    intro: 'This Shipping Policy explains how we deliver orders placed on www.rajmaneagroproducts.com.',
    sections: [
      { heading: 'Delivery areas', body: ['[Serviceable locations / PIN codes to be confirmed by Rajmane Agro.]'] },
      { heading: 'Shipping charges', body: ['[Shipping charges and any free-shipping threshold to be confirmed.] Applicable charges will be shown at checkout before payment.'] },
      { heading: 'Dispatch and delivery time', body: ['[Dispatch and estimated delivery timelines to be confirmed.] Timelines may vary by location and courier.'] },
      { heading: 'Tracking', body: ['Once your order is shipped, you can follow it on the Track Order page using your order number and mobile number.'] },
      { heading: 'Bulk orders', body: ['Delivery for bulk and distributor orders is arranged separately. Please send an enquiry or call +91 73871 01619.'] },
    ],
  },
  'refund-and-cancellation-policy': {
    slug: 'refund-and-cancellation-policy',
    titleKey: 'refund',
    updated: '2026-10-14',
    intro: 'This policy explains how cancellations and refunds are handled for orders placed on www.rajmaneagroproducts.com.',
    sections: [
      { heading: 'Cancellations', body: ['[Cancellation window to be confirmed.] Please contact us with your order number as early as possible.'] },
      { heading: 'Damaged or incorrect items', body: ['If you receive a damaged or incorrect product, contact us [within the period to be confirmed] with your order number and photographs of the product and packaging.'] },
      { heading: 'Refunds', body: ['Approved refunds are returned to the original payment method. [Processing timeline to be confirmed.]', 'If a payment fails, no order is confirmed. Any amount debited for a failed payment is handled by your bank or the payment gateway.'] },
      { heading: 'Food products', body: ['[Return conditions for opened food products to be confirmed.]'] },
      { heading: 'Contact', body: ['Call +91 73871 01619 for help with cancellations and refunds.'] },
    ],
  },
};