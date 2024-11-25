import React from 'react'
import Image from 'next/image'
import { cookies } from 'next/headers'
import CourierSelection from './kurir/page'
import FormToko from '../containers/Daftar Toko/FormToko'

export const metadata = {
    title: 'Daftar Toko | Bekaspakai Indonesia Marketplace',
    openGraph: {
        title: 'Daftar Toko | Bekaspakai Indonesia Marketplace',
        description: 'Daftar Toko di Bekaspakai, Bekaspakai adalah Marketplace terpercaya dari Indonesia untuk jual beli barang bekas layak pakai berkualitas.  Mulai pengalaman anda dengan hidup minimalist. Nikmati kemudahan bertransaksi cepat, aman dan mudah hanya di Bekaspakai.',
    }
}

export default async function page() {
    const cookieStore = await cookies()
    let accessToken = cookieStore.get('accessToken')?.value
    // let removeToken = cookieStore.delete('accessToken')
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    })
    let data = await response.json()
    let users = data.data

    const formUpgradeToko = () => {
        if (users.AuthPenjual === null) {
            return <FormToko users={users} accessToken={accessToken} />
        } else if (users.AuthPenjual !== null && users.AuthPenjual.KurirPenjuals.length === 0) {
            return <CourierSelection accessToken={accessToken} />
        }
    }

    return (
        <main className='grid grid-cols-1 md:grid-cols-2 gap-10 center'>
            <section className='space-y-5'>
                <div>
                    <h1 className='text-xl font-semibold'>Informasi Pemilik Barang</h1>
                    <h2 className='text-sm'>Silahkan lengkapi informasi tersebut untuk memposting produk</h2>
                </div>
                {formUpgradeToko()}
            </section>
            <Image src={'/Foto Form Toko.jpg'} alt='Foto Form Toko' className='hidden md:block rounded w-full object-cover' width={200} height={200} priority={true} />
        </main>
    )
}
