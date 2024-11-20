import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default async function Kategori() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const data = await response.json();
    const kategori = data.data.result;

    return (
        <Carousel opts={{ slidesToScroll: 2, loop: true }}>
            <p className="text-lg font-semibold">Kategori Produk</p>
            <CarouselContent>
                {kategori.map((item) => {
                    // Dynamically set the image path based on the item's ID
                    const imageUrl = `/Kategori/${item.id}.webp`; // Ensure images are named after their IDs in the public folder
                    return (
                        <CarouselItem
                            key={item.id}
                            className="grid grid-cols-1 basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-40"
                        >
                            <Link href={`/kategori/${item.name.replace(/\s+/g, '-')}`}>
                                <div className="flex flex-col p-6 w-[150px] rounded">
                                    <Image
                                        src={imageUrl}
                                        alt="Foto Kategori bekaspakai.com"
                                        width={100}
                                        height={125}
                                        className="rounded h-[125px] object-cover"
                                        priority={false}
                                    />
                                    <p className="text-sm text-center mt-2">{item.name}</p>
                                </div>
                            </Link>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
        </Carousel>
    );
}
