import React, { Suspense } from 'react'
import { MapPin, ReceiptText, ShieldQuestion } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ActionProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/ActionProduct'
import AboutProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/AboutProduct'
import UserProduct from '@/components/UserProduct'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import MobilNavDetailProduct from '@/components/MobilNavDetailProduct'
import { cookies } from 'next/headers'
import Breadcrumbs from './Breadcrumbs'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'

export default async function page({ params }) {
    const accessToken = cookies().get('accessToken')?.value
    let { id, title, JenisProduct } = params
    let titleParams = title.replace(/-/g, ' ')

    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let data = await response.json()
    let detailProducts = data.data.product

    if (!detailProducts.isAvailable) {
        return (
            <div className='flex flex-col items-center h-screen'>
                <Image src={'/Sold.webp'} width={300} height={300} alt="unavailable" />
                <p className='text-2xl'>
                    Maaf, <span className='font-semibold'>{detailProducts.name.join(', ')} </span>
                    <span className='text-destructive font-semibold'>sudah terjual</span>
                </p>
            </div>
        )
    }

    // let negotiable = detailProducts.minimumPrice > 0 ? true : false
    let negotiable = false

    let garansiStatus = detailProducts.garansi
    let isAVailable = detailProducts.isAVailable

    let alamatLengkap = detailProducts.penjual.AuthPenjual.alamat
    let alamatKota = alamatLengkap.split(' ')
    alamatKota = alamatKota[0];

    let subCategory = detailProducts.SubCategoryProduct.name

    return (
        <main className='space-y-5 pb-10 md:pb-0'>
            <Breadcrumbs JenisProduct={JenisProduct} subCategory={subCategory} titleParams={titleParams} />
            <MobilNavDetailProduct detailProducts={detailProducts} negotiable={negotiable} accessToken={accessToken} isAVailable={isAVailable} />
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <Suspense fallback={<Skeleton className="w-full h-[200px] lg:h-[300px] 2xl:h-[400px]" />}>
                    <AboutProduct detailProducts={detailProducts} titleParams={titleParams} />
                </Suspense>
                <div className='lg:fixed lg:z-10 lg:right-28 2xl:right-80 md:flex flex-col border-2 p-5 rounded shadow-xl hidden gap-5 h-fit bg-white dark:bg-black'>
                    <Suspense fallback={<Skeleton className="w-full h-[200px] lg:h-[300px] 2xl:h-[400px]" />}>
                        <ActionProduct detailProducts={detailProducts} negotiable={negotiable} accessToken={accessToken} isAVailable={isAVailable} />
                    </Suspense>

                    <Separator />

                    <div className='flex items-center gap-5'>
                        <ReceiptText />
                        <p>{detailProducts.condition}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <ShieldQuestion />
                        {garansiStatus ? <p>Garansi ON</p> : <p>Garansi OFF</p>}
                    </div>
                    <div className='flex items-center gap-5'>
                        <MapPin />
                        <p>Kota {alamatKota}</p>
                    </div>
                </div>
            </section>
            <section className='space-y-5'>
                <h1 className='text-lg lg:text-xl font-semibold'>Semua Produk @{detailProducts.penjual.username}</h1>
                <UserProduct id={detailProducts.penjual.id} />
            </section>
        </main>
    )
}
