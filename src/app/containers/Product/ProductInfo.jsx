'use client'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from '@/components/ui/badge'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'
import { Loader2, MessageSquareShare, ShoppingBag } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import ProductEdit from './ProductEdit'
import TambahKeranjang from './TambahKeranjang'

export default function ProductInfo({ product, idUserLogin, accessToken }) {
    const userIsOwner = idUserLogin === product.penjual.id

    const [response, setResponse] = React.useState(null);
    const [priceOffer, setPriceOffer] = React.useState(0)
    const [status, setStatus] = React.useState('idle');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('loading');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/offeredProduct/${product.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({ priceOffer: priceOffer }),
            });

            const result = await res.json();
            setStatus('success');
            setResponse(result);
        } catch (error) {
            setStatus('error');
            console.error(error);
            setResponse({ error: error.message });
        }
    };

    return (
        <div className='col-span-1 xl:col-span-2 space-y-5 lg:space-y-3 2xl:space-y-5'>
            <Breadcrumb>
                <BreadcrumbList className="text-xs">
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{product.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <h1 className='text-xl 2xl:text-2xl font-semibold'>{product.name}</h1>
            <div className='flex gap-2'>
                {product.discount && <span className='text-sm font-semibold line-through text-gray-500 self-end'>Rp {product.price.toLocaleString('id-ID')}</span>}
                <h2 className='text-xl 2xl:text-3xl font-bold'>Rp {product.price.toLocaleString('id-ID')}</h2>
                {product.discount && <Badge className='text-xs self-start'>HEMAT {product.discount} %</Badge>}
            </div>
            {userIsOwner ?
                <ProductEdit detailProducts={product} accessToken={accessToken} />
                :
                <div className='space-x-5'>
                    <Button asChild>
                        <Link
                            href={{ pathname: '/pembayaran', query: { id: product.id } }}
                        >
                            <ShoppingBag /> Beli Sekarang
                        </Link>
                    </Button>
                    <TambahKeranjang detailProducts={product} accessToken={accessToken} />
                </div>
            }
            <h3 className='font-semibold'>Deskripsi</h3>
            <p className='whitespace-pre-line text-sm 2xl:text-base'>{product.description}</p>
            <div className='flex gap-5 xl:gap-10'>
                <ul>
                    <li className='font-semibold'>Garansi</li>
                    <li className='text-sm'>{product.garansi ? "ON" : "OFF"}</li>
                </ul>
                <ul>
                    <li className='font-semibold'>Kondisi</li>
                    <li className='text-sm'>{product.condition}</li>
                </ul>
                <ul>
                    <li className='font-semibold'>Lokasi</li>
                    <li className='text-sm'>{product.penjual.AuthPenjual.alamat.split(' ')[0]}</li>
                </ul>
            </div>

            {product.price === 0 || product.penjual.id === idUserLogin ? null :
                <div>
                    <div className='flex items-center gap-2'>
                        <h4 className='font-semibold'>Nego Harga</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex items-center gap-2'>
                            <div className='relative flex items-center'>
                                <Input type="number"
                                    className="pl-10"
                                    onChange={(e) => setPriceOffer(e.target.value)}
                                    disabled={product.minimumPrice === 0 || product.minimumPrice === null || !accessToken}
                                />
                                <p className='absolute left-3'>Rp</p>
                            </div>
                            <Button
                                type="submit"
                                disabled={status === 'loading' || product.minimumPrice === 0 || product.minimumPrice === null || !accessToken}
                            >
                                {status === 'loading' ? <Loader2 className='animate-spin' /> : 'Nego'}
                            </Button>
                        </div>
                        {product.minimumPrice > 0 &&
                            <p className='w-fit  text-sm mt-2'>
                                Harga Nego Minimal Rp {product.minimumPrice}
                            </p>
                        }
                        {status === 'error' && <p className='w-fit px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm mt-2'>Nego Gagal</p>}
                        {response && <p className='w-fit px-3 py-1 rounded bg-secondary text-secondary-foreground text-sm mt-2'>{response.message}</p>}
                        {response?.status === 200 && <p className='w-fit px-3 py-1 rounded bg-destructive text-destructive-foreground text-sm mt-2'>
                            <p>Setelah anda menekan tombol Nego, <br />
                                anda harus menunggu penjual menyetujui atau menolak nego.
                                <br />
                                Hasil nego akan muncul di Email anda.
                            </p></p>}
                        {product.minimumPrice === 0 || product.minimumPrice === null ?
                            <p className='w-fit rounded text-destructive italic text-sm mt-2'>
                                Barang tidak dapat di nego
                            </p>
                            : null
                        }
                    </form>
                </div>
            }
            <Separator />
            <div className='flex gap-5'>
                <Link href={`/p/${product.penjual.username}`}>
                    <div className='flex items-center gap-3'>
                        <Avatar className='w-14 h-14'>
                            <AvatarImage src={product.penjual.profile_picture.url} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='font-bold'>{product.penjual.username}</p>
                    </div>
                </Link>
                <Link href={`/chat/${product.penjual.id}`}>
                    <MessageSquareShare />
                </Link>
            </div>
            <Separator />
        </div>
    )
}
