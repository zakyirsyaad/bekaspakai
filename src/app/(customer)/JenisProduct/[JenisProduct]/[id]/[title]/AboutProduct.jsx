import ImgCarouselDetailProduct from '@/components/ImgCarouselDetailProduct'
import RatingStar from '@/components/RatingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React, { Suspense } from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import moment from 'moment';
import 'moment/locale/id';  // Import locale untuk bahasa Indonesia
import Link from 'next/link'
import { SkeletonDetailProduct } from '@/components/Skeleton/SkeletonDetailProduct'

export default function AboutProduct({ detailProducts }) {
    moment.locale('id');
    let discountPrice = (detailProducts.price * detailProducts.discount) / 100
    let finalPrice = detailProducts.price - discountPrice
    return (
        <div className='col-span-2 space-y-5 '>
            <Suspense fallback={<SkeletonDetailProduct />}>
                <div className='space-y-5'>
                    <ImgCarouselDetailProduct detailProducts={detailProducts} />
                    <div className='space-y-2'>
                        <p className='text-lg 2xl:text-2xl capitalize'>{detailProducts.name}</p>
                        {
                            detailProducts.discount !== null && detailProducts.discount !== 0 ? (
                                <>
                                    <p className='text-base text-destructive line-through'>Rp {(detailProducts.price).toLocaleString('id-ID')}</p>
                                    <p className='text-xl 2xl:text-2xl font-semibold'>Rp {finalPrice.toLocaleString('id-ID')}</p>
                                </>
                            ) : (
                                <p>Rp <span className='text-xl 2xl:text-2xl font-semibold truncate'>{(detailProducts.price).toLocaleString('id-ID')}</span></p>
                            )
                        }
                    </div>
                    <p className='font-bold text-xl'>Deskripsi Produk</p>
                    <p className="whitespace-pre-line">{detailProducts.description}</p>
                </div>
                <Separator />
                <h1 className='text-lg lg:text-xl font-semibold'>Kenali Pemilik Barang</h1>
                <Link href={`/p/${detailProducts.penjual.username}`} className='flex items-center gap-5 w-fit border rounded-lg py-1 px-2 shadow-lg'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={detailProducts.penjual.profile_picture.url} />
                        <AvatarFallback>{detailProducts.penjual.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-lg font-medium'>@{detailProducts.penjual.username}</p>
                        {/* <p className='text-base'>{detailProducts.penjual.name}</p> */}
                        <p className='text-xs opacity-50'>bergabung 2 hari yang lalu</p>
                    </div>
                </Link>
                <h1 className='text-lg lg:text-xl font-semibold'>Ulasan Produk @{detailProducts.penjual.username}</h1>
                <div className='grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3'>
                    {detailProducts.UlasanProducts.length > 0 ?
                        detailProducts.UlasanProducts.map((rating, index) => (
                            <div className='flex items-center gap-5' key={index}>
                                <div className='flex gap-2'>
                                    <Avatar className='h-14 w-14'>
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className='space-y-1'>
                                        <div>
                                            <p className='text-xs'>{moment(rating.createdAt).fromNow()}</p>
                                            <p className='text-md font-medium'>{rating.User.username}</p>
                                        </div>
                                        <RatingStar rating={rating.rating} />
                                        <p>{rating.comment}</p>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Image src={"https://github.com/shadcn.png"} alt="Image" className="rounded-md object-cover " width={150} height={150} priority={false} />
                                            </DialogTrigger>
                                            <DialogContent>
                                                <Image src={"https://github.com/shadcn.png"} alt="Image" className="rounded-md object-cover w-full" width={150} height={150} priority={false} />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                        ))
                        : <p>Tidak ada ulasan</p>
                    }
                </div>
            </Suspense>
        </div >

    )
}
