import { Separator } from '@/components/ui/separator'
import React from 'react'
import Image from 'next/image'
import FormOtp from '../containers/auth/FormOtp'
import { cookies } from 'next/headers'

export default async function page() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    function removeToken() {
        cookieStore.delete('accessToken')
    }
    return (
        <main className='lg:flex items-center justify-center lg:justify-between'>
            <section className='space-y-5 lg:w-1/2 2xl:w-1/3'>
                <div>
                    <h1 className='text-xl 2xl:text-2xl font-medium'>Verifikasi Email</h1>
                    <h2 className='text-sm 2xl:text-base'>Selamat datang di BekasPakai, silahkan verifikasi terlebih dahulu akun anda</h2>
                </div>
                <Separator />
                <FormOtp accessToken={accessToken} removeToken={removeToken} />
            </section>
            <Image src="/image/pexels-bertellifotografia-2748818.jpg" alt='Foto Login' width={400} height={400} className='hidden 2xl:w-1/2 aspect-square object-cover lg:block rounded' priority={true} />
        </main>
    )
} 
