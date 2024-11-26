import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Hero() {
    return (
        <section className='grid lg:grid-cols-3  gap-5'>
            <div className='lg:col-span-2 h-96 relative'>
                <video
                    preload='metadata'
                    className='w-full h-full object-cover rounded shadow-xl'
                    autoPlay={true} loop={true}
                    muted={true}
                    playsInline
                >
                    <source
                        src={"/video/4912885-uhd_3840_2160_24fps.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
                <p className='text-3xl lg:text-4xl 2xl:text-5xl font-bold text-white absolute bottom-5 left-5 lg:left-10'>Dari yang lama, <br /> jadi lebih berarti</p>
            </div>
            <div className='lg:col-span-1 h-96 relative'>
                <Image
                    src={'/image/pexels-ekaterina-bolovtsova-4049876.jpg'}
                    alt="Bekaspakai"
                    width={400}
                    height={400}
                    priority={true}
                    className='h-96 w-full object-cover rounded shadow-xl'
                />
                <p className='text-accent text-2xl font-bold absolute top-5 left-5'>Ingin berbagi kebahagiaan?</p>
                <Button className='absolute bottom-5 left-5'>
                    <Link href="/dashboard/produk/tambahProduk">
                        Mulai Sekarang
                    </Link>
                </Button>
            </div>
        </section>
    )
}
