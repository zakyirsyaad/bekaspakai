import CartProduct from '@/containers/Keranjang/cartProduct'
import TotalCart from '@/containers/Keranjang/totalCart'
import React from 'react'

export default function page() {
    return (
        <main className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Keranjang</h1>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                <CartProduct />
                <TotalCart />
            </section>
        </main>
    )
}
