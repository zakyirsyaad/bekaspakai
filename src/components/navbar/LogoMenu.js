import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logoBekaspakai from '../../../public/Logo baru.svg'

function LogoMenu() {
    const version = "BETA 1.1.1"; // Set your version here

    return (
        <nav className='flex items-center justify-between gap-5 md:gap-10 text-sm md:text-base lg:text-lg'>
            <Link href="/" className='relative'>
                <Image src={logoBekaspakai} alt="Logo Bekaspakai" className='w-28 md:w-36 lg:w-40' width={100} height={100} priority />
                {/* Displaying version number */}
                <span className="text-xs bg-secondary truncate rounded px-1 absolute xl:right-1">Version: {version}</span>
            </ Link>
            <Link href={'/JenisProduct/Jual-Beli'} className='lg:text-base'>Jual Beli</Link>
            <Link href={'/JenisProduct/Donasi'} className='lg:text-base'>Donasi</Link>
        </nav>
    )
}

export default LogoMenu
