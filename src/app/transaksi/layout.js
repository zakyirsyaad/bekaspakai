'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Layout({ children }) {
    const [filter, setFilter] = useState('');

    const statuses = [
        { label: 'Semua', value: '' },
        { label: 'Belum Dibayar', value: 'Belum Dibayar' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Dikemas', value: 'Dikemas' },
        { label: 'Dikirim', value: 'Dikirim' },
        { label: 'Selesai', value: 'Selesai' },
        { label: 'Dibatalkan', value: 'Dibatalkan' },
        { label: 'Refund', value: 'Refund' }
    ];

    return (
        <div className='space-y-5'>
            <h1 className='text-lg 2xl:text-2xl font-bold'>Daftar Transaksi</h1>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                {statuses.map(({ label, value }) => (
                    <Button
                        asChild
                        key={value}
                        variant={filter === value ? '' : 'outline'}
                        onClick={() => setFilter(value)}
                    >
                        <Link href={{ pathname: '/transaksi', query: { status: value } }} className='text-wrap text-center'>
                            {label}
                        </Link>
                    </Button>
                ))}
            </div>
            {children}
        </div>
    );
}
