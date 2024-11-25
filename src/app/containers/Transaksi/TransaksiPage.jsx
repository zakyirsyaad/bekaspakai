'use client'
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Ellipsis, ShoppingBag } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import OpsiTransaksi from './OpsiTransaksi';
import DetailTransaksi from './DetailTransaksi';
import SelesaikanTransaksi from './SelesaikanTransaksi';

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
    },
    {
        user: "Elowen",
        produk: "MacBook Pro 2022 16/1Tb",
        harga: "Rp 26.000.000",
        status: "Dikemas"
    },
    {
        user: "Bellamy",
        produk: "MacBook Pro 2022 16/1Tb",
        harga: "Rp 26.000.000",
        status: "Dikemas"
    },
    {
        user: "Murphy",
        produk: "MacBook Pro 2022 16/1Tb",
        harga: "Rp 26.000.000",
        status: "Selesai"
    }
];



export default function TransaksiPage() {
    const searchParams = useSearchParams()
    const [visibleCount, setVisibleCount] = useState(3);

    const showMoreTransactions = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    }

    const status = searchParams.get('status')


    const filteredTransactions = transactions.filter((transaction) => {
        return status ? transaction.status === status : true;
    });

    const buttonMore = () => {
        if (visibleCount < filteredTransactions.length) {
            return (
                <Button onClick={showMoreTransactions} className='self-center' variant="outline">
                    Tampilkan Lebih Banyak
                </Button>
            );
        }
    }

    const buttonStatus = () => {
        if (status === 'Pending') {
            return (
                <div className='flex items-end flex-wrap gap-5'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <Link href={'/transaksi/'}>Batalkan Pembayaran</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DetailTransaksi />
                    <Button >Lanjutkan Pembayaran</Button>
                </div>
            )
        } else if (status === 'Dikirim') {
            return (
                <div className='flex items-end flex-wrap gap-5'>
                    <OpsiTransaksi />
                    <DetailTransaksi />
                    <SelesaikanTransaksi />
                </div>
            )
        } else if (status === 'Refund') {
            return (
                <div className='flex items-end flex-wrap gap-5'>

                    <Button variant="outline">Detail Refund</Button>
                </div>
            )
        } else {
            return (
                <div className='flex items-end flex-wrap gap-5'>
                    <OpsiTransaksi />
                    <DetailTransaksi />
                </div>
            )
        }
    }

    return (
        <div className='flex flex-col gap-5'>
            <div className='space-y-5'>
                {filteredTransactions.length > 0 ? (
                    filteredTransactions
                        .slice()
                        .reverse()
                        .slice(0, visibleCount)
                        .map((transaction, index) => (
                            <div key={index} className='rounded space-y-5'>
                                <div className='flex justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                        <p className='font-semibold capitalize'> {transaction.user}</p>
                                    </div>
                                    <div className='flex flex-col items-end md:flex-row md:items-center gap-2'>
                                        <p className='text-xs md:text-sm font-medium'>INV/20231103/MPL/3544462305,</p>
                                        <p className='text-xs md:text-sm font-medium flex items-center'><ShoppingBag /> 20 Oktober 2024</p>
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
                                        {buttonStatus(transaction)}
                                    </div>
                                </div>
                                <Separator />
                            </div>
                        ))
                ) : (
                    <p>Tidak ada transaksi.</p>
                )}
            </div>
            {filteredTransactions.length > visibleCount && buttonMore()}
        </div>
    );
}
