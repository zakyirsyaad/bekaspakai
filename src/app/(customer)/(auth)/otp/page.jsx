import { Separator } from '@/components/ui/separator'
import React, { Suspense } from 'react'
import Image from 'next/image'
import ImgLogin from '../../../../../public/Login Page.svg'
import { SkeletonFormLogin } from '@/components/Skeleton/SkeletonFormLogin'
import { Skeleton } from '@/components/ui/skeleton'
import Form_Otp from './Form_Otp'

export default function page() {
    return (
        <main className='mt-10 lg:flex items-center justify-center lg:justify-between lg:gap-10'>
            <section className='space-y-5 lg:w-1/2 2xl:w-1/3'>
                <div>
                    <h1 className='text-xl 2xl:text-2xl font-medium'>Verifikasi Email</h1>
                    <h2 className='text-sm 2xl:text-base'>Selamat datang di BekasPakai, silahkan verifikasi terlebih dahulu akun anda</h2>
                </div>
                <Separator />
                {/* <GoogleButton />
                <p className='text-center text-sm'>Atau menggunakan username</p> */}
                <Suspense fallback={<SkeletonFormLogin />}>
                    <Form_Otp />
                </Suspense>
            </section>
            {/* <section className='w-1/2 bg-black justify-end'> */}
            <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}>
                <Image src={ImgLogin} alt='Foto Login' className='hidden lg:block lg:w-1/2 rounded' priority={true} />
            </Suspense>
            {/* </section> */}
        </main>
    )
} 
