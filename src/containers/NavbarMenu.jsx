import LogoMenu from '@/components/navbar/LogoMenu'
import MobileMenu from '@/components/navbar/MobileMenu'
import WebMenu from '@/components/navbar/WebMenu'
import { ThemeMode } from '@/components/ThemeMode'
import React from 'react'

export default function NavbarMenu() {
    let isLoggedin = false
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
