import { fetchProductsDonasi, fetchProductsJualBeli } from '@/lib/productApi';
import Link from 'next/link';
import React, { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge"
import { SkeletonCardProduct } from './Skeleton/SkeletonCardProduct';



export default async function NewCardProduct({ value }) {

    const products = value === "Jual Beli" ? await fetchProductsJualBeli() : await fetchProductsDonasi();

    if (!products) {
        return <div>Product Belum Ada</div>;
    }

    console.log(products)

    return (
        <section className='grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5'>
            {products.slice(0, 4).map((product) => {
                return (
                    <Suspense fallback={<SkeletonCardProduct />} key={product.id} >
                        <div className='space-y-2'>
                            <div className='flex justify-between'>
                                <Link href={`/p/${product.penjual.username}`}>
                                    <div className='flex items-center gap-3 text-sm'>
                                        <Avatar>
                                            <AvatarImage src={product.penjual.profile_picture.url} alt='Foto Penjual bekaspakai.com' />
                                            <AvatarFallback>{product.penjual.username.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='font-medium'>{product.penjual.username}</p>
                                            <p className='text-xs'>Yogyakarta</p>
                                        </div>
                                    </div>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger aria-label='Menu'>
                                        <Ellipsis />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Bagikan</DropdownMenuItem>
                                        <DropdownMenuItem>Laporkan</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className='relative'>
                                <Link
                                    href={`/product/${product.id}`}
                                    prefetch={false}
                                >
                                    <Image
                                        src={product.picture[0].url}
                                        alt="Foto Produk Bekaspakai.com"
                                        width={300}
                                        height={300}
                                        className='aspect-square w-full object-cover rounded duration-300 hover:opacity-80'
                                        priority={true}
                                    />
                                </Link>
                                {product.discount &&
                                    <Badge className={'absolute top-2 right-2 text-base font-bold'}>PROMO {product.discount}%</Badge>
                                }
                            </div>
                            <div className='text-sm space-y-1'>
                                <div className='flex items-center gap-3'>
                                    {product.discount && <p className='text-sm font-semibold line-through text-gray-500'>Rp {product.price.toLocaleString('id-ID')}</p>}
                                    {product.price > 0 ? <p className='text-base font-semibold'>Rp {product.price.toLocaleString('id-ID')}</p> : <p className='text-base font-semibold'>Gratis</p>}
                                </div>
                                <p >{product.name}</p>
                                <Badge variant="secondary">{product.condition}</Badge>
                            </div>
                        </div>
                    </Suspense>
                )
            })}
        </section >
    )
}
