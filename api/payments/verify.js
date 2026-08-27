const crypto = require('crypto');

module.exports = async function handler(request, response) {
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
    const { orderId, paymentId, signature } = request.body || {};
    if (!orderId || !paymentId || !signature || !process.env.RAZORPAY_KEY_SECRET) return response.status(400).json({ verified: false, error: 'Invalid payment verification request' });
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest('hex');
    const verified = crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(String(signature)));
    return response.status(verified ? 200 : 400).json({ verified });
};