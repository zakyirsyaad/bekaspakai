import React, { Suspense } from 'react';

import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default async function Kategori() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const data = await response.json();
    const kategori = data?.data?.result;

    return (
        <section>
            <h1 className="text-xl font-bold">Kategori Bekaspakai</h1>
            <ScrollArea className="w-full">
                <div className="flex gap-5 p-5 pl-0">
                    <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
                        {kategori.map((item) => {
                            const imageUrl = `/image/Kategori/${item.id}.webp`;
                            return (
                                <div
                                    key={item.id}
                                    className="grid w-[150px]"
                                >
                                    <Link href={`/kategori/${item.name.replace(/\s+/g, '-')}`} className='place-items-center text-center'>
                                        <Image
                                            src={imageUrl}
                                            alt="Foto Kategori bekaspakai.com"
                                            width={150}
                                            height={100}
                                            className="rounded h-[150px] object-cover bg-gray-200 p-5 hover:scale-105 duration-300 ease-in-out"
                                            priority={true}
                                        />
                                        <h2 className="text-sm mt-2">{item.name}</h2>
                                    </Link>
                                </div>
                            );
                        })}
                    </Suspense>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
        </section>
    );
}
