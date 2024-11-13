import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

async function CardJualbeli_Toko({ user }) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?toko=${user.id}&tipe=Jual Beli`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store'
    })
    let data = await response.json()
    let dataProducts = data.data.products

    if (dataProducts.length === 0) {
        return (
            <div className='self-center'>
                <Image
                    src="/Empty Shopping Cart.H03.2k.webp"
                    width={300}
                    height={300}
                    alt="Picture Empty Shopping Bekaspakai.com"
                />
                <p className=' text-lg'><span className='font-semibold'>@{user.username} </span>Belum Memiliki Product Jual Beli</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {
                dataProducts.map((item) => {
                    let finalPrice = item.price - (item.price * item.discount / 100)
                    return (
                        <div key={item.id}>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src={item.penjual.profile_picture.url} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className='font-semibold'>{item.penjual.username}</p>
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
                            {item.isAvailable ? (
                                <Link href={`/JenisProduct/${item.JenisProduct.name.replace(/\s+/g, '-')}/${item.id}/${item.name.replace(/\s+/g, '-')}`}>
                                    <Image
                                        src={item.picture[0].url}
                                        alt={item.picture[0].alt}
                                        key={item.picture[0].key}
                                        className='w-full h-80 object-cover my-2 hover:scale-105 transition ease hover:rounded'
                                        width={300}
                                        height={300}
                                    />
                                </Link>
                            ) : (
                                <div className='relative'>
                                    <Image
                                        src={item.picture[0].url}
                                        alt={item.picture[0].alt}
                                        key={item.picture[0].key}
                                        className='w-full h-80 object-cover my-2 opacity-50'
                                        width={300}
                                        height={300}
                                    />
                                    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
                                        <p className='text-white font-semibold'>Sold Out</p>
                                    </div>
                                </div>
                            )}
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
                                                    <p>Rp <span className='text-lg font-semibold truncate'>{(finalPrice).toLocaleString('id-ID')}</span></p>
                                                </>
                                            ) : (
                                                <p>Rp <span className='text-lg font-semibold truncate'>{(item.price).toLocaleString('id-ID')}</span></p>
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

export default CardJualbeli_Toko
