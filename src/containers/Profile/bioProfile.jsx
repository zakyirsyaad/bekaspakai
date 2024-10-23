import React from 'react'
import { CalendarCheck2, MapPinHouse } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import EditProfile from '@/components/EditProfile'



function BioProfile() {
    return (
        <>
            <div className='relative'>
                <Image src='/logo baru bg transparant v.2.png' alt='Banner Profile Page' className='w-full h-[100px] lg:h-[200px] 2xl:h-[300px] object-cover shadow-xl rounded' width={200} height={200} unoptimized />
                <Image src='https://i.pinimg.com/control/564x/9a/6e/3a/9a6e3a90eee973c43f0e813ef14acd6a.jpg' alt='Banner Profile Page' className='absolute -bottom-10 left-5 2xl:-bottom-20 2xl:left-10 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 object-cover rounded-full border' width={200} height={200} />
            </div>
            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-lg 2xl:text-xl font-semibold'>Ruby Keshy Zahra</h1>
                        <p className='text-sm 2xl:text-base'>@keshyy</p>
                    </div>
                    <EditProfile />
                </div>
                <div className='flex gap-5'>
                    <p className='flex items-center gap-2 text-sm 2xl:text-base'><MapPinHouse />Yogyakarta</p>
                    <p className='flex items-center gap-2 text-sm 2xl:text-base'><CalendarCheck2 />1 Oktober 2023</p>
                </div>
                <p className='text-sm lg:text-base 2xl:text-lg'>Toko kami menyediakan produk berkualitas dengan harga terjangkau. Pelayanan cepat, ramah, dan terpercaya. Kepuasan Anda prioritas kami!</p>
                <Separator />
            </div>
        </>
    )
}

export default BioProfile
