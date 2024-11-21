import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import CardProductJualBeli from './component/CardProductJualBeli'

export default async function Highlight_JualBeli() {


    return (
        <section className='w-full space-y-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5' >
                <div>
                    <h3 className='text-lg font-semibold'>Produk Jual Beli Bekaspakai</h3>
                    <h4 className='text-sm '>Barang terbaru di produk jual beli</h4>
                </div>
                <Button asChild>
                    <Link href={'/kategori/Jual-Beli'}>Lihat Semua</Link>
                </Button>
            </div>
            <CardProductJualBeli />
        </section>
    )
}

