// app/api/logout/route.js
import { cookies } from 'next/headers';

export async function POST() {
    // Hapus cookie dengan mengatur maxAge menjadi 0
    cookies().delete({
        name: 'accessToken',
        path: '/',
        // httpOnly: true,
        secure: true,
    });

    return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
