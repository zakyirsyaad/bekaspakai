'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSelector } from 'react-redux'

function TotalKeranjang({ dataKeranjang }) {
    const order = useSelector((state) => state.order); // Get the current order from the Redux state

    // Calculate total price and item count
    let totalHarga = 0;
    let itemCount = 0;

    // Iterate through dataKeranjang to find matching products in the order
    dataKeranjang.forEach((item) => {
        item.products.forEach((product) => {
            // Check if the product ID is in the order
            if (order.includes(product.productId)) {
                totalHarga += product.price; // Add to total price
                itemCount += 1; // Increment item count
            }
        });
    });

    return (
        <div className='border p-5 rounded shadow-xl col-span-2 lg:col-span-1 space-y-2 h-fit'>
            <div className='flex justify-between'>
                <p className='text-sm'>Jumlah Barang</p>
                <p>{itemCount} item{itemCount !== 1 ? 's' : ''}</p> {/* Show item count */}
            </div>

            <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Total Harga</p>
                <p>Rp {totalHarga.toLocaleString('id-ID')}</p> {/* Display total price */}
            </div>
            <Button className="w-full" asChild>
                <Link href={{ pathname: '/pembayaran', query: { id: order } }} prefetch={false}>Lanjutkan Pembayaran</Link>
            </Button>
        </div>
    )
}

export default TotalKeranjang
