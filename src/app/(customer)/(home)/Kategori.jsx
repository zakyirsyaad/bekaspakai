import React, { Suspense } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
// import Image from 'next/image'
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
                                    {/* <Image
                                        src={item.foto}
                                        alt={item.kategori}
                                        width={100}
                                        height={100}
                                        className='rounded h-[100px] object-cover'
                                        priority={false}
                                    /> */}
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
