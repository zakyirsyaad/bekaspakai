import Card_JualBeli from '@/components/Product Jual Beli/Card_JualBeli'
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React, { Suspense } from 'react'

export default async function Highlight_JualBeli() {


    return (
        <section className='w-full space-y-5'>
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5' >
                <div>
                    <h1 className='text-lg font-semibold'>Produk Jual Beli</h1>
                    <h2 className='text-sm '>Barang terbaru di produk jual beli</h2>
                </div>
                <Button asChild>
                    <Link href={'/kategori/Jual-Beli'}>Lihat Semua</Link>
                </Button>
            </div>
            <Suspense fallback={<SkeletonCardProduct />}>
                <Card_JualBeli />
            </Suspense>

        </section>
    )
}

