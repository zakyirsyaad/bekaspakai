'use client'
import React, { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '@/redux/slicer/orderSlice'
import { Skeleton } from '@/components/ui/skeleton'

function CartProduct({ dataKeranjang, accessToken }) {
    const { toast } = useToast()
    const router = useRouter()
    async function handleDeleteAll(penjualId) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang/all/${penjualId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                cache: 'no-store'
            })
            if (response.ok) {
                router.refresh()
                toast({
                    title: 'Semua produk dari penjual dihapus dari keranjang.',
                })
            } else {
                toast({
                    title: 'Gagal menghapus semua produk dari penjual.',
                    description: 'Silahkan coba lagi.',
                })
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
                cache: 'no-store'
            })
            if (response.ok) {
                router.refresh()
                toast({
                    title: 'Produk dihapus dari keranjang.',
                })
            } else {
                toast.error('Gagal menghapus produk dari keranjang.')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    const dispatch = useDispatch()
    const order = useSelector((state) => state.order);
    const [currentSellerId, setCurrentSellerId] = React.useState(null);

    function addToOrder(productId, penjualId) {
        dispatch(add(productId));
    }

    function removeFromOrder(productId, penjualId) {
        dispatch(remove(productId));
        // Clear the current seller ID if the last product from that seller is removed
        if (order.filter(id => dataKeranjang.some(item => item.products.some(prod => prod.productId === id && item.penjualId === penjualId))).length === 1) {
            setCurrentSellerId(null); // Clear the seller ID
        }
    }

    return (
        <div className='col-span-2 space-y-2 lg:space-y-10'>
            <Suspense fallback={<Skeleton className="w-full h-[50px] rounded" />}>
                {dataKeranjang.map((item) => (
                    <div key={item.penjualId} className='col-span-1 flex flex-col gap-5 border rounded p-5'>
                        <div className='flex items-center gap-5'>
                            <div className='flex items-center gap-2'>
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p className='font-medium'>{item.penjualName}</p>
                            </div>
                            <Button
                                variant="destructive"
                                className="text-white text-xs"
                                onClick={() => handleDeleteAll(item.penjualId)}
                            >
                                Hapus Semua
                            </Button>
                        </div>
                        {item.products.map((product) => (
                            <div key={product.productId} className='flex flex-col gap-5'>
                                <div className='flex gap-5'>
                                    {product.isAvailable ? (
                                        <>
                                            <Checkbox
                                                checked={order.includes(product.productId)}
                                                onCheckedChange={(checked) => {
                                                    if (checked) {
                                                        if (currentSellerId === null) {
                                                            setCurrentSellerId(item.penjualId);
                                                        } else if (currentSellerId !== item.penjualId) {
                                                            toast({
                                                                title: 'Pilih produk dari penjual yang sama',
                                                                description: 'Anda hanya dapat memilih produk dari penjual yang sama.',
                                                                variant: 'destructive',
                                                            });
                                                            return;
                                                        }
                                                        addToOrder(product.productId, item.penjualId);
                                                    } else {
                                                        removeFromOrder(product.productId, item.penjualId);
                                                    }
                                                }}
                                            />
                                            <div className='flex gap-2'>
                                                <Image
                                                    src={product.picture[0].url}
                                                    alt='Foto Keranjang'
                                                    className='rounded w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 object-cover'
                                                    width={100}
                                                    height={100}
                                                />
                                                <div className='flex gap-3 md:flex-col justify-between items-start'>
                                                    <div>
                                                        <p className='text-sm font-medium text-slate-500 truncate w-40 md:w-full'>
                                                            {product.name}
                                                        </p>
                                                        <p className='font-semibold'>Rp {product.price.toLocaleString('id-ID')}</p>
                                                    </div>
                                                    <Button
                                                        variant="destructive"
                                                        className="p-3"
                                                        onClick={() => handleDeleteProduct(product.productId)}
                                                    >
                                                        <Trash2 color='white' />
                                                    </Button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='flex gap-2'>
                                            <Image
                                                src={product.picture[0].url}
                                                alt='Foto Keranjang'
                                                className='rounded w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 object-cover opacity-50'
                                                width={100}
                                                height={100}
                                            />
                                            <div className='flex flex-col justify-between items-start'>
                                                <div>
                                                    <p className='text-sm font-medium text-slate-500 truncate w-40 md:w-full opacity-50'>
                                                        {product.name} (Sold Out)
                                                    </p>
                                                    <p className='font-semibold opacity-50'>Rp {product.price.toLocaleString('id-ID')}</p>
                                                    <Button
                                                        variant="destructive"
                                                        className="p-3"
                                                        onClick={() => handleDeleteProduct(product.productId)}
                                                    >
                                                        <Trash2 color='white' />
                                                    </Button>
                                                </div>
                                                {/* Display a message or remove button as needed */}
                                                <p className='text-red-500 opacity-50'>Produk sudah terjual</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {item.products.length > 1 && <Separator />}
                            </div>
                        ))}
                    </div>
                ))}
            </Suspense>
        </div>
    )
}

export default CartProduct
