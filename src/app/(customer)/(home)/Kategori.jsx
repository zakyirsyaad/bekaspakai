import React, { Suspense } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Kategori() {

    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let data = await response.json()
    let kategori = data.data.result

    // const kategori = [
    //     { foto: 'https://images.unsplash.com/photo-1601467450590-8c3d11cde2fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://plus.unsplash.com/premium_photo-1684407616442-8d5a1b7c978e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { ifoto: 'https://plus.unsplash.com/premium_photo-1709560425798-d9bb56dff78b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://plus.unsplash.com/premium_photo-1669137055819-6f8c318d11ff?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://plus.unsplash.com/premium_photo-1677187301660-5e557d9c0724?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    //     { foto: 'https://images.unsplash.com/photo-1593766729975-b40ae45191ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    // ]
    return (
        <Carousel opts={{ slidesToScroll: 2, loop: true }}>
            <p className='text-lg font-semibold'>Kategori Produk</p>
            <CarouselContent>
                {kategori.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className='grid grid-cols-1 basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-40'
                    >
                        <Link href={`/kategori/${item.name.replace(/\s+/g, '-')}`}>
                            <div className='flex flex-col p-6 w-[150px] rounded'>
                                <Suspense fallback={<Skeleton className="w-full h-[100px]" />}>
                                    <Image
                                        src={item.foto}
                                        alt={item.kategori}
                                        width={100}
                                        height={100}
                                        className='rounded h-[100px] object-cover'
                                        priority={false}
                                    />
                                    <p className='text-sm text-center mt-2'>{item.name}</p>
                                </Suspense>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    )
}
