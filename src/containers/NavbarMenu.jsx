'use client'
import LogoMenu from '@/components/navbar/LogoMenu'
import MobileMenu from '@/components/navbar/MobileMenu'
import WebMenu from '@/components/navbar/WebMenu'
import { ThemeMode } from '@/components/ThemeMode'
import { useSession } from 'next-auth/react'
import React from 'react'

export default function NavbarMenu() {
    const { data: session } = useSession()
    let isLoggedin = session
    return (
        <header className='flex justify-between items-center'>
            <LogoMenu />
            <MobileMenu auth={isLoggedin} />
            <div className='hidden lg:flex items-center gap-5'>
                <WebMenu auth={isLoggedin} />
                <ThemeMode />
            </div>
        </header>
    )
}
