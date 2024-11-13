'use client'
import React from 'react'
import { ArrowLeftRight, LayoutDashboard, PackageSearch } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SideBar() {
    const pathname = usePathname()

    const menu = {
        overview: /^\/dashboard$/.test(pathname),
        product: /^\/dashboard\/produk(\/.*)?$/.test(pathname),
        transaksi: /^\/dashboard\/transaksi(\/.*)?$/.test(pathname),
        member: /^\/dashboard\/member(\/.*)?$/.test(pathname),
    };


    return (
        <>
            <Image src={'/logo baru bg transparant v.2.png'} alt="Logo" width={200} height={200} priority={true} />
            <Button variant={menu.overview ? '' : 'subtle'} asChild className={menu.overview ? '' : 'text-base hover:bg-secondary'}>
                <Link href={'/dashboard'} prefetch={false}><LayoutDashboard /> Ringkasan</Link>
            </Button>
            <Button variant={menu.product ? '' : 'subtle'} asChild className={menu.product ? '' : 'text-base hover:bg-secondary'}>
                <Link href={'/dashboard/produk'} prefetch={false}><PackageSearch /> Produk</Link>
            </Button>
            <Button variant={menu.transaksi ? '' : 'subtle'} asChild className={menu.transaksi ? '' : 'text-base hover:bg-secondary'}>
                <Link href={'/dashboard/transaksi'} prefetch={false}><ArrowLeftRight /> Transaksi</Link>
            </Button>
            <Button variant={menu.member ? '' : 'subtle'} asChild className={menu.member ? '' : 'text-base hover:bg-secondary'}>
                <Link href={'/dashboard/member'} prefetch={false}><PackageSearch /> Member</Link>
            </Button>
        </>
    )
}
