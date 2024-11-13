import { cookies } from 'next/headers';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        // Kirim permintaan ke API autentikasi backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok && data.statusCode === 200) {
            // Simpan token di cookies jika login berhasil
            cookies().set({
                name: 'accessToken',
                value: data.data.access_token,
                maxAge: 60 * 60 * 1,
                path: '/',
            })

            return new Response(JSON.stringify({ message: 'Login successful' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });

            history.back();
        } else {
            return new Response(JSON.stringify({ message: data.message || 'Login failed' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
