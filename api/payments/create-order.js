const crypto = require('crypto');

module.exports = async function handler(request, response) {
    if (request.method !== 'POST') return response.status(405).json({ error: 'Method not allowed' });
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return response.status(503).json({ error: 'Payment gateway is not configured' });
    const amount = Math.round(Number(request.body?.amount || 0) * 100);
    if (!amount || amount < 100) return response.status(400).json({ error: 'Invalid payment amount' });

    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
    const gatewayResponse = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: { Authorization: `Basic ${auth}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency: 'INR', receipt: `lilgoodies_${Date.now()}` })
    });
    const order = await gatewayResponse.json();
    if (!gatewayResponse.ok) return response.status(502).json({ error: 'Could not create payment order' });
    return response.status(200).json({ orderId: order.id, amount: order.amount, keyId: process.env.RAZORPAY_KEY_ID });
};