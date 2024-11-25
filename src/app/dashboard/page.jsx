import React from 'react'
import { ChartDashboard } from '../containers/Dashboard/ChartDashboard'
import OrderHistory from '../containers/Dashboard/OrderHistory'
import TotalRating from '../containers/Dashboard/TotalRating'
import TableTransaction from '../containers/Dashboard/TableTransaction'

export default function page() {

    return (
        <main>
            <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mt-5'>

                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Pending</p>
                    <p className='text-2xl font-semibold'>5</p>
                </div>
                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Dikemas</p>
                    <p className='text-2xl font-semibold'>10</p>
                </div>
                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Dikirim</p>
                    <p className='text-2xl font-semibold'>5</p>
                </div>
                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Selesai</p>
                    <p className='text-2xl font-semibold'>3</p>
                </div>
                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Dibatalkan</p>
                    <p className='text-2xl font-semibold'>0</p>
                </div>
                <div className='col-span-1 shadow p-2 dark:border rounded space-y-2'>
                    <p className='font-medium'>Refund</p>
                    <p className='text-2xl font-semibold'>0</p>
                </div>
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5'>
                <div className='col-span-1 lg:col-span-2 shadow p-2 rounded space-y-5'>
                    <p className='font-medium'>Total Transaksi Produk </p>
                    <ChartDashboard />
                </div>
                <div className='col-span-1 shadow p-2 rounded space-y-2'>
                    <h1 className='font-medium'>Pesanan Terbaru</h1>
                    <OrderHistory />
                </div>
            </section>
            <section className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-5'>
                <div className='col-span-1 shadow p-2 rounded space-y-2 h-fit'>
                    <h2 className="text-lg font-semibold mb-2">Rating dan Ulasan</h2>
                    <TotalRating />
                </div>

                <div className='col-span-1 lg:col-span-2 shadow p-2 rounded space-y-2'>
                    <h2 className="text-lg font-semibold mb-2">Transaksi Terakhir</h2>
                    <TableTransaction />
                </div>
            </section>
        </main>
    )
}
