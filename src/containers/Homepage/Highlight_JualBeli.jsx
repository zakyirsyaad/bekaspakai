import Card_JualBeli from '@/components/Product Jual Beli/Card_JualBeli'
import Link from 'next/link'
import React from 'react'

export default function Highlight_JualBeli() {
    return (
        <section className='w-full space-y-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5' >
                <div>
                    <h1 className='text-lg font-semibold'>Produk Jual Beli</h1>
                    <h2 className='text-sm'>Barang terbaru di produk jual beli</h2>
                </div>
                <Link href={'/jualbeli'} className='text-primary font-bold underline underline-offset-4'>Lihat Semua</Link>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                <Card_JualBeli />
                <Card_JualBeli />
                <Card_JualBeli />
                <Card_JualBeli />
            </div>
        </section>
    )
}
