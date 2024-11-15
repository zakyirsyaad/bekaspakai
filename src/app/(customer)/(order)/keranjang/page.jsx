
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartProduct from './cartProduct'
import TotalCart from './totalCart'

export const metadata = {
    title: 'Keranjang | Bekaspakai Indonesia Marketplace',
    openGraph: {
        title: 'Keranjang | Bekaspakai Indonesia Marketplace',
        description: 'Keranjang di Bekaspakai - marketplace terpercaya Indonesia untuk jual beli barang bekas. Nikmati kemudahan bertransaksi aman dengan penawaran terbaik!',
    }
}

export default async function page() {
    const accessToken = cookies().get('accessToken')?.value
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    })
    let dataKeranjang = await response.json()
    dataKeranjang = dataKeranjang.data.keranjangProductData

    return (
        <main className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Keranjang</h1>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {dataKeranjang.length > 0 ?
                    <>
                        <CartProduct dataKeranjang={dataKeranjang} accessToken={accessToken} />
                        <TotalCart dataKeranjang={dataKeranjang} />
                    </>
                    :
                    <div className='flex flex-col justify-center col-span-3 text-center items-center gap-5'>
                        <Image src={'/cart.webp'} alt='Keranjang Bekaspakai kosong' width={300} height={300} />
                        <h2 className='text-lg 2xl:text-2xl font-bold'>Keranjang anda Kosong</h2>
                        <p className='text-sm 2xl:text-base'>Silahkan pilih produk <Link href={'/JenisProduct/Jual-Beli'} className='underline'>Jual Beli</Link> atau <Link href={'/JenisProduct/Donasi'} className='underline'>Donasi</Link> untuk menambahkan ke keranjang.</p>
                    </div>
                }
            </section>
        </main>
    )
}
