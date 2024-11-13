import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MapPin, ReceiptText, ShieldQuestion } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ActionProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/ActionProduct'
import AboutProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/AboutProduct'
import UserProduct from '@/components/UserProduct'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import MobilNavDetailProduct from '@/components/MobilNavDetailProduct'
import { cookies } from 'next/headers'

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
        // Handle the case where detailProducts is not available
        return <div>Product Terjual</div>
    }

    let negotiable = detailProducts.minimumPrice > 0 ? true : false

    let garansiStatus = detailProducts.garansi
    let isAVailable = detailProducts.isAVailable

    let alamatLengkap = detailProducts.penjual.AuthPenjual.alamat
    let alamatKota = alamatLengkap.split(' ')
    alamatKota = alamatKota[0];

    let subCategory = detailProducts.SubCategoryProduct.name

    return (
        <main className='space-y-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/JenisProduct/${JenisProduct}`}>JualBeli</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/kategori/${JenisProduct}/${subCategory}`}>{subCategory}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className='capitalize'>{titleParams.replace(/%2C/g, ",")}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <MobilNavDetailProduct negotiable={negotiable} />
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <AboutProduct detailProducts={detailProducts} titleParams={titleParams} />
                <div className='lg:fixed lg:z-10 lg:right-28 2xl:right-80 md:flex flex-col border-2 p-5 rounded shadow-xl hidden gap-5 h-fit bg-white dark:bg-black'>
                    <ActionProduct detailProducts={detailProducts} negotiable={negotiable} accessToken={accessToken} isAVailable={isAVailable} />
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
                <div className='space-y-2'>
                    <h1 className='text-lg lg:text-xl font-semibold'>Semua Produk @{detailProducts.penjual.username}</h1>
                    <p>Menampilkan beberapa produk milik @{detailProducts.penjual.username}</p>
                    <Button variant="outline" asChild>
                        <Link href={`/p/${detailProducts.penjual.username}`} prefetch >Lihat Semua</Link>
                    </Button>
                </div>
                <UserProduct id={detailProducts.penjual.id} />
            </section>
        </main>
    )
}
