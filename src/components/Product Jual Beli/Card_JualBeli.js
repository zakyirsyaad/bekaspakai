import React, { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { SkeletonCardProduct } from '../Skeleton/SkeletonCardProduct'
import { Button } from '../ui/button'

async function Card_JualBeli() {
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?limit=4&tipe=Jual Beli&isAvailable=yes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        next: {
            revalidate: 5,
        }
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
                            <Suspense fallback={<SkeletonCardProduct />}>
                                <div className='flex items-center justify-between'>
                                    <Link href={`/p/${item.penjual.username}`} prefetch={false}>
                                        <div className='flex items-center gap-2'>
                                            <Avatar>
                                                <AvatarImage src={item.penjual.profile_picture.url} alt="Foto Penjual bekaspakai.com" />
                                                <AvatarFallback>P</AvatarFallback>
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
                                            <DropdownMenuItem asChild>
                                                <Button variant="subtle" asChild>
                                                    <Link href={'/laporkan'}>
                                                        Laporkan Barang
                                                    </Link>
                                                </Button>
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
                                    <p className='capitalize truncate text-sm'>{item.name}</p>
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
                            </Suspense>
                        </div>
                    )
                })
            }

        </div >
    )
}

export default Card_JualBeli
