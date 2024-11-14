import LogoMenu from '@/components/navbar/LogoMenu'
import MobileMenu from '@/components/navbar/MobileMenu'
import WebMenu from '@/components/navbar/WebMenu'
import DecodeToken from '@/hooks/decode-token'
import { cookies } from 'next/headers'
import React from 'react'

export default async function NavbarMenu() {

    return (
        <header className='flex justify-between items-center'>
            <LogoMenu />
            <MobileMenu />
            <div className='hidden lg:flex items-center gap-5'>
                <WebMenu />
            </div>
        </header>
    )
}
