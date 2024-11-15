import React from 'react';
import { redirect } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Ellipsis, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct';

export default async function page({ params }) {
    const { JenisProduct } = params;

    try {
        // Fetch available products
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?isAvailable=yes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store',
        });

        if (!response.ok) throw new Error('Failed to fetch data');

        const { data: { products = [] } } = await response.json();

        // Filter products based on JenisProduct parameter
        const filteredProducts = products.filter(product =>
            product.JenisProduct.name.replace(/\s+/g, '-').toLowerCase() === JenisProduct.toLowerCase()
        );

        // if (!products.length) {
        //     return (
        //         <div className='flex flex-col items-center justify-center'>
        //             <Image src="/Cartoon Girl Sad.H03.2k.webp" alt="Picture Empty Shopping Bekaspakai.com" width={300} height={300} />
        //             <p className='text-2xl text-center'>Maaf, <span className='font-medium'>Produk {nameCategory}</span> <span className='text-destructive font-medium'>Belum Ada</span></p>
        //         </div>
        //     );
        // }
        // Define header texts based on the type of product
        const isJualBeli = JenisProduct.toLowerCase() === 'jual-beli';
        const headerText = isJualBeli ? 'Produk Jual Beli' : 'Produk Donasi';
        const subHeaderText = `Menampilkan semua produk ${isJualBeli ? 'jual beli' : 'Donasi'}`;

        return (
            <main className='space-y-5'>
                {/* Header */}
                <div>
                    <h1 className='text-lg font-semibold'>{headerText}</h1>
                    <h1 className='text-sm'>{subHeaderText}</h1>
                </div>
                <Separator />

                {/* Product List */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
                    {filteredProducts.map((item) => {
                        const finalPrice = item.price - (item.price * item.discount / 100);

                        return (
                            <div key={item.id}>
                                <div className='flex items-center justify-between'>
                                    {/* Seller Information */}
                                    <Link href={`/p/${item.penjual.username}`} prefetch={false}>
                                        <div className='flex items-center gap-2'>
                                            <Avatar>
                                                <AvatarImage src={item.penjual.profile_picture.url} />
                                                <AvatarFallback>{item.penjual.username.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className='text-sm'>{item.penjual.username}</p>
                                            </div>
                                        </div>
                                    </Link>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger><Ellipsis size={28} /></DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem>
                                                <Link href={isJualBeli ? '/laporkan' : '/jualbeli'}>
                                                    Laporkan Barang
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                {/* Product Image */}
                                <Link href={`/JenisProduct/${item.JenisProduct.name.replace(/\s+/g, '-')}/${item.id}/${item.name.replace(/\s+/g, '-')}`} prefetch={false}>
                                    <Image
                                        src={item?.picture[0]?.url}
                                        alt={item?.picture[0]?.alt}
                                        key={item?.picture[0]?.key}
                                        className='w-full h-80 object-cover my-2 hover:scale-105 transition ease hover:rounded rounded'
                                        width={300}
                                        height={300}
                                    />
                                </Link>

                                {/* Product Details */}
                                <div className='space-y-2 flex flex-col'>
                                    <Badge className='self-end'>{item.condition}</Badge>
                                    <p className='capitalize truncate text-sm'>{item.name}</p>
                                    <div className='grid grid-cols-2'>
                                        <div>
                                            {/* Price with Discount */}
                                            {item.discount ? (
                                                <>
                                                    <Badge variant="destructive" className='text-white'>Diskon {item.discount}%</Badge>
                                                    <p className='text-red-500 line-through'>Rp {(item.price).toLocaleString('id-ID')}</p>
                                                    <p>Rp <span className='text-lg font-semibold truncate'>{finalPrice.toLocaleString('id-ID')}</span></p>
                                                </>
                                            ) : (
                                                <p>Rp <span className='text-lg font-semibold truncate'>{(item.price).toLocaleString('id-ID')}</span></p>
                                            )}
                                        </div>
                                        <p className='flex items-center gap-1 text-md text-end place-self-end'>
                                            <MapPin size={20} /><span>Yogyakarta</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        );

    } catch (error) {
        console.error('Error fetching data:', error);
        return (
            <div className="text-center mt-10">
                <p className="text-red-500">Error loading page content. Please try again later.</p>
            </div>
        );
    }
}
