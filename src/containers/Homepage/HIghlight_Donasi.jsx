import Card_Donasi from '@/components/Product Jual Beli/Card_Donasi'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Highlight_Donasi() {
    return (
        <section className='w-full space-y-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5' >
                <div>
                    <h1 className='text-lg font-semibold'>Produk Donasi</h1>
                    <h2 className='text-sm'>Barang terbaru di produk donasi</h2>
                </div>
                <Button asChild>
                    <Link href={'/jualbeli'} >Lihat Semua</Link>
                </Button>
            </div>

            <Card_Donasi />

        </section>
    )
}
