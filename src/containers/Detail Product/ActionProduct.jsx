import RatingStar from '@/components/RatingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageSquarePlus, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function ActionProduct({ detailProducts, negotiable }) {
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
            {
                negotiable ?
                    <div className='flex items-center gap-5'>
                        <Input type="text" name="nego" placeholder="Harga yang diinginkan" className="w-full" />
                        <Button>Nego</Button>
                    </div>
                    :
                    <div className='space-y-2'>
                        <div className='flex items-center gap-5'>
                            <Input disabled type="text" name="nego" placeholder="Harga yang diinginkan" className="w-full" />
                            <Button disabled>Nego</Button>
                        </div>
                        <p className='text-destructive text-sm'>Tidak dapat di Nego</p>
                    </div>
            }

        </>
    )
}
