import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer>
            <section className='mt-10 py-5 border-t-2 grid grid-cols-3 '>
                <ul className='text-sm'>
                    <li className='text-gray-500 text-base'>Home</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                </ul>
                <ul className='text-sm'>
                    <li className='text-gray-500 text-base'>Home</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                </ul>
                <ul className='text-sm'>
                    <li className='text-gray-500 text-base'>Home</li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li>
                        <Link href={'#'} className='hover:underline'>Home</Link>
                    </li>
                    <li> <Link href={'#'} className='hover:underline'>Home</Link></li>
                </ul>
            </section>
            <section>
                <p className='font-semibold text-sm text-gray-500'>2024 Bekaspakai Marketplace Indonesia.</p>
            </section>
        </footer>
    )
}
