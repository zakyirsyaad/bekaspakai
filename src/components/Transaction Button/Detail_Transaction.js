import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import Image from 'next/image'
import StatusTransaction from './Status_Transaction'


function Detail_Transaction() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Detail Transaksi</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <StatusTransaction />
                    </DialogTitle>
                </DialogHeader>
                <div>
                    <p>No. Invoice</p>
                    <p className='font-semibold'>INV/14102024/BP/12345678</p>
                </div>

                <div>
                    <p>Tanggal Pembelian</p>
                    <p className='font-semibold'>14 Oktober 2024, 15.00 WIB</p>
                </div>

                <div className='grid grid-cols-2'>
                    <div>
                        <p>Ekspedisi</p>
                        <p className='font-semibold'>SiCepat - Reguler</p>
                    </div>
                    <div>
                        <p>No. Resi</p>
                        <p className='font-semibold'>TLJR3DY1WRMJ8LWP</p>
                    </div>
                </div>

                <div>
                    <p>Alamat</p>
                    <p className='font-semibold'>6281241933754 Dingo Coffee, Umbulmartani, Kec. Ngemplak, Kabupaten Sleman, Jogja </p>
                </div>

                <div>
                    <p>Catatan</p>
                    <p className='font-semibold'>Kosan di dalam cafe</p>
                </div>

                <div>
                    <p>Produk</p>
                    <div className='flex gap-5'>
                        <Image src={'https://github.com/shadcn.png'} alt='' className='rounded' width={100} height={100} />
                        <div className=' flex flex-col justify-evenly'>
                            <p className='opacity-50'>Nama Produk</p>
                            <p className='font-semibold'>Rp 1.000.000</p>
                        </div>
                    </div>
                </div>

                <Separator />
                <p>Rincian Pembayaran</p>

                <div className='space-y-'>
                    <div className='flex justify-between'>
                        <p>Metode Pembayaran</p>
                        <p className='font-semibold'>BCA Virtual Account</p>
                    </div>

                    <div className='flex justify-between'>
                        <p>Total Barang</p>
                        <p className='font-semibold'>Rp 1.000.000</p>
                    </div>

                    <div className='flex justify-between'>
                        <p>Biaya Pengiriman</p>
                        <p className='font-semibold'>Rp 25.000</p>
                    </div>

                    <div className='flex justify-between'>
                        <p>Biaya Admin</p>
                        <p className='font-semibold'>Rp 5.000</p>
                    </div>
                    <div className='flex justify-between'>
                        <p className='font-semibold'>Total Pembayaran</p>
                        <p className='font-bold'>Rp 1.030.000</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default Detail_Transaction
