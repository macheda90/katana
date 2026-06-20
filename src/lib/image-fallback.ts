export function isProbablyValidUrl(url: unknown): url is string {
    if (typeof url !== 'string') return false
    if (!url) return false
    try {
        // supports both absolute and relative urls
        // We only accept http/https as remote images for next/image
        const u = new URL(url)
        return u.protocol === 'http:' || u.protocol === 'https:'
    } catch {
        return false
    }
}

export function safeThumbnailSrc(thumbnail: unknown, defaultSrc: string) {
    if (typeof thumbnail !== 'string') return defaultSrc
    return thumbnail.trim() ? thumbnail : defaultSrc
}

