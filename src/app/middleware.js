import { NextResponse } from 'next/server';

export default function middleware(req) {
    const path = req.nextUrl.pathname;

    // Dapatkan session token dari cookie
    const session = req.cookies.get("next-auth.session-token") || req.cookies.get("next-auth.token");

    // Jika tidak ada session dan user mencoba akses halaman yang bukan login/register
    if (!session && !path.startsWith('/login') && !path.startsWith('/register')) {
        return NextResponse.redirect(new URL(`/`, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/login', '/register', '/'],
};
