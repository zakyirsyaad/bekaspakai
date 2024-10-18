import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"

import imgProduct from '../../../public/TestFotoProduct.jpg'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

function Card_JualBeli() {

    return (
        <div className='space-y-2'>
            <Link href={'/jualbeli'}>
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
                    <DropdownMenu>
                        <DropdownMenuTrigger><Ellipsis size={28} /></DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Laporkan Barang</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Image src={imgProduct} alt='Foto Produk' className='w-full h-80 object-cover' width={300} height={300} />

                <div className='space-y-2'>
                    <Badge variant="outline">Jarang Digunakan</Badge>
                    <p className='capitalize'>macbook pro 2019 13" i5/16/128 original IBox 100%</p>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Rp. 12.500.000</p>
                        <p className='flex items-center gap-1 text-md'><MapPin size={20} /><span>Yogyakarta</span></p>
                    </div>

                </div>
            </Link>
        </div >
    )
}

export default Card_JualBeli
