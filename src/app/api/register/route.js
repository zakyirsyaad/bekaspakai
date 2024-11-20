import { cookies } from "next/headers";

export async function POST(req) {
    const { email, password, username } = await req.json();

    try {
        // Kirim permintaan ke API autentikasi backend
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
        });

        const data = await response.json();

        if (response.ok && data.statusCode === 201) {
            // Simpan token di cookies jika login berhasil
            cookies().set({
                name: 'accessToken',
                value: data.data.access_token,
                maxAge: 60 * 60 * 1,
                path: '/',
                httpOnly: true,
                secure: true,
            });

            return new Response(JSON.stringify({ message: 'Register successful' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            return new Response(JSON.stringify({ message: data.message || 'Register failed' }), {
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
