import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import CardProductDonasi from './component/CardProductDonasi'

export default function Highlight_Donasi() {
    return (
        <section className='w-full space-y-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5' >
                <div>
                    <h1 className='text-lg font-semibold'>Produk Donasi Bekaspakai</h1>
                    <h2 className='text-sm'>Barang terbaru di produk donasi</h2>
                </div>
                <Button asChild>
                    <Link href={'/jualbeli'} >Lihat Semua</Link>
                </Button>
            </div>
            <CardProductDonasi />
        </section>
    )
}
