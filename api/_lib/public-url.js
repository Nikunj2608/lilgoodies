function normalizeOrigin(value) {
    const raw = String(value || '').trim();
    if (!raw) return '';
    const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
    try {
        return new URL(withProtocol).origin;
    } catch {
        return '';
    }
}

function resolvePublicOrigin(request) {
    const configured = normalizeOrigin(
        process.env.PUBLIC_APP_URL ||
        process.env.SITE_URL ||
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.VERCEL_PROJECT_PRODUCTION_URL
    );
    if (configured) return configured;

    const host = request.headers['x-forwarded-host'] || request.headers.host || process.env.VERCEL_URL || '';
    const protocol = request.headers['x-forwarded-proto'] || 'https';
    return normalizeOrigin(`${protocol}://${host}`);
}

module.exports = { resolvePublicOrigin };
