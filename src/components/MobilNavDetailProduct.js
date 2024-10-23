'use client'
import React from 'react'
import { Button } from './ui/button'
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


function MobilNavDetailProduct({ negotiable }) {
    const [negoPrice, setNegoPrice] = React.useState('')
    const [hasNegotiated, setHasNegotiated] = React.useState(false)
    const { toast } = useToast()

    const negoAlert = () => {
        toast({
            title: "Berhasil Nego",
            description: `Harga penawaran : Rp ${negoPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}. Hasil penawaran akan dikirimkan melalui email anda jika terdapat konfirmasi dari pemilik.`,
            className: "bg-green-600 text-white w-fit",
        })
        setHasNegotiated(true)
    }
    const buttonNegotiable = () => {
        if (negotiable) {
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">Nego</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Ajukan Penawaran Harga</DialogTitle>
                            <DialogDescription>
                                Harga yang anda tawrkan belum tentu diterima oleh pemilik barang.
                            </DialogDescription>
                            <div className='flex items-center gap-2'>
                                <div className="relative w-full">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">Rp</span>
                                    <Input
                                        type="text"
                                        name="nego"
                                        placeholder="Harga yang diinginkan"
                                        className="pl-10"  // Adjust padding for the prefix "Rp"
                                        value={negoPrice}
                                        onChange={(e) => setNegoPrice(e.target.value)}
                                        disabled={hasNegotiated}
                                    />
                                </div>
                                <Button onClick={negoAlert} disabled={hasNegotiated}>Nego</Button>
                            </div>
                        </DialogHeader>
                        {hasNegotiated && <p className='text-xs text-destructive'>Anda sudah melakukan Penawaran harga :p</p>}
                    </DialogContent>
                </Dialog>
            )

        } else {
            return <p className='text-destructive text-sm'>Tidak dapat di Nego</p>
        }
    }
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 flex items-center justify-center gap-5 py-4 z-50 md:hidden">
            <div className='flex items-center gap-5'>
                <Button>Beli Sekarang</Button>
                <Link href={'/keranjang'} className='flex items-center font-bold'>+<ShoppingCart /></Link>
            </div>
            {buttonNegotiable()}
        </div>
    )
}

export default MobilNavDetailProduct
