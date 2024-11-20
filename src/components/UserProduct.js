'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Ellipsis, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

const UserProduct = ({ id }) => {
    const [dataProducts, setDataProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products?toko=${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                });

                const data = await response.json();

                if (response.ok) {
                    setDataProducts(data.data.products);
                } else {
                    setError(data.message || 'Error fetching products');
                }
            } catch (error) {
                setError('Failed to load products');
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center my-10">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (dataProducts.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center my-10'>
                <Image
                    src="/Empty Shopping Cart.H03.2k.webp"
                    alt="Empty Shopping Cart"
                    width={300}
                    height={300}
                />
                <p className='text-lg'>Belum Memiliki Produk</p>
            </div>
        );
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {dataProducts.map((item) => {
                const finalPrice = item.price - (item.price * item.discount / 100);
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
                                        <p className='font-semibold'>{item.penjual.username}</p>
                                        <p className='text-sm'>{item.datePosted ? '2 Hari yang lalu' : 'Baru saja'}</p>
                                    </div>
                                </div>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger><Ellipsis size={28} /></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link href='/jualbeli'>Laporkan Barang</Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Link href={`/JenisProduct/${item.JenisProduct.name.replace(/\s+/g, '-')}/${item.id}/${item.name.replace(/[\s/]+/g, '-')}`}>
                            <Image
                                src={item?.picture[0]?.url}
                                alt={item?.picture[0]?.alt}
                                key={item?.picture[0]?.key}
                                className='w-full h-80 object-cover my-2 hover:scale-105 transition ease hover:rounded'
                                width={300}
                                height={300}
                                priority // Improve performance for visible images
                            />
                        </Link>
                        <div className='space-y-2 flex flex-col'>
                            <Badge className='self-end'>{item.condition}</Badge>
                            <p className='capitalize truncate'>{item.name}</p>
                            <div className='grid grid-cols-2'>
                                <div>
                                    {item.discount ? (
                                        <>
                                            <Badge variant="destructive" className='text-white'>Diskon {item.discount}%</Badge>
                                            <p className='text-red-500 line-through'>Rp {(item.price).toLocaleString('id-ID')}</p>
                                            <p className='text-lg font-semibold truncate'>Rp {finalPrice.toLocaleString('id-ID')}</p>
                                        </>
                                    ) : (
                                        <p>Rp <span className='text-lg font-semibold truncate'>{(item.price).toLocaleString('id-ID')}</span></p>
                                    )}
                                </div>
                                <p className='flex items-center gap-1 text-md text-end place-self-end'>
                                    <MapPin size={20} /><span>{item.location || 'Yogyakarta'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserProduct;
