import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

async function Card_Donasi() {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?limit=4&tipe=Donasi&isAvailable=yes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let data = await response.json()
    let dataProducts = data.data.products

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {
                dataProducts.sort(() => Math.random() - 0.5).map((item) => {
                    let finalPrice = item.price - (item.price * item.discount / 100)
                    return (
                        <div key={item.id}>
                            <div className='flex items-center justify-between'>
                                <Link href={`/p/${item.penjual.username}`} prefetch={false}>
                                    <div className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src={item.penjual.profile_picture.url} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='text-sm'>{item.penjual.username}</p>
                                            {/* <p className='text-sm'>2 Hari yang lalu</p> */}
                                        </div>
                                    </div>
                                </Link>
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
                            <Link href={`/JenisProduct/${item.JenisProduct.name.replace(/\s+/g, '-')}/${item.id}/${item.name.replace(/[\s/]+/g, '-')}`} prefetch={false}>
                                <Image
                                    src={item?.picture[0]?.url}
                                    alt={item?.picture[0]?.alt}
                                    key={item?.picture[0]?.key}
                                    className='w-full h-80 object-cover my-2 hover:scale-105 transition ease hover:rounded rounded'
                                    width={300}
                                    height={300}
                                />
                            </Link>
                            <div className='space-y-2 flex flex-col'>
                                <Badge className=' self-end'>{item.condition}</Badge>
                                <p className='capitalize text-sm truncate'>{item.name}</p>
                                <div className='grid grid-cols-2'>

                                    <div>
                                        {item.discount !== null && item.discount !== 0 ? (
                                            <Badge variant="destructive" className={'text-white'}>Diskon {item.discount}%</Badge>
                                        ) : null}
                                        {
                                            item.discount !== null && item.discount !== 0 ? (
                                                <>
                                                    <p className='text-red-500 line-through'>Rp {(item.price).toLocaleString('id-ID')}</p>
                                                    <p className='text-lg font-semibold truncate'>Rp {finalPrice.toLocaleString('id-ID')}</p>
                                                </>
                                            ) : (
                                                <p>Rp <span className='text-lg font-medium truncate'>{(item.price).toLocaleString('id-ID')}</span></p>
                                            )
                                        }
                                    </div>

                                    <p className='flex items-center gap-1 text-md text-end place-self-end'><MapPin size={20} /><span>Yogyakarta</span></p>
                                </div>

                            </div>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Card_Donasi
