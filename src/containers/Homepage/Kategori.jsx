import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export default async function Kategori() {

    const kategori = [
        { id: 1, kategori: 'Elektronik', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 2, kategori: 'Kecantikan & Kesehatan', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 3, kategori: 'Peratalan Kos/Rumah Tangga', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 4, kategori: 'Kesehatan', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 5, kategori: 'Makanan', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 6, kategori: 'Buku', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 7, kategori: 'Pakaian Pria', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 8, kategori: 'Pakaian Wanita', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },
        { id: 9, kategori: 'Peralatan Olahraga', subKategori: 'Laptop', foto: '/TestFotoProduct.jpg' },

    ]
    return (
        <Carousel opts={{ slidesToScroll: 2, loop: true }}>
            <p className='text-lg font-semibold'>Kategori Produk</p>
            <CarouselContent>
                {kategori.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className='grid grid-cols-1 basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-40'
                    >
                        <Link href={`/${item.kategori.replace(/\s+/g, '-')}`}>
                            <div className='flex flex-col p-6 w-[150px] rounded'>
                                {/* Menampilkan gambar kategori */}
                                <Image
                                    src={item.foto}
                                    alt={item.kategori}
                                    width={100}
                                    height={100}
                                    className='rounded w-full h-[100px] object-cover'
                                />
                                {/* Menampilkan nama kategori */}
                                <p className='text-sm text-center font-semibold mt-2'>{item.kategori}</p>
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
