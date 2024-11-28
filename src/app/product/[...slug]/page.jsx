import ProductImage from '@/app/containers/Product/ProductImage';
import ProductInfo from '@/app/containers/Product/ProductInfo';
import ProductToko from '@/app/containers/Product/ProductToko';
import DecodeToken from '@/hooks/decodeToken';
import { fetchProductById } from '@/lib/productApi';
import { cookies } from 'next/headers';
import React from 'react'

export async function generateImageMetadata({ params }) {
    const slug = (await params).slug
    const product = await fetchProductById(slug);

    return {
        title: `${product.name} | Bekaspakai Indonesia Marketplace`,
        openGraph: {
            title: `${product.name} | Bekaspakai Indonesia Marketplace`,
            description: `${product.name} di Bekaspakai - marketplace terpercaya Indonesia untuk jual beli barang bekas berkualitas di Indonesia. Dukung gaya hidup minimalis dengan mudah dan cepat.`,
        },
    }
}

export default async function page({ params }) {
    const slug = (await params).slug
    const product = await fetchProductById(slug);
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value
    const idUserLogin = DecodeToken(accessToken)?.id

    console.log(product)

    if (!product.isAvailable) {
        return <p>Product {product.name} terjual</p>
    }

    return (
        <main>
            <section className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5'>
                <div className="rounded col-span-1 xl:col-span-2 h-fit grid gap-5">
                    <ProductImage product={product} />
                    <div className='space-y-5'>
                        <h1>Produk Lain dari <strong>{product.penjual.username}</strong></h1>
                        <ProductToko user={product.penjual.id} />
                    </div>
                </div>
                <ProductInfo product={product} idUserLogin={idUserLogin} accessToken={accessToken} />

            </section>
        </main>
    )
}
