import Card_JualBeli from '@/components/Product Jual Beli/Card_JualBeli'
import { Button } from '@/components/ui/button'
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
                <Button asChild>
                    <Link href={'/jualbeli'} className='text-primary font-bold underline underline-offset-4'>Lihat Semua</Link>
                </Button>
            </div>
            <Card_JualBeli />
        </section>
    )
}

