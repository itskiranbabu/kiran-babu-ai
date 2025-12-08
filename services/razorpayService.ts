import { getEnv } from '../utils/env';

const RAZORPAY_KEY_ID = getEnv('VITE_RAZORPAY_KEY_ID');

export interface RazorpayOptions {
  amount: number; // in paise (₹100 = 10000 paise)
  currency?: string;
  name: string;
  description: string;
  orderId?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, any>;
  theme?: {
    color?: string;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

/**
 * Initialize Razorpay SDK by loading the script
 * @returns Promise<boolean> - true if loaded successfully
 */
export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check if already loaded
    // @ts-ignore
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      console.log('✅ Razorpay SDK loaded successfully');
      resolve(true);
    };
    script.onerror = () => {
      console.error('❌ Failed to load Razorpay SDK');
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

/**
 * Create and open Razorpay payment checkout
 * @param options - Payment options
 * @returns Promise<RazorpayResponse> - Payment response
 */
export const createRazorpayOrder = async (
  options: RazorpayOptions
): Promise<RazorpayResponse> => {
  // Validate API key
  if (!RAZORPAY_KEY_ID) {
    throw new Error(
      'Razorpay Key ID not found. Please add VITE_RAZORPAY_KEY_ID to your environment variables.'
    );
  }

  // Load Razorpay script
  const loaded = await initializeRazorpay();
  if (!loaded) {
    throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
  }

  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: RAZORPAY_KEY_ID,
      amount: options.amount,
      currency: options.currency || 'INR',
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      prefill: options.prefill || {},
      notes: options.notes || {},
      theme: {
        color: options.theme?.color || '#7B2FF7',
      },
      handler: function (response: RazorpayResponse) {
        console.log('✅ Payment successful:', response);
        resolve(response);
      },
      modal: {
        ondismiss: function () {
          console.log('⚠️ Payment cancelled by user');
          reject(new Error('Payment cancelled by user'));
        },
        confirm_close: true,
      },
    };

    try {
      // @ts-ignore
      const razorpay = new window.Razorpay(rzpOptions);
      
      razorpay.on('payment.failed', function (response: any) {
        console.error('❌ Payment failed:', response.error);
        reject(new Error(response.error.description || 'Payment failed'));
      });

      razorpay.open();
    } catch (error: any) {
      console.error('❌ Error opening Razorpay:', error);
      reject(new Error('Failed to open payment gateway'));
    }
  });
};

/**
 * Verify payment signature (should be done on backend)
 * This is a client-side helper - ALWAYS verify on backend for security
 */
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  // This should be done on backend with Key Secret
  console.warn('⚠️ Payment signature verification should be done on backend');
  return true; // Placeholder
};

/**
 * Format amount to paise (Razorpay uses paise)
 * @param rupees - Amount in rupees
 * @returns Amount in paise
 */
export const formatAmountToPaise = (rupees: number): number => {
  return Math.round(rupees * 100);
};

/**
 * Format amount from paise to rupees
 * @param paise - Amount in paise
 * @returns Amount in rupees
 */
export const formatAmountToRupees = (paise: number): number => {
  return paise / 100;
};

/**
 * Create a subscription payment
 */
export const createSubscriptionPayment = async (
  planName: string,
  amount: number,
  userDetails: { name?: string; email?: string; contact?: string }
): Promise<RazorpayResponse> => {
  return createRazorpayOrder({
    amount: formatAmountToPaise(amount),
    name: 'KeySpark AI',
    description: `${planName} Subscription`,
    prefill: userDetails,
    notes: {
      type: 'subscription',
      plan: planName,
    },
  });
};

/**
 * Create a one-time product payment
 */
export const createProductPayment = async (
  productName: string,
  amount: number,
  userDetails: { name?: string; email?: string; contact?: string }
): Promise<RazorpayResponse> => {
  return createRazorpayOrder({
    amount: formatAmountToPaise(amount),
    name: 'KeySpark AI',
    description: productName,
    prefill: userDetails,
    notes: {
      type: 'product',
      product: productName,
    },
  });
};

/**
 * Create a service booking payment
 */
export const createServicePayment = async (
  serviceName: string,
  amount: number,
  userDetails: { name?: string; email?: string; contact?: string },
  bookingDetails?: Record<string, any>
): Promise<RazorpayResponse> => {
  return createRazorpayOrder({
    amount: formatAmountToPaise(amount),
    name: 'KeySpark AI',
    description: `${serviceName} - Service Booking`,
    prefill: userDetails,
    notes: {
      type: 'service',
      service: serviceName,
      ...bookingDetails,
    },
  });
};

export default {
  initializeRazorpay,
  createRazorpayOrder,
  verifyPaymentSignature,
  formatAmountToPaise,
  formatAmountToRupees,
  createSubscriptionPayment,
  createProductPayment,
  createServicePayment,
};
