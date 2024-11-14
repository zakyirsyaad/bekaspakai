'use client'
import React, { useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from '@/hooks/use-toast'
import { Input } from './ui/input'
import DecodeToken from '@/hooks/decode-token'
import { cn } from '@/lib/utils'


function MobilNavDetailProduct({ detailProducts, negotiable, accessToken }) {
    const [negoPrice, setNegoPrice] = useState('')
    const [hasNegotiated, setHasNegotiated] = useState(false)
    const { toast } = useToast()

    const isUserLoggedin = DecodeToken(accessToken);

    const handleNegoAlert = () => {
        toast({
            title: "Berhasil Nego",
            description: `Harga penawaran : Rp ${negoPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}. Hasil penawaran akan dikirimkan melalui email jika ada konfirmasi.`,
            className: "bg-green-600 text-white w-fit",
        })
        setHasNegotiated(true)
    }

    const renderNegotiationButton = () => {
        if (!negotiable) {
            return <p className='text-destructive text-sm'>Tidak dapat di Nego</p>
        }

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Nego</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Ajukan Penawaran Harga</DialogTitle>
                        <DialogDescription>
                            Harga yang anda tawarkan belum tentu diterima oleh pemilik barang.
                        </DialogDescription>
                        <div className='flex items-center gap-2'>
                            <div className="relative w-full">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">Rp</span>
                                <Input
                                    type="text"
                                    name="nego"
                                    placeholder="Harga yang diinginkan"
                                    className="pl-10"
                                    value={negoPrice}
                                    onChange={(e) => setNegoPrice(e.target.value)}
                                    disabled={hasNegotiated}
                                />
                            </div>
                            <Button onClick={handleNegoAlert} disabled={hasNegotiated}>Nego</Button>
                        </div>
                    </DialogHeader>
                    {hasNegotiated && <p className='text-xs text-destructive'>Anda sudah melakukan Penawaran harga</p>}
                </DialogContent>
            </Dialog>
        )
    }

    const addToKeranjang = async () => {
        if (!accessToken) return toast({ title: 'Please login first', className: 'bg-destructive text-white' })

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang/${detailProducts.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({})
            })
            const data = await response.json()

            toast({ title: data.message, className: response.ok ? 'bg-green-500 text-white' : 'bg-destructive text-white' })
        } catch (error) {
            toast({ title: 'Terjadi kesalahan', className: 'bg-destructive text-white' })
        }
    }

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 md:hidden">
            {isUserLoggedin?.id === detailProducts.penjual.id ? (
                <EditProduk detailProducts={detailProducts} accessToken={accessToken} />
            ) : (
                <div>
                    {detailProducts.JenisProduct.name === 'Jual Beli' ? (
                        <div className='flex bg-background border-t gap-5 p-2'>
                            {negotiable ?
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="outline">Nego</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Ajukan Penawaran Harga</DialogTitle>
                                            <DialogDescription>
                                                Harga yang anda tawarkan belum tentu diterima oleh pemilik barang.
                                            </DialogDescription>
                                            <div className='flex items-center gap-2'>
                                                <div className="relative w-full">
                                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">Rp</span>
                                                    <Input
                                                        type="text"
                                                        name="nego"
                                                        placeholder="Harga yang diinginkan"
                                                        className="pl-10"
                                                        value={negoPrice}
                                                        onChange={(e) => setNegoPrice(e.target.value)}
                                                        disabled={hasNegotiated}
                                                    />
                                                </div>
                                                <Button onClick={handleNegoAlert} disabled={hasNegotiated}>Nego</Button>
                                            </div>
                                        </DialogHeader>
                                        {hasNegotiated && <p className='text-xs text-destructive'>Anda sudah melakukan Penawaran harga</p>}
                                    </DialogContent>
                                </Dialog>
                                :
                                <Button variant="outline" disabled>nego</Button>
                            }
                            <Button variant="outline" onClick={addToKeranjang} disabled={!accessToken}>+ Keranjang</Button>
                            <div className='flex items-center gap-5'>
                                <Link
                                    href={{ pathname: '/pembayaran', query: { id: detailProducts.id } }}
                                    prefetch={false}
                                    className={cn(
                                        buttonVariants({ variant: '' }),
                                        !detailProducts.isAvailable && 'pointer-events-none opacity-50'
                                    )}
                                >
                                    Beli Sekarang
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <Button disabled={!accessToken}>Ajukan Penerima Donasi</Button>
                    )}
                </div>
            )}
        </div>
    )
}

export default MobilNavDetailProduct
