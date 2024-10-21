import OrderSummary from '@/containers/Pembayaran/orderSummary'
import UserForm from '@/containers/Pembayaran/userForm'
import React from 'react'

export default function page() {
    return (
        <main className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Pembayaran</h1>
            <h2>Informasi Pemesanan</h2>
            <section className='grid grid-cols-1  lg:grid-cols-2 gap-10'>
                <UserForm />
                <OrderSummary />
            </section>
        </main>
    )
}
