'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import UserForm from './UserForm';
import OrderSummary from './OrderSummary';
export default function Container({ id, offer, accessToken }) {
    const router = useRouter();
    const [couriers, setCouriers] = useState(null);
    const [destinationPostalCode, setDestinationPostalCode] = useState();
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // console.log(destinationPostalCode)


    const productIds = Array.isArray(id) ? id : [id];

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const details = await Promise.all(
                    productIds.map(async (productId) => {
                        const response = await fetch(offer ? `${process.env.NEXT_PUBLIC_BASE_URL_API}/products/${productId}?offer=true` : `${process.env.NEXT_PUBLIC_BASE_URL_API}/products/${productId}`, {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            cache: 'no-store'
                        });

                        if (!response.ok) {
                            router.push('/');
                            return;
                        }

                        const data = await response.json();
                        const dataProduct = data.data?.product;

                        if (!dataProduct) {
                            throw new Error(`Product with ID ${productId} not found`);
                        }

                        return dataProduct;
                    })
                );
                setProductDetails(details);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productIds, router]);

    if (loading) {
        return (
            <div className="flex gap-8">
                {/* Left side skeleton loader for product list */}
                <div className="space-y-5 w-1/2">
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                    <Skeleton className="h-[50px] w-full rounded-xl" />
                </div>

                {/* Right side skeleton loader for payment summary */}
                <div className="w-1/2">
                    <Skeleton className="h-[500px] w-full rounded-xl" />
                </div>
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    const unavailableProducts = productDetails.filter(product => !product.isAvailable);
    if (unavailableProducts.length > 0) {
        return (
            <div className='flex flex-col items-center h-screen'>
                <Image src={'/Sold.webp'} width={300} height={300} alt="unavailable" />
                <p className='text-2xl'>
                    Maaf, <span className='font-semibold'>{unavailableProducts.map(product => product.name).join(', ')} </span>
                    <span className='text-destructive font-semibold'>sudah terjual</span>
                </p>
            </div>
        );
    }

    return (
        <main className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Pembayaran</h1>
            <h2>Informasi Pemesanan</h2>
            <section className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
                <UserForm accessToken={accessToken} detailProducts={productDetails} productIds={productIds} getCouriers={setCouriers} getPostalCode={setDestinationPostalCode} />
                <OrderSummary accessToken={accessToken} detailProducts={productDetails} productIds={productIds} couriers={couriers} destinationPostalCode={destinationPostalCode} />
            </section>
        </main>
    );
}
