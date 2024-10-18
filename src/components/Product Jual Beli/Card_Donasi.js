import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

import imgProduct from '../../../public/TestFotoProduct.jpg'

function Card_Donasi() {

    return (
        <div className='space-y-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='font-semibold'>@shadcn</p>
                        <p className='text-sm'>2 Hari yang lalu</p>
                    </div>
                </div>
                <Ellipsis size={28} />
            </div>

            <Image src={imgProduct} alt='Foto Produk' className='w-full h-80 object-cover' width={300} height={300} />

            <div className='space-y-2'>
                <Badge variant="outline">Jarang Digunakan</Badge>
                <p className='capitalize'>macbook pro 2019 13" i5/16/128 original IBox 100%</p>
                <div className='flex justify-between'>
                    <p className='font-semibold'>FREE</p>
                    <p className='flex items-center gap-1 text-md'><MapPin size={20} /><span>Yogyakarta</span></p>
                </div>

            </div>
        </div >
    )
}

export default Card_Donasi
