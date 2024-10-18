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
        { id: 1, nama_kategori: 'Elektronik', foto: '/TestFotoProduct.jpg' },
        { id: 2, nama_kategori: 'Kategori 2', foto: '/TestFotoProduct.jpg' },
        { id: 3, nama_kategori: 'Kategori 3', foto: '/TestFotoProduct.jpg' },
        { id: 4, nama_kategori: 'Kategori 4', foto: '/TestFotoProduct.jpg' },
        { id: 5, nama_kategori: 'Kategori 5', foto: '/TestFotoProduct.jpg' },
        { id: 6, nama_kategori: 'Kategori 6', foto: '/TestFotoProduct.jpg' },
        { id: 7, nama_kategori: 'Kategori 7', foto: '/TestFotoProduct.jpg' },
        { id: 8, nama_kategori: 'Kategori 8', foto: '/TestFotoProduct.jpg' },
        { id: 9, nama_kategori: 'Kategori 9', foto: '/TestFotoProduct.jpg' },
        { id: 10, nama_kategori: 'Kategori 10', foto: '/TestFotoProduct.jpg' },
        { id: 11, nama_kategori: 'Kategori 11', foto: '/TestFotoProduct.jpg' },
        { id: 12, nama_kategori: 'Kategori 12', foto: '/TestFotoProduct.jpg' },
        { id: 13, nama_kategori: 'Kategori 13', foto: '/TestFotoProduct.jpg' },
        { id: 14, nama_kategori: 'Kategori 14', foto: '/TestFotoProduct.jpg' },
        { id: 15, nama_kategori: 'Kategori 15', foto: '/TestFotoProduct.jpg' },
    ]
    return (
        <Carousel opts={{ slidesToScroll: 2, loop: true }}>
            <p className='text-lg font-semibold'>Kategori Produk</p>
            <CarouselContent>
                {kategori.map((item) => (
                    <CarouselItem
                        key={item.id}
                        className='flex justify-center items-center basis-1/2 md:basis-1/3 lg:basis-1/4 2xl:basis-40'
                    >
                        <Link href={`/kategori/${item.nama_kategori}`}>
                            <div className='flex flex-col items-center justify-center p-6 w-[150px] rounded'>
                                {/* Menampilkan gambar kategori */}
                                <Image
                                    src={item.foto}
                                    alt={item.nama_kategori}
                                    width={100}
                                    height={100}
                                    className='rounded w-full h-[100px] object-cover'
                                />
                                {/* Menampilkan nama kategori */}
                                <span className='text-sm font-semibold mt-2'>{item.nama_kategori}</span>
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
