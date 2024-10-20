
'use client'
import React, { useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Ellipsis, MapPin } from 'lucide-react'
import Image from 'next/image'
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '@/redux/slicer/productSlice'

function CardProduct() {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    if (status === status.LOADING) {
        return <p>Loading...</p>;
    }

    if (status === status.ERROR) {
        return <h2>Something went wrong!</h2>;
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5'>
            {products.slice(0, 4).map((products) => (
                <Link href={`/jualbeli/${products.id}/${products.title.replace(/\s+/g, '-')}`}>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='font-semibold'>{products.brand}</p>
                                <p className='text-sm'>2 Hari yang lalu</p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger><Ellipsis size={28} /></DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Laporkan Barang</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Image src={products.images[0]} alt='Foto Produk' className='w-full h-80 object-cover' width={300} height={300} />

                    <div className='space-y-2'>
                        <Badge variant="outline">Jarang Digunakan</Badge>
                        <p className='capitalize'>{products.title}</p>
                        <div className='flex justify-between'>
                            <p className='font-semibold'>Rp. 12.500.000</p>
                            <p className='flex items-center gap-1 text-md'><MapPin size={20} /><span>Yogyakarta</span></p>
                        </div>

                    </div>
                </Link >
            ))}


        </div >
    )
}

export default CardProduct
