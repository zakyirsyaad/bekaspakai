// app/api/logout/route.js
import { cookies } from 'next/headers';

export async function POST() {
    const cookiesStore = await cookies();
    cookiesStore.delete('accessToken');

    return new Response(JSON.stringify({ message: 'Logout successful' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
