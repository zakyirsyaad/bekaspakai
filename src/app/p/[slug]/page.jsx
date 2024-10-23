import BioProfile from '@/containers/Profile/bioProfile'
import ProductProfile from '@/containers/Profile/ProductProfile'
import React from 'react'

export default function page() {
    return (
        <main className='space-y-10'>
            <section className='flex flex-col gap-12 2xl:gap-24'>
                <BioProfile />
            </section>
            <section>
                <ProductProfile />
            </section>

        </main >
    )
}
