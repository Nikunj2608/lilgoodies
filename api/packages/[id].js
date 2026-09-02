const { supabaseRequest } = require('../_lib/supabase');

module.exports = async function handler(request, response) {
    if (request.method !== 'GET') {
        return response.status(405).json({ error: 'Method not allowed' });
    }

    const id = request.query.id;
    if (!id || !/^[a-f0-9]{24}$/.test(id)) {
        return response.status(400).json({ error: 'Invalid package ID' });
    }

    try {
        const rows = await supabaseRequest(`packages?id=eq.${id}&status=in.(paid,free)&select=recipient,sender,items,created_at`);
        if (!rows.length) return response.status(404).json({ error: 'Package not found' });
        response.setHeader('Cache-Control', 'no-store, max-age=0');
        return response.status(200).json({ to: rows[0].recipient, from: rows[0].sender, items: rows[0].items, createdAt: rows[0].created_at });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Could not load package' });
    }
};