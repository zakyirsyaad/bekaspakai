import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import DecodeToken from './hooks/decode-token';

export async function middleware(request) {
    const accessToken = cookies().get('accessToken')?.value;
    const decodedToken = DecodeToken(accessToken);

    if (!decodedToken) {
        if (request.nextUrl.pathname !== '/login') {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    const isVerified = decodedToken?.isVerified;
    const isPenjual = decodedToken?.role === "83da0762-a57a-4125-8ebb-25386cdd0226";

    let isKurirSet = false;

    if (accessToken) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                cache: 'no-store',
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.data;
                isKurirSet = user?.AuthPenjual?.KurirPenjuals?.length > 0;
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            window.location.href = '/login';
        }
    }

    // Redirect user to the homepage if they are trying to access login or register with an accessToken
    if (accessToken && isVerified && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (accessToken && isVerified && (request.nextUrl.pathname === '/otp')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isPenjual && isKurirSet && request.nextUrl.pathname.startsWith('/daftartoko')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (accessToken && !isVerified && ['/dashboard', '/keranjang', '/pembayaran', '/transaksi', '/login', '/register'].some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/otp', request.url));
    }

    if (!accessToken && ['/dashboard', '/keranjang', '/pembayaran', '/transaksi'].some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (accessToken && isVerified && !isPenjual && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/daftartoko', request.url));
    }

    if (accessToken && isVerified && isPenjual && !isKurirSet && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/daftartoko', request.url));
    }

    try {
        const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!verifyResponse.ok) {
            cookies().delete('accessToken');
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/keranjang', '/pembayaran', '/transaksi', '/login', '/register', '/daftartoko', '/otp'],
};
