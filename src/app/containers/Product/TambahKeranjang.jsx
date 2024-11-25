'use client'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export default function TambahKeranjang({ detailProducts, accessToken }) {
    const { toast } = useToast()
    const addToKeranjang = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang/${detailProducts.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({}),
            })

            const data = await response.json()

            if (response.ok) {
                toast({ title: data.message, className: 'bg-green-500 text-white' })
            } else {
                toast({ title: data.message, className: 'bg-destructive text-white' })
            }
        } catch (error) {
            toast({ title: 'Terjadi kesalahan', description: error.message, className: 'bg-destructive text-white' })
        }
    }
    return (
        <Button
            variant="ghost"
            onClick={addToKeranjang}
            disabled={!accessToken}
        >
            <ShoppingCart />
            Masukkan Keranjang
        </Button>
    )
}
