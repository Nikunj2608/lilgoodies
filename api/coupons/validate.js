const crypto = require('crypto');

module.exports = async function handler(request, response) {
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
    const code = String(request.body?.code || '').trim().toUpperCase();
    const validCodes = String(process.env.FREE_COUPON_CODES || '').split(',').map(value => value.trim().toUpperCase()).filter(Boolean);
    if (!code || !validCodes.some(value => value.length === code.length && crypto.timingSafeEqual(Buffer.from(value), Buffer.from(code)))) {
        return response.status(400).json({ valid: false, error: 'Invalid or expired coupon code' });
    }
    return response.status(200).json({ valid: true, amount: 0 });
};