'use client';
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
import { SkeletonCardProduct } from "@/components/Skeleton/SkeletonCardProduct";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Search() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/products?search=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                setProducts(data.data.products);
                console.log(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    if (loading) return <div>Loading...</div>;

    return (
        <main className='space-y-10'>
            <h1>Menampilkan <strong>{products.length}</strong> Hasil Pencarian untuk <em><strong>{query}</strong></em></h1>
            {products.length > 0 ? (
                <section className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 '>
                    <Suspense fallback={<SkeletonCardProduct />}>
                        {products.map((item) => {
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
                                                    <AvatarImage src={item.penjual.profile_picture.url} alt='Foto Penjual bekaspakai.com' priority={toString(true)} />
                                                    <AvatarFallback>{item.penjual.username.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <p>{item.penjual.username}</p>
                                            </div>
                                        </Link>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger aria-label='Menu'><Ellipsis /></DropdownMenuTrigger>
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
                                                    priority={true}
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
            ) : (
                <section className="flex flex-col items-center justify-center gap-5 text-center">
                    <Image
                        src={"/Spine Box Packaging Blank.H03.2k.webp"}
                        alt="Foto Produk Tidak Tersedia, bekaspakai.com"
                        width={300}
                        height={300}
                        className='object-cover rounded'
                        priority={true}
                    />
                    <p className="xl:text-2xl">Maaf, produk <strong>{query}</strong> yang Anda cari tidak ditemukan.</p>
                </section>
            )}
        </main>
    );
}
