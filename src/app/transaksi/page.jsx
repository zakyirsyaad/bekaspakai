'use client'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

const transactions = [
    {
        id: 1,
        user: "Keshyy",
        produk: "MacBook Pro 2019 8/256Gb",
        harga: "Rp 7.250.000",
        status: "Dikemas"
    },
    {
        id: 2,
        user: "Rizky",
        produk: "MacBook Air 2020 8/512Gb",
        harga: "Rp 10.000.000",
        status: "Dikirim"
    },
    {
        id: 3,
        user: "Andi",
        produk: "MacBook Pro 2021 16/1Tb",
        harga: "Rp 25.500.000",
        status: "Selesai"
    },
    {
        id: 4,
        user: "Sari",
        produk: "iPhone 12 Pro Max 256Gb",
        harga: "Rp 15.000.000",
        status: "Pending"
    },
    {
        id: 5,
        user: "Budi",
        produk: "Mac Mini 2020 M1 512Gb",
        harga: "Rp 12.750.000",
        status: "Dibatalkan"
    },
    {
        id: 6,
        user: "Tika",
        produk: "iPad Pro 2021 11 inch 128Gb",
        harga: "Rp 13.500.000",
        status: "Dikemas"
    },
    {
        id: 7,
        user: "Adi",
        produk: "Apple Watch Series 6",
        harga: "Rp 7.000.000",
        status: "Dikirim"
    },
    {
        id: 8,
        user: "Putri",
        produk: "AirPods Pro",
        harga: "Rp 3.750.000",
        status: "Refund"
    },
    {
        id: 9,
        user: "Wahyu",
        produk: "iMac 2021 24 inch",
        harga: "Rp 30.500.000",
        status: "Dibatalkan"
    },
    {
        id: 10,
        user: "Lia",
        produk: "MacBook Air M2 2022",
        harga: "Rp 19.000.000",
        status: "Selesai"
    },
    {
        id: 11,
        user: "alvaro",
        produk: "MacBook Pro 2022 16/1Tb",
        harga: "Rp 26.000.000",
        status: "Pending"
    },
    {
        id: 12,
        user: "siti",
        produk: "MacBook Pro 2022 16/1Tb",
        harga: "Rp 26.000.000",
        status: "Pending"
    }
];

export default function Page() {
    // State untuk mengatur batas jumlah transaksi yang ditampilkan
    const [visibleCount, setVisibleCount] = useState(3);

    // Fungsi untuk menambah jumlah transaksi yang ditampilkan
    const showMoreTransactions = () => {
        setVisibleCount(prevCount => prevCount + 3);
    };

    return (
        <div className='flex flex-col gap-5'>
            <div className='space-y-5'>
                {transactions.length > 0 ? (
                    transactions
                        .slice() // copy the array first to avoid mutating the original
                        .reverse() // membalikkan urutan data
                        .slice(0, visibleCount) // ambil berdasarkan jumlah visibleCount
                        .map((transaction) => (
                            <div key={transaction.id} className='rounded space-y-5'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold capitalize'>User: {transaction.user}</p>
                                    <div className='flex flex-col items-end md:flex-row md:items-center gap-2'>
                                        <p className='text-xs md:text-sm font-medium'>INV/20231103/MPL/3544462305,</p>
                                        <p className='text-xs md:text-sm font-medium'>Tgl Pembelian: 20 Oktober 2024</p>
                                        <Badge
                                            className={
                                                transaction.status === 'Dibatalkan' ? 'bg-red-700' :
                                                    transaction.status === 'Dikirim' ? 'bg-green-700' :
                                                        transaction.status === 'Refund' ? 'bg-red-700' :
                                                            transaction.status === 'Pending' ? 'bg-yellow-700' :
                                                                'secondary'
                                            }
                                        >
                                            {transaction.status}
                                        </Badge>
                                    </div>

                                </div>
                                <div className='flex gap-5'>
                                    <Image src={'https://github.com/shadcn.png'} alt="Product" className='rounded object-cover w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32' width={200} height={200} />
                                    <div className='flex flex-col justify-between'>
                                        <div>
                                            <p className='text-sm lg:text-lg'>{transaction.produk}</p>
                                            <p className='text-base lg:text-xl font-bold'>{transaction.harga}</p>
                                        </div>
                                        <div className='space-x-3'>
                                            <Button variant='subtle'><Ellipsis /></Button>
                                            <Button variant='outline'>Lihat Transaksi</Button>
                                            <Button >Selesaikan Transaksi</Button>
                                        </div>
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        ))
                ) : (
                    <p>Tidak ada transaksi.</p>
                )}
            </div>
            {/* Tombol Lihat Lebih Banyak */}
            {visibleCount < transactions.length && (
                <Button onClick={showMoreTransactions} className='self-center'>
                    Lihat Lebih Banyak
                </Button>
            )}
        </div>
    );
}