import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import DecodeToken from './hooks/decodeToken';

export async function middleware(request) {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;
    if (!accessToken) {
        // No access token means the user must log in
        return handleUnauthenticated(request);
    }

    const decodedToken = DecodeToken(accessToken);
    if (!decodedToken) {
        // If the token is invalid or absent, redirect to login
        return handleUnauthenticated(request);
    }

    const { isVerified, role } = decodedToken;
    const isPenjual = role === "83da0762-a57a-4125-8ebb-25386cdd0226";

    // Redirect to the homepage if already authenticated and trying to access login or register
    if (isVerified && ['/login', '/register', '/otp'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect to OTP page if the token is not verified and trying to access critical pages
    if (!isVerified && ['/dashboard', '/keranjang', '/pembayaran', '/transaksi', '/chat'].some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/otp', request.url));
    }

    // Redirect to login if trying to access protected routes without a valid token
    if (!isVerified && !accessToken && ['/dashboard', '/keranjang', '/pembayaran', '/transaksi', '/chat'].some(path => request.nextUrl.pathname.startsWith(path))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // For Penjual, check if the 'KurirPenjuals' are set, needed for access to certain routes
    let isKurirSet = false;
    if (accessToken && isPenjual) {
        isKurirSet = await checkKurirPenjual(accessToken);
    }

    // Redirect to /dashboard if Penjual is trying to access /daftartoko and KurirPenjual is set
    if (isPenjual && isKurirSet && request.nextUrl.pathname.startsWith('/daftarToko')) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // Redirect to /daftartoko if user is not verified but tries to access a protected dashboard route
    if (accessToken && isVerified && !isPenjual && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/daftarToko', request.url));
    }

    // Redirect if access token is invalid or expired (token verification)
    const isTokenValid = await verifyAccessToken(accessToken);
    if (!isTokenValid) {
        cookies().delete('accessToken');
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// Helper function for handling unauthenticated users
async function handleUnauthenticated(request) {
    // If the user is not logged in, redirect them to login (except if they're already on login/register page)
    if (['/login', '/register'].includes(request.nextUrl.pathname)) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url));
}

// Helper function to check if 'KurirPenjuals' is set for Penjual role
async function checkKurirPenjual(accessToken) {
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
            return data.data?.AuthPenjual?.KurirPenjuals?.length > 0;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        // In case of error, treat it as no KurirPenjuals
    }
    return false;
}

// Helper function to verify token validity
async function verifyAccessToken(accessToken) {
    try {
        const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        return verifyResponse.ok;
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
}

export const config = {
    matcher: ['/dashboard/:path*', '/keranjang', '/pembayaran', '/transaksi', '/login', '/register', '/daftarToko', '/otp', '/chat'],
};
