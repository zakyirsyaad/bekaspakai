'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import DecodeToken from '@/hooks/decode-token'
import { useToast } from '@/hooks/use-toast'
import { MessageSquarePlus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import EditProduk from './EditProduk'
import { cn } from '@/lib/utils'

export default function ActionProduct({ detailProducts, negotiable, accessToken }) {
    const [negoPrice, setNegoPrice] = React.useState('')
    const [hasNegotiated, setHasNegotiated] = React.useState(false)
    const { toast } = useToast()

    const negoAlert = () => {
        toast({
            title: "Berhasil Nego",
            description: `Harga penawaran : Rp ${negoPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}. Hasil penawaran akan dikirimkan melalui email anda jika terdapat konfirmasi dari pemilik.`,
            className: "bg-green-500 text-white",
        })
        setHasNegotiated(true)
    }

    const buttonNegotiable = () => {
        if (negotiable) {
            return (
                <>
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
                                disabled={hasNegotiated || !accessToken}
                            />
                        </div>
                        <Button onClick={negoAlert} disabled={hasNegotiated || !accessToken}>Nego</Button>
                    </div>
                    {hasNegotiated && <p className='text-xs text-destructive'>Anda sudah melakukan Penawaran harga :p</p>}
                </>

            )

        } else {
            return (
                <>
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
                                disabled
                            />
                        </div>
                        <Button onClick={negoAlert} disabled>Nego</Button>
                    </div>
                    <p className='text-destructive text-sm'>Tidak dapat di Nego</p>
                </>
            )
        }
    }

    const isUserLoggedin = DecodeToken(accessToken);

    async function addToKeranjang() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang/${detailProducts.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({})
            });

            const data = await response.json();
            if (response.ok) {
                toast({ title: data.message, className: 'bg-green-500 text-white' });
            } else {
                toast({ title: data.message, className: 'bg-destructive text-white' });
            }
        } catch (error) {
            alert('Terjadi kesalahan:', error);
        }
    }

    return (
        <>
            <div className='flex lg:flex-col 2xl:flex-row justify-between gap-5'>
                <div className='flex items-center gap-2'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={detailProducts.penjual.profile_picture.url} />
                        <AvatarFallback>{detailProducts.penjual.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-lg font-medium'>@{detailProducts.penjual.username}</p>
                        <div className='flex gap-1 items-center'>
                            <p className='text-sm'>({detailProducts.UlasanProducts.length} Ulasan)</p>
                        </div>
                    </div>
                </div>
                <Link href={'/chat'} className='flex items-center gap-1'><MessageSquarePlus /> Chat </Link>
            </div>
            {isUserLoggedin?.id === detailProducts.penjual.id ?
                <EditProduk detailProducts={detailProducts} accessToken={accessToken} />
                : <>
                    {detailProducts.JenisProduct.name === 'Jual Beli' ?
                        <>
                            <div className='flex items-center gap-5'>
                                <Link
                                    href={{ pathname: '/pembayaran', query: { id: detailProducts.id, } }}
                                    prefetch={false}
                                    className={cn(
                                        buttonVariants({ variant: '' }),
                                        !detailProducts.isAvailable && 'pointer-events-none opacity-50',
                                    )}
                                >
                                    Beli Sekarang
                                </Link>
                                <Button onClick={addToKeranjang} disabled={!accessToken} variant="outline" className=''>+ Keranjang</Button>
                            </div>
                            {buttonNegotiable()}
                        </>
                        : <Button disabled={!accessToken}>Ajukan Penerima Donasi</Button>
                    }
                </>}
        </>
    )
}