import React from 'react'
import './loading.css'
import Image from 'next/image'

export default function loading() {
    return (
        <main className='flex items-center justify-center h-screen'>
            <Image
                src={'/Bekaspakai-logo-Master_Primary Black.png'}
                width={300}
                height={300}
                alt='Loading Bekaspakai Marketplace'
                priority={true}
                className='dark:hidden'
            />
            <Image
                src={'/Bekaspakai-logo-Master_Primary White.png'}
                width={300}
                height={300}
                alt='Loading Bekaspakai Marketplace'
                priority={true}
                className='hidden dark:block'
            />
        </main>
    )
}
