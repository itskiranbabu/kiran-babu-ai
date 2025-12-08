# 🎯 Razorpay Payment Integration - Complete Setup Guide

## ✅ Onboarding Checklist - COMPLETED

### **Policy Pages** ✅ **ALL COMPLETE**

All required policy pages have been created and are accessible:

| Policy Page | Status | URL | Description |
|------------|--------|-----|-------------|
| **Terms & Conditions** | ✅ Complete | `/terms` | Terms of Service for platform usage |
| **Privacy Policy** | ✅ Complete | `/privacy` | Data privacy and protection policy |
| **Cancellation & Refund** | ✅ Complete | `/cancellation-refund` | Refund and cancellation procedures |
| **Shipping & Delivery** | ✅ Complete | `/shipping` | Digital product delivery policy |
| **Contact Us** | ✅ Complete | `/contact` | Contact information and support |

### **Website URLs** ✅ **VERIFIED**

Your deployed website: `https://kiran-babu-ai-unaw.vercel.app`

All policy pages are accessible at:
- ✅ https://kiran-babu-ai-unaw.vercel.app/#/terms
- ✅ https://kiran-babu-ai-unaw.vercel.app/#/privacy
- ✅ https://kiran-babu-ai-unaw.vercel.app/#/cancellation-refund
- ✅ https://kiran-babu-ai-unaw.vercel.app/#/shipping
- ✅ https://kiran-babu-ai-unaw.vercel.app/#/contact

---

## 📋 Razorpay Onboarding Steps

### **Step 1: Complete KYC Verification**

1. **Login to Razorpay Dashboard**
   - Go to: https://dashboard.razorpay.com
   - Login with your credentials

2. **Navigate to Account & Settings**
   - Click on your profile icon (top right)
   - Select "Account & Settings"

3. **Complete KYC**
   - Go to "Business Details" section
   - Fill in all required information:
     - Business Name: KeySpark AI (or your registered business name)
     - Business Type: Individual/Proprietorship/Company
     - PAN Card details
     - GST Number (if applicable)
     - Bank Account details for settlements

4. **Upload Documents**
   - PAN Card
   - Address Proof
   - Bank Statement/Cancelled Cheque
   - GST Certificate (if applicable)

---

### **Step 2: Add Website URLs to Razorpay**

1. **Go to Settings → Website Details**
   - Navigate to: Dashboard → Settings → Website Details

2. **Add Your Website URL**
   ```
   Website URL: https://kiran-babu-ai-unaw.vercel.app
   ```

3. **Add Policy Page URLs**
   
   In the Razorpay dashboard, add these exact URLs:

   **Terms and Conditions:**
   ```
   https://kiran-babu-ai-unaw.vercel.app/#/terms
   ```

   **Privacy Policy:**
   ```
   https://kiran-babu-ai-unaw.vercel.app/#/privacy
   ```

   **Cancellation & Refund Policy:**
   ```
   https://kiran-babu-ai-unaw.vercel.app/#/cancellation-refund
   ```

   **Shipping & Delivery Policy:**
   ```
   https://kiran-babu-ai-unaw.vercel.app/#/shipping
   ```

   **Contact Us:**
   ```
   https://kiran-babu-ai-unaw.vercel.app/#/contact
   ```

4. **Save Changes**
   - Click "Save" to update your website details

---

### **Step 3: Verify Policy Pages**

Razorpay will verify that your policy pages:
- ✅ Are publicly accessible
- ✅ Contain relevant policy information
- ✅ Are properly formatted and readable
- ✅ Include contact information

**Verification usually takes 24-48 hours.**

---

### **Step 4: Get API Keys**

Once your account is verified:

1. **Navigate to Settings → API Keys**
   - Go to: Dashboard → Settings → API Keys

2. **Generate API Keys**
   - Click "Generate Test Keys" for testing
   - Click "Generate Live Keys" for production

3. **Copy Your Keys**
   ```
   Key ID: rzp_test_XXXXXXXXXX (for testing)
   Key Secret: XXXXXXXXXXXXXXXXXX (keep this secret!)
   ```

4. **Add to Environment Variables**
   
   Create/update your `.env` file:
   ```env
   # Razorpay API Keys
   VITE_RAZORPAY_KEY_ID=rzp_test_XXXXXXXXXX
   VITE_RAZORPAY_KEY_SECRET=XXXXXXXXXXXXXXXXXX
   ```

---

### **Step 5: Configure Webhooks** (Optional but Recommended)

1. **Go to Settings → Webhooks**
   - Navigate to: Dashboard → Settings → Webhooks

2. **Add Webhook URL**
   ```
   Webhook URL: https://kiran-babu-ai-unaw.vercel.app/api/razorpay/webhook
   ```

3. **Select Events**
   - ✅ payment.authorized
   - ✅ payment.captured
   - ✅ payment.failed
   - ✅ order.paid
   - ✅ refund.created

