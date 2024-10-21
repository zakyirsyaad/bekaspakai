'use client'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';



export default function Layout({ children }) {
    const [filter, setFilter] = useState('');

    const statuses = [
        'Pending',
        'Dikemas',
        'Dikirim',
        'Selesai',
        'Dibatalkan',
        'Refund'
    ]

    return (
        <div className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Daftar Transaksi</h1>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
                <Button asChild variant={filter === '' ? '' : 'outline'} onClick={() => setFilter('')}>
                    <Link href="/transaksi">Semua</Link>
                </Button>

                {statuses.map((status) => (
                    <Button asChild key={status} onClick={() => setFilter(status)} variant={filter === status ? '' : 'outline'}>
                        <Link href={`/transaksi/${status}`}>
                            {status}
                        </Link>
                    </Button>
                ))}
            </div>

            {children}
        </div>
    )
}
