
import { Separator } from '@/components/ui/separator'
import React from 'react'
import Image from 'next/image'
import FormLogin from '../containers/auth/FormLogin'

export const metadata = {
    title: 'Login | Bekaspakai Marketplace Indonesia',
    openGraph: {
        title: 'Login | Bekaspakai Marketplace Indonesia',
        description: 'Login ke Bekaspakai untuk mengakses marketplace terbesar di Indonesia untuk jual beli barang bekas berkualitas. Bekaspakai adalah Marketplace terpercaya dari Indonesia untuk jual beli barang bekas layak pakai berkualitas.  Mulai pengalaman anda dengan hidup minimalist. Nikmati kemudahan bertransaksi cepat, aman dan mudah hanya di Bekaspakai.',
    }
}

export default function page() {
    return (
        <main className='lg:flex items-center justify-center lg:justify-between'>
            <section className='space-y-5 lg:w-1/2 2xl:w-1/3'>
                <div>
                    <h1 className='text-xl 2xl:text-2xl font-medium'>Masuk Akun</h1>
                    <h2 className='text-sm 2xl:text-base'>Selamat datang di Bekaspakai, silahkan masukkan akun anda</h2>
                </div>
                <Separator />
                <FormLogin />
            </section>
            <Image src="/image/pexels-blue-bird-7217899.jpg" alt='Foto Login' width={400} height={400} className='hidden 2xl:w-1/2 aspect-square object-cover lg:block rounded' priority={true} />
        </main>
    )
} 
