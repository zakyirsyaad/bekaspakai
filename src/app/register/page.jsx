import { Separator } from '@/components/ui/separator'
import React from 'react'
import Image from 'next/image'
import FormRegister from '../containers/auth/FormRegister'

export const metadata = {
    title: 'Register | Bekaspakai Indonesia Marketplace',
    openGraph: {
        title: 'Register | Bekaspakai Indonesia Marketplace',
        description: 'Daftar Akun di Bekaspakai untuk mengakses marketplace terpercaya Indonesia untuk jual beli barang bekas. Buat akun Anda sekarang dan nikmati kemudahan bertransaksi aman dengan penawaran terbaik!',
    }
}

export default function page() {
    return (
        <main className='lg:flex items-center justify-center lg:justify-between'>
            <section className='space-y-5 lg:w-1/2 2xl:w-1/3'>
                <div>
                    <h1 className='text-xl 2xl:text-2xl font-medium'>Daftar Akun</h1>
                    <h2 className='text-sm 2xl:text-base'>Selamat datang di Bekaspakai, silahkan daftarkan akun anda</h2>
                </div>
                <Separator />
                <FormRegister />
            </section>
            <Image src="/image/pexels-mike-jones-9052276.jpg" alt='Foto Login' width={400} height={400} className='hidden 2xl:w-1/2 aspect-square object-cover lg:block rounded' priority={true} />
        </main>
    )
} 
