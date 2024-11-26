import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer>
            <section className='mt-10 py-5 border-t-2 grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 '>
                <ul className='text-sm'>
                    <li className='text-gray-500 text-base'>Perusahaan</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Tentang</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Media</Link>
                    </li>
                </ul>
                <ul className='text-sm'>
                    <li className='text-gray-500 text-base'>Untuk Kustomer</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Hubungi kita</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Bantuan</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>FAQ</Link>
                    </li>
                </ul>
                <ul className='text-sm col-span-2'>
                    <li className='text-gray-500 text-base'>Kerja Sama</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Kerja sama dengan Bekaspakai</Link>
                    </li>
                    <li> <Link href={'#'} className='hover:underline'>Bergabung dengan Bekaspakai</Link></li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Memberikan Tip</Link>
                    </li>
                </ul>
            </section>
            <section>
                <p className='font-semibold text-sm text-gray-500'>2024 Bekaspakai Marketplace Indonesia.</p>
            </section>
        </footer>
    )
}