4. **Generate Webhook Secret**
   - Copy the webhook secret
   - Add to your `.env`:
   ```env
   VITE_RAZORPAY_WEBHOOK_SECRET=whsec_XXXXXXXXXX
   ```

---

## 🔧 Integration Code

### **Install Razorpay SDK**

```bash
npm install razorpay
```

### **Create Razorpay Service**

Create `services/razorpayService.ts`:

```typescript
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

export const initializeRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (options: RazorpayOptions) => {
  // Load Razorpay script
  const loaded = await initializeRazorpay();
  if (!loaded) {
    throw new Error('Razorpay SDK failed to load');
  }

  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: RAZORPAY_KEY_ID,
      amount: options.amount,
      currency: options.currency || 'INR',
      name: options.name,
      description: options.description,
      order_id: options.orderId,
      prefill: options.prefill,
      notes: options.notes,
      theme: {
        color: options.theme?.color || '#7B2FF7',
      },
      handler: function (response: any) {
        resolve(response);
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user'));
        },
      },
    };

    // @ts-ignore
    const razorpay = new window.Razorpay(rzpOptions);
    razorpay.open();
  });
};
```

### **Example Usage in Component**

```typescript
import { createRazorpayOrder } from '../services/razorpayService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/ToastContext';

const PaymentButton = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    
    try {
      const response = await createRazorpayOrder({
        amount: 99900, // ₹999 in paise
        name: 'KeySpark AI',
        description: 'Premium Subscription',
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        notes: {
          userId: user?.id,
          plan: 'premium',
        },
      });

      // Payment successful
      addToast('Payment successful!', 'success');
      console.log('Payment Response:', response);
      
      // Handle post-payment logic (update subscription, etc.)
      
    } catch (error: any) {
      addToast(error.message || 'Payment failed', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isProcessing}
      className="px-6 py-3 bg-gradient-to-r from-[#7B2FF7] to-[#FF9D0A] text-white rounded-lg"
    >
      {isProcessing ? 'Processing...' : 'Pay Now'}
    </button>
  );
};
```

---

## 🧪 Testing

### **Test Mode**

1. Use test API keys (starting with `rzp_test_`)
2. Use test card numbers:
   ```
   Card Number: 4111 1111 1111 1111
   CVV: Any 3 digits
   Expiry: Any future date
   ```

3. Test different scenarios:
   - ✅ Successful payment
   - ❌ Failed payment
   - ⏸️ Cancelled payment

### **Live Mode**

1. Switch to live API keys (starting with `rzp_live_`)
2. Complete full KYC verification
3. Test with small real transactions first
4. Monitor payments in Razorpay dashboard

---

## 📊 Post-Integration Checklist

- [ ] Test payment flow end-to-end
- [ ] Verify webhook events are received
- [ ] Test refund process
- [ ] Set up payment notifications
- [ ] Configure settlement schedule
- [ ] Add payment analytics tracking
- [ ] Implement subscription management (if applicable)
- [ ] Set up automated invoicing
- [ ] Configure tax settings (GST)
- [ ] Test mobile payment flow

---

## 🔒 Security Best Practices

1. **Never expose Key Secret in frontend code**
   - Only use Key ID in frontend
   - Keep Key Secret on backend only

2. **Verify payment signatures**
   - Always verify webhook signatures
   - Validate payment status on backend

3. **Use HTTPS**
   - Ensure your website uses HTTPS
   - Razorpay requires secure connections

4. **Store sensitive data securely**
   - Use environment variables
   - Never commit API keys to Git

5. **Implement rate limiting**
   - Prevent payment spam
   - Add CAPTCHA for payment forms

---

## 📞 Support & Resources

### **Razorpay Documentation**
- API Docs: https://razorpay.com/docs/api/
- Integration Guide: https://razorpay.com/docs/payments/
- Webhooks: https://razorpay.com/docs/webhooks/

### **Razorpay Support**
- Email: support@razorpay.com
- Phone: +91-80-6890-6890
- Dashboard: https://dashboard.razorpay.com

### **KeySpark AI Support**
- Email: itskiranbabu.ai@gmail.com
- Website: https://kiran-babu-ai-unaw.vercel.app

---

## ✅ Completion Status

### **Completed Items:**
1. ✅ Created all 5 required policy pages
2. ✅ Added routes for all policy pages
3. ✅ Updated footer with policy links
4. ✅ Verified all pages are accessible
5. ✅ Created comprehensive setup documentation

### **Next Steps:**
1. ⏳ Complete Razorpay KYC verification
2. ⏳ Add policy URLs to Razorpay dashboard
3. ⏳ Wait for Razorpay verification (24-48 hours)
4. ⏳ Get API keys and add to environment
5. ⏳ Implement payment integration code
6. ⏳ Test payment flow
7. ⏳ Go live!

---

**Last Updated:** December 8, 2024  
**Status:** Policy Pages Complete ✅ | Ready for Razorpay Onboarding
