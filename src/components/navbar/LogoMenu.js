import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoDefault from '../../../public/LOGO ASTRO TRANSPARANT TULISAN HITAM.png'
import LogoDark from '../../../public/LOGO ASTRO TRANSPARANT.png'

function LogoMenu() {
    return (
        <nav className='flex items-center justify-between gap-5 md:gap-10 text-sm md:text-base lg:text-lg'>
            <Link href="/" >
                <Image src={LogoDefault} alt='BekasPakai Logo' className='dark:hidden w-28' priority={true} />
                <Image src={LogoDark} alt='BekasPakai Logo' className='hidden dark:block w-28' priority={true} />
            </ Link>
            <Link href={'/'}>Jual Beli</Link>
            <Link href={'/'}>Donasi</Link>
        </nav >
    )
}

export default LogoMenu
