export default function DecodeToken(token) {
    if (!token) return null;

    try {
        // Memisahkan header, payload, dan signature dari JWT
        const [, payload] = token.split('.');

        if (!payload) throw new Error('Token payload missing');

        // Meng-decode payload dari base64
        const decodedPayload = JSON.parse(atob(payload));

        // Menggunakan DTO, misal kita hanya ambil id
        const dto = { id: decodedPayload.id, isVerified: decodedPayload.isVerified, role: decodedPayload.role };
        return dto;
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}
