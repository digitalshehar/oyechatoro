'use server';

/**
 * WhatsApp Business API Service
 * 
 * This service provides methods to send WhatsApp messages using the Meta Cloud API.
 * 
 * Setup Requirements:
 * 1. Create a Meta Business Account: https://business.facebook.com
 * 2. Create a WhatsApp Business App: https://developers.facebook.com/apps
 * 3. Get your Phone Number ID and Access Token from the WhatsApp API Setup
 * 4. Add the following to your .env file:
 *    - WHATSAPP_PHONE_ID=your_phone_number_id
 *    - WHATSAPP_ACCESS_TOKEN=your_access_token
 *    - WHATSAPP_BUSINESS_NAME=Oye Chatoro
 */

const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0';

interface WhatsAppMessage {
    to: string;
    type: 'text' | 'template';
    text?: { body: string };
    template?: {
        name: string;
        language: { code: string };
        components?: any[];
    };
}

interface SendResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

/**
 * Format phone number for WhatsApp API (must include country code, no + or spaces)
 */
function formatPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');

    // If starts with 0, assume Indian number and replace with 91
    if (cleaned.startsWith('0')) {
        cleaned = '91' + cleaned.substring(1);
    }

    // If no country code (10 digits), assume India
    if (cleaned.length === 10) {
        cleaned = '91' + cleaned;
    }

    return cleaned;
}

/**
 * Send a WhatsApp message
 */
export async function sendWhatsAppMessage(
    to: string,
    message: string
): Promise<SendResult> {
    const phoneId = process.env.WHATSAPP_PHONE_ID;
    const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

    if (!phoneId || !accessToken) {
        console.warn('⚠️ WhatsApp API not configured. Skipping message.');
        return { success: false, error: 'WhatsApp API not configured' };
    }

    try {
        const formattedPhone = formatPhoneNumber(to);

        const response = await fetch(`${WHATSAPP_API_URL}/${phoneId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messaging_product: 'whatsapp',
                recipient_type: 'individual',
                to: formattedPhone,
                type: 'text',
                text: { body: message }
            }),
        });

        const data = await response.json();

        if (response.ok && data.messages?.[0]?.id) {
            console.log(`✅ WhatsApp sent to ${formattedPhone}: ${data.messages[0].id}`);
            return { success: true, messageId: data.messages[0].id };
        } else {
            console.error('❌ WhatsApp Error:', data);
            return { success: false, error: data.error?.message || 'Failed to send' };
        }
    } catch (error: any) {
        console.error('❌ WhatsApp Exception:', error);
        return { success: false, error: error.message };
    }
}

/**
 * Send Order Ready notification
 */
export async function sendOrderReadyNotification(
    phone: string,
    orderNumber: number | string,
    customerName?: string
): Promise<SendResult> {
    const greeting = customerName ? `Hi ${customerName}! 👋` : 'Hi! 👋';
    const message = `${greeting}

🍔 *Order #${orderNumber} is READY!*

Please collect your order from the counter.

Thank you for choosing *Oye Chatoro*! 🙏

📍 Abu Road, Rajasthan`;

    return sendWhatsAppMessage(phone, message);
}

/**
 * Send Digital Receipt
 */
export async function sendDigitalReceipt(
    phone: string,
    orderDetails: {
        orderNumber: number | string;
        items: { name: string; quantity: number; price: number }[];
        subtotal: number;
        tax: number;
        total: number;
        paymentMethod: string;
    }
): Promise<SendResult> {
    const itemsList = orderDetails.items
        .map(item => `• ${item.quantity}x ${item.name} - ₹${item.price * item.quantity}`)
        .join('\n');

    const message = `🧾 *Digital Receipt - Oye Chatoro*

Order #${orderDetails.orderNumber}
Date: ${new Date().toLocaleString('en-IN')}

---
${itemsList}
---
Subtotal: ₹${orderDetails.subtotal}
GST (5%): ₹${orderDetails.tax}
*Total: ₹${orderDetails.total}*

Payment: ${orderDetails.paymentMethod} ✅

Thank you for your order! 🙏
Visit us again at Abu Road.`;

    return sendWhatsAppMessage(phone, message);
}

/**
 * Send Order Confirmation (when order is placed)
 */
export async function sendOrderConfirmation(
    phone: string,
    orderNumber: number | string,
    estimatedTime: string = '15-20 mins'
): Promise<SendResult> {
    const message = `✅ *Order Confirmed!*

Your Order #${orderNumber} has been received.

⏱️ Estimated Time: ${estimatedTime}

We'll notify you when it's ready!

- Team Oye Chatoro 🍔`;

    return sendWhatsAppMessage(phone, message);
}
