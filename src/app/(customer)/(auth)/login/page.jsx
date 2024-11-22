
import GoogleButton from '@/components/GoogleButton'
import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import FormLogin from './Form_Login'
import Image from 'next/image'
import ImgLogin from '../../../../../public/Login Page.svg'
import { SkeletonFormLogin } from '@/components/Skeleton/SkeletonFormLogin'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
    title: 'Login | Bekaspakai Marketplace Indonesia',
    openGraph: {
        title: 'Login | Bekaspakai Marketplace Indonesia',
        description: 'Login ke Bekaspakai untuk mengakses marketplace terbesar di Indonesia untuk jual beli barang bekas berkualitas. Bekaspakai adalah Marketplace terpercaya dari Indonesia untuk jual beli barang bekas layak pakai berkualitas.  Mulai pengalaman anda dengan hidup minimalist. Nikmati kemudahan bertransaksi cepat, aman dan mudah hanya di Bekaspakai.',
    }
}

export default function page() {
    return (
        <main className='mt-10 h-screen md:h-auto lg:flex items-center justify-center lg:justify-between lg:gap-10'>
            <section className='space-y-5 lg:w-1/2 2xl:w-1/3'>
                <div>
                    <h1 className='text-xl 2xl:text-2xl font-medium'>Masuk Akun</h1>
                    <h2 className='text-sm 2xl:text-base'>Selamat datang di Bekaspakai, silahkan masukkan akun anda</h2>
                </div>
                <Separator />
                {/* <GoogleButton /> */}
                {/* <p className='text-center text-sm'>Atau menggunakan username</p> */}
                <Suspense fallback={<SkeletonFormLogin />}>
                    <FormLogin />
                </Suspense>
            </section>
            <Suspense fallback={<Skeleton className="w-full h-[200px] lg:h-[300px] 2xl:h-[400px]" />}>
                <Image src={ImgLogin} alt='Foto Login' className='hidden lg:block lg:w-1/2 rounded' priority={true} />
            </Suspense>
        </main>
    )
} 
