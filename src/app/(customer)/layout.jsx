import FooterBar from '@/app/(customer)/FooterBar'
import NavbarMenu from '@/app/(customer)/NavbarMenu'
import SearchBar from '@/app/(customer)/SearchBar'
import React from 'react'

export default function layout({ children }) {
    return (
        <main className="space-y-5 mb-5">
            <NavbarMenu />
            <SearchBar />
            {children}
            <FooterBar />
        </main>
    )
}
