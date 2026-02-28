export function getClientIp(req: any): string {
    const cfIp = req.headers?.['cf-connecting-ip'];
    if (cfIp && typeof cfIp === 'string') {
        return cfIp;
    }

    const xForwardedFor = req.headers?.['x-forwarded-for'];
    if (xForwardedFor) {
        const ips = Array.isArray(xForwardedFor)
            ? xForwardedFor[0]
            : xForwardedFor.split(',')[0];

            return ips.trim();
    }

    const remote = req.socket?.remoteAddress || '';

    if (remote.startsWith('::ffff:')) {
        return remote.replace('::ffff:', '');
    }

    return remote;
}