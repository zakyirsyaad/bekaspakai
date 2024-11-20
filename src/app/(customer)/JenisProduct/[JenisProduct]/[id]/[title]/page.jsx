'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { MapPin, ReceiptText, ShieldQuestion } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import ActionProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/ActionProduct';
import AboutProduct from '@/app/(customer)/JenisProduct/[JenisProduct]/[id]/[title]/AboutProduct';
import UserProduct from '@/components/UserProduct';
import MobilNavDetailProduct from '@/components/MobilNavDetailProduct';
import Breadcrumbs from './Breadcrumbs';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import Cookies from 'js-cookie';

export default function Page({ params }) {
    const accessToken = Cookies.get('accessToken');
    const { id, title, JenisProduct } = params;
    const [detailProducts, setDetailProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const titleParams = title.replace(/[-/]/g, ' ');


    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }

                const data = await response.json();
                setDetailProducts(data.data.product);
            } catch (err) {
                setError('Error loading product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <Skeleton className="w-full h-[300px]" />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (detailProducts && !detailProducts.isAvailable) {
        return (
            <div className="flex flex-col items-center h-screen">
                <Image src="/Sold.webp" width={300} height={300} alt="unavailable" />
                <p className="text-2xl">
                    Maaf, <span className="font-semibold">{detailProducts.name.join(', ')}</span>{' '}
                    <span className="text-destructive font-semibold">sudah terjual</span>
                </p>
            </div>
        );
    }

    const negotiable = detailProducts?.minimumPrice > 0;
    const garansiStatus = detailProducts?.garansi;
    const isAvailable = detailProducts?.isAvailable;
    const alamatLengkap = detailProducts?.penjual.AuthPenjual.alamat;
    const alamatKota = alamatLengkap?.split(' ')[0];
    const subCategory = detailProducts?.SubCategoryProduct.name;

    return (
        <main className="space-y-5 pb-10 md:pb-0">
            <Breadcrumbs JenisProduct={JenisProduct} subCategory={subCategory} titleParams={titleParams} />
            <MobilNavDetailProduct
                detailProducts={detailProducts}
                negotiable={negotiable}
                accessToken={accessToken}
                isAvailable={isAvailable}
            />
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                    <AboutProduct detailProducts={detailProducts} titleParams={titleParams} />
                </Suspense>
                <div className="lg:fixed lg:z-10 lg:right-28 2xl:right-80 md:flex flex-col border-2 p-5 rounded shadow-xl hidden gap-5 h-fit bg-white dark:bg-black">
                    <Suspense fallback={<Skeleton className="w-full h-[300px]" />}>
                        <ActionProduct
                            detailProducts={detailProducts}
                            negotiable={negotiable}
                            accessToken={accessToken}
                            isAvailable={isAvailable}
                        />
                    </Suspense>
                    <Separator />
                    <div className="flex items-center gap-5">
                        <ReceiptText />
                        <p>{detailProducts?.condition}</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <ShieldQuestion />
                        <p>{garansiStatus ? 'Garansi ON' : 'Garansi OFF'}</p>
                    </div>
                    <div className="flex items-center gap-5">
                        <MapPin />
                        <p>Kota {alamatKota}</p>
                    </div>
                </div>
            </section>
            <section className="space-y-5">
                <h1 className="text-lg lg:text-xl font-semibold">Semua Produk @{detailProducts?.penjual.username}</h1>
                <UserProduct id={detailProducts?.penjual.id} />
            </section>
        </main>
    );
}
