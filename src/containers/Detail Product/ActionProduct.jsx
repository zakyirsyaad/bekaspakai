'use client'
import RatingStar from '@/components/RatingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { MessageSquarePlus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ActionProduct({ detailProducts, negotiable }) {
    const [negoPrice, setNegoPrice] = React.useState('')
    const [hasNegotiated, setHasNegotiated] = React.useState(false)
    const { toast } = useToast()

    const negoAlert = () => {
        toast({
            title: "Berhasil Nego",
            description: `Harga penawaran : Rp ${negoPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}. Hasil penawaran akan dikirimkan melalui email anda jika terdapat konfirmasi dari pemilik.`,
            className: "bg-green-600 text-white",
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
                                disabled={hasNegotiated}
                            />
                        </div>
                        <Button onClick={negoAlert} disabled={hasNegotiated}>Nego</Button>
                    </div>
                    {hasNegotiated && <p className='text-xs text-destructive'>Anda sudah melakukan Penawaran harga :p</p>}
                </>

            )

        } else {
            return <p className='text-destructive text-sm'>Tidak dapat di Nego</p>
        }
    }
    return (
        <>
            <div className='flex lg:flex-col 2xl:flex-row justify-between gap-5'>
                <div className='flex items-center gap-2'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-lg font-medium'>@shadcn</p>
                        <div className='flex gap-1 items-center'>
                            <RatingStar />
                            <p>({detailProducts.reviews.length} Ulasan)</p>
                        </div>
                    </div>
                </div>
                <Link href={'/chat'} className='flex items-center gap-1'><MessageSquarePlus /> Chat </Link>
            </div>
            <div className='flex items-center gap-5'>
                <Button>Beli Sekarang</Button>
                <Link href={'/keranjang'} className='flex items-center font-bold'>+<ShoppingCart /></Link>
            </div>
            {buttonNegotiable()}
        </>
    )
}
