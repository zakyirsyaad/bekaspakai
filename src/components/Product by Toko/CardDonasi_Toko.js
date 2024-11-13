import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'

async function CardDonasi_Toko({ user }) {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?toko=${user.id}&tipe=Donasi`, {
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
            <div className='flex flex-col items-center justify-center my-10'>
                <Image
                    src="/Empty Shopping Cart.H03.2k.webp"
                    alt="Picture Empty Shopping Bekaspakai.com"
                    width={300}
                    height={300}
                />
                <p className=' text-lg'><span className='font-semibold'>@{user.username} </span>Belum Memiliki Product Donasi</p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {
                dataProducts.slice(0, 4).map((item) => {
                    let finalPrice = item.price - (item.price * item.discount / 100)
                    return (
                        <div>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src="https://github.com/shadcn.png" />
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
                            <div className='space-y-2 flex flex-col'>
                                <Badge className=' self-end'>{item.condition}</Badge>
                                <p className='capitalize'>{item.name}</p>
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

export default CardDonasi_Toko
