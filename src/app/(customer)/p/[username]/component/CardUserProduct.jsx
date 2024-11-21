import React, { Suspense } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Ellipsis } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct'
import { fetchUserProducts } from '@/lib/productApi'

export default async function CardUserProduct({ user }) {
    const product = await fetchUserProducts(user.id);

    if (!product) {
        return <div>Product Belum Ada</div>;
    }

    return (
        <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 '>
            <Suspense fallback={<SkeletonCardProduct />}>
                {product.map((item) => {
                    const price = item.price.toLocaleString("id-ID");
                    return (
                        <div
                            className={`space-y-2 ${!item.isAvailable ? 'opacity-50' : ''}`}
                            key={item.id}
                        >
                            <div className='flex items-center justify-between gap-2'>
                                <Link href={`/p/${item.penjual.username}`}>
                                    <div className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src={item.penjual.profile_picture.url} alt='Foto Penjual bekaspakai.com' />
                                            <AvatarFallback>{item.penjual.username.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <p>{item.penjual.username}</p>
                                    </div>
                                </Link>
                                <DropdownMenu>
                                    <DropdownMenuTrigger><Ellipsis /></DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Menu</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Bagikan</DropdownMenuItem>
                                        <DropdownMenuItem>Laporkan</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className='relative'>
                                {item.isAvailable ? (
                                    <Link
                                        href={`/JenisProduct/${item.JenisProduct.name.replace(/\s+/g, '-')}/${item.id}/${item.name.replace(/[\s/]+/g, '-')}`}
                                        prefetch={false}
                                    >
                                        <Image
                                            src={item.picture[0].url}
                                            alt="Foto Produk Bekaspakai.com"
                                            width={300}
                                            height={300}
                                            className='aspect-square w-full object-cover rounded xl:hover:scale-105 duration-300'
                                        />
                                    </Link>
                                ) : (
                                    <div className='relative'>
                                        <Image
                                            src={item.picture[0].url}
                                            alt="Foto Produk Tidak Tersedia"
                                            width={300}
                                            height={300}
                                            className='aspect-square w-full object-cover rounded grayscale'
                                        />
                                        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded'>
                                            <p className='text-white font-bold text-xl'>Sudah Terjual</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <Badge>{item.condition}</Badge>
                            <div>
                                <p className='truncate'>{item.name}</p>
                                {item.discount ? (
                                    <>
                                        <Badge variant="destructive">DISKON {item.discount}%</Badge>
                                        <p className='font-medium text-destructive line-through'>Rp {price}</p>
                                    </>
                                ) : null}
                                <p className=''>Rp
                                    <span className='font-bold text-lg'> {price}</span>
                                </p>
                            </div>
                            <p className='text-sm'>Kota Yogyakarta</p>
                        </div>
                    );
                })}
            </Suspense>
        </section>
    );
}
