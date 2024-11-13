import LogoMenu from '@/components/navbar/LogoMenu'
import MobileMenu from '@/components/navbar/MobileMenu'
import WebMenu from '@/components/navbar/WebMenu'
import { ThemeMode } from '@/components/ThemeMode'
import DecodeToken from '@/hooks/decode-token'
import { cookies } from 'next/headers'
import React from 'react'

export default async function NavbarMenu() {
    const accessToken = cookies().get('accessToken')?.value;
    const isVerified = DecodeToken(accessToken);
    const role = DecodeToken(accessToken)?.role;
    const isPenjual = role === "83da0762-a57a-4125-8ebb-25386cdd0226";

    // Lakukan fetch data user dengan token
    const response = await fetch(`${process.env.BASE_URL_API}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    const data = await response.json();
    const user = data.data;
    if (response)
        return (
            <header className='flex justify-between items-center'>
                <LogoMenu />
                <MobileMenu />
                <div className='hidden lg:flex items-center gap-5'>
                    <WebMenu user={user} accessToken={accessToken} isVerified={isVerified} isPenjual={isPenjual} />
                    <ThemeMode />
                </div>
            </header>
        )
}
