import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Image from 'next/image'
import React from 'react'

export default function OrderSummary() {
    return (
        <div className='col-span-1 border p-5 rounded shadow-lg space-y-10'>
            <div className='space-y-5'>
                <div className='flex gap-2 items-center'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className='font-medium'>keshyy</p>
                </div>
                <div className='flex items-center gap-5'>
                    <Image src={'https://github.com/shadcn.png'} alt='Foto Keranjang' className='rounded w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 object-cover' width={100} height={100} />
                    <div className='w-40 md:w-96 lg:w-64 2xl:w-96'>
                        <p className='text-sm md:text-base truncate opacity-50'>MacBook Pro 2019 8/256Gb</p>
                        <p className='text-base md:text-lg font-medium'>Rp 1.000.000</p>
                    </div>
                </div>
                <div className='flex items-center gap-5'>
                    <Image src={'https://github.com/shadcn.png'} alt='Foto Keranjang' className='rounded w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 object-cover' width={100} height={100} />
                    <div className='w-40 md:w-96 lg:w-64 2xl:w-96'>
                        <p className='text-sm md:text-base truncate md: opacity-50'>MacBook Pro 2019 8/256Gb</p>
                        <p className='text-base md:text-lg font-medium'>Rp 1.000.000</p>
                    </div>
                </div>
            </div >
            <div className='space-y-2'>
                <Separator />
                <div className='flex justify-between'>
                    <p>Total Barang</p>
                    <p className='font-semibold'>Rp 2.000.000</p>
                </div>
                <div className='flex justify-between'>
                    <p>Pengiriman</p>
                    <p className='font-semibold'>Rp 20.000</p>
                </div>
                <div className='flex justify-between'>
                    <p>Layanan</p>
                    <p className='font-semibold'>Rp 10.000</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold'>Total Pembayaran</p>
                    <p className='font-bold'>Rp 10.000</p>
                </div>
            </div>
        </div >
    )
}
