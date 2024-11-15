import React, { Suspense } from 'react';
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Ellipsis, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export async function generateMetadata({ params }) {
    const { category } = params;

    return {
        title: `${category.replace(/-/g, ' ')} | Bekaspakai Indonesia Marketplace`,
        openGraph: {
            title: `${category.replace(/-/g, ' ')} | Bekaspakai Indonesia Marketplace`,
            description: `${category.replace(/-/g, ' ')} di Bekaspakai - marketplace terpercaya Indonesia untuk jual beli barang bekas. Nikmati kemudahan bertransaksi aman dengan penawaran terbaik!`,
        },
    }
}

export default async function page({ params }) {
    let { category } = params
    category = category.replace(/-/g, ' ');

    let responseCategory = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category?name=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    })

    if (!responseCategory.ok) throw new Error('Failed to fetch data');

    let dataCategory = await responseCategory.json()
    let categoryProduct = dataCategory.data.result

    let nameCategory = categoryProduct[0].name

    if (!categoryProduct.length) {
        return (
            <div>
                <p>Kategori not found</p>
                {category}
            </div>
        );
    }

    let responseProduct = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?isAvailable=true&category=${category}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    })

    if (!responseProduct.ok) throw new Error('Failed to fetch data');

    let data = await responseProduct.json()
    let productCategory = data.data.products

    if (!productCategory.length) {
        return (
            <div className='flex flex-col items-center justify-center'>
                <Image src="/Cartoon Girl Sad.H03.2k.webp" alt="Picture Empty Shopping Bekaspakai.com" width={300} height={300} />
                <p className='text-2xl text-center'>Maaf, <span className='font-medium'>Produk {nameCategory}</span> <span className='text-destructive font-medium'>Belum Ada</span></p>
            </div>
        );
    }


    return (
        <main className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-medium'>Kategori {categoryProduct[0].name}</h1>
            <section className='space-y-1'>
                <h2 className='text-base lg:text-lg'>Sub Kategori {categoryProduct[0].name}</h2>
                <div className='flex gap-2'>
                    {categoryProduct[0].subCategories.map((item) => {
                        return (
                            <Button
                                key={item.id}
                            >
                                <Link href={`/kategori/${nameCategory}/${item.name}`}>
                                    {item.name}
                                </Link>
                            </Button>
                        )
                    })}
                </div>
            </section>
            <Separator />
            <section className='space-y-5'>
                <p>Menampilkan {productCategory.length} Produk Terbaru Kategori {categoryProduct[0].name}</p>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                    {
                        productCategory.map((item) => {
                            let finalPrice = item.price - (item.price * item.discount / 100)
                            return (
                                <Suspense key={item.id} fallback={<SkeletonCardProduct />}>
                                    <div>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-2'>
                                                <Avatar>
                                                    <AvatarImage src={item.penjual.profile_picture.url} />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className='font-medium text-sm'>{item.penjual.username}</p>
                                                    {/* <p className='text-xs'>2 Hari yang lalu</p> */}
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
                                                src={item?.picture[0]?.url}
                                                alt={item?.picture[0]?.alt}
                                                key={item?.picture[0]?.key}
                                                className='w-full h-80 object-cover my-2 hover:scale-105 transition ease hover:rounded'
                                                width={300}
                                                height={300}
                                            />
                                        </Link>
                                        <div className='space-y-2 flex flex-col'>
                                            <Badge className=' self-end'>{item.condition}</Badge>
                                            <p className='capitalize truncate'>{item.name}</p>
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
                                </Suspense>
                            )
                        })
                    }
                </div >
            </section>

        </main>
    )
}
