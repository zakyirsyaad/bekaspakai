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
import ActionProduct from '@/containers/Detail Product/ActionProduct'
import AboutProduct from '@/containers/Detail Product/AboutProduct'
import UserProduct from '@/components/UserProduct'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import MobilNavDetailProduct from '@/components/MobilNavDetailProduct'

export default async function page({ params }) {
    let { id, title } = params
    let titleParams = title.replace(/-/g, ' ')

    let data = await fetch(`https://dummyjson.com/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let detailProducts = await data.json()

    let negotiable = true

    let garansiStatus = detailProducts.warrantyInformation

    return (
        <main className='space-y-5'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/jualbeli">JualBeli</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{titleParams}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <MobilNavDetailProduct negotiable={negotiable} />
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <AboutProduct detailProducts={detailProducts} titleParams={titleParams} />
                <div className='lg:fixed lg:z-10 lg:right-28 2xl:right-80 md:flex flex-col border-2 p-5 rounded shadow-xl hidden gap-5 h-fit bg-white dark:bg-black'>
                    <ActionProduct detailProducts={detailProducts} negotiable={negotiable} />
                    <Separator />
                    <div className='flex items-center gap-5'>
                        <ReceiptText />
                        <p>Pemakaian Harian</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <ShieldQuestion />
                        {garansiStatus ? <p>Garansi ON</p> : <p>Garansi OFF</p>}
                    </div>
                    <div className='flex items-center gap-5'>
                        <MapPin />
                        <p>Yogyakarta</p>
                    </div>
                </div>
            </section>
            <section className='space-y-5'>
                <div className='space-y-2'>
                    <h1 className='text-lg lg:text-xl font-semibold'>Produk Milik Keshyy</h1>
                    <p>Menampilkan beberapa produk milik keshy</p>
                    <Button variant="outline" asChild>
                        <Link href={'/'} >Lihat Semua</Link>
                    </Button>
                </div>
                <UserProduct detailProducts={detailProducts} />
            </section>
        </main>
    )
}
