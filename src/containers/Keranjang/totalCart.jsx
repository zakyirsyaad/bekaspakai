import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

function TotalCart() {
    return (
        <div className='border bg-secondary/50 p-5 rounded shadow-lg col-span-2 lg:col-span-1 space-y-2 h-fit'>
            <div className='flex justify-between'>
                <p className='text-sm'>Jumlah Barang</p>
                <p>Rp 0</p>
            </div>

            <div className='flex justify-between'>
                <p className='text-sm font-semibold'>Total Harga</p>
                <p>Rp 0</p>
            </div>
            <Button className="w-full" asChild>
                <Link href={'/pembayaran'}>Lanjutkan Pembayaran</Link>
            </Button>
        </div>
    )
}

export default TotalCart
