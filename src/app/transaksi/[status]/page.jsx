import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import React from 'react';

const transactions = [
    {
        user: "Keshyy",
        produk: "MacBook Pro 2019 8/256Gb",
        harga: "Rp 7.250.000",
        status: "Dikemas"
    },
    {
        user: "Rizky",
        produk: "MacBook Air 2020 8/512Gb",
        harga: "Rp 10.000.000",
        status: "Dikirim"
    },
    {
        user: "Andi",
        produk: "MacBook Pro 2021 16/1Tb",
        harga: "Rp 25.500.000",
        status: "Selesai"
    },
    {
        user: "Sari",
        produk: "iPhone 12 Pro Max 256Gb",
        harga: "Rp 15.000.000",
        status: "Pending"
    },
    {
        user: "Budi",
        produk: "Mac Mini 2020 M1 512Gb",
        harga: "Rp 12.750.000",
        status: "Dibatalkan"
    },
    {
        user: "Tika",
        produk: "iPad Pro 2021 11 inch 128Gb",
        harga: "Rp 13.500.000",
        status: "Dikemas"
    },
    {
        user: "Adi",
        produk: "Apple Watch Series 6",
        harga: "Rp 7.000.000",
        status: "Dikirim"
    },
    {
        user: "Putri",
        produk: "AirPods Pro",
        harga: "Rp 3.750.000",
        status: "Refund"
    },
    {
        user: "Wahyu",
        produk: "iMac 2021 24 inch",
        harga: "Rp 30.500.000",
        status: "Dibatalkan"
    },
    {
        user: "Lia",
        produk: "MacBook Air M2 2022",
        harga: "Rp 19.000.000",
        status: "Selesai"
    }
];



export default function TransactionPage({ params }) {
    const { status } = params

    const filteredTransactions = transactions.filter((transaction) => {
        if (status === transaction.status) return true;
    });

    return (
        <div>
            <div className='space-y-5'>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                        <div key={transaction.id} className='border p-5 rounded space-y-2 shadow-md'>
                            <div className='flex justify-between'>
                                <p>User: {transaction.user}</p>
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
                            <div className='flex gap-5'>
                                <Image src={'https://github.com/shadcn.png'} alt="Product" className='rounded object-cover' width={200} height={200} />
                                <div>
                                    <p>{transaction.produk}</p>
                                    <p> {transaction.harga}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Tidak ada transaksi dengan status "{status}"</p>
                )}
            </div>
        </div>
    );
}
