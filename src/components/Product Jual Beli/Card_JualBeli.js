import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

async function Card_JualBeli() {
    let data = await fetch(`https://dummyjson.com/products?limit=4`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let dataUserProduct = await data.json()
    let dataProducts = dataUserProduct.products

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {
                dataProducts.map((item) => {
                    return (
                        <div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='font-semibold'>{item.brand}</p>
                                        <p className='text-sm'>2 Hari yang lalu</p>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger><Ellipsis size={28} /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <Link href={'/jualbeli'}>
                                                Laporkan Barang
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <Link href={`/jualbeli/${item.id}/${item.title.replace(/\s+/g, '-')}`}>
                                <Image src={item.images[0]} alt='Foto Produk' className='w-full h-80 object-cover hover:scale-110 transition duration-300 ease-in-out' width={300} height={300} />
                            </Link >
                            <div className='space-y-2'>
                                <Badge variant="outline">Jarang Digunakan</Badge>
                                <p className='capitalize'>{item.title}</p>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>Rp. 12.500.000</p>
                                    <p className='flex items-center gap-1 text-md'><MapPin size={20} /><span>Yogyakarta</span></p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Card_JualBeli
