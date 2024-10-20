import ImgCarouselDetailProduct from '@/components/ImgCarouselDetailProduct'
import RatingStar from '@/components/RatingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import moment from 'moment';
import 'moment/locale/id';  // Import locale untuk bahasa Indonesia

export default function AboutProduct({ detailProducts, titleParams }) {
    moment.locale('id');
    return (
        <div className='col-span-2 space-y-5 '>
            <div className='space-y-5'>
                <ImgCarouselDetailProduct detailProducts={detailProducts} />
                <div>
                    <p className='text-lg'>{titleParams}</p>
                    <p className='text-lg font-semibold'>Rp {detailProducts.price}</p>
                </div>
                <p className='font-bold text-xl'>Deskripsi Produk</p>
                <p>{detailProducts.description}</p>
            </div>
            <Separator />
            <h1 className='text-lg lg:text-xl font-semibold'>Kenali Pemilik Barang</h1>
            <div className='flex items-center gap-2'>
                <Avatar className='h-16 w-16'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <p className='text-lg font-medium'>@shadcn</p>
                    <p className='text-sm'>Alvaro Zane</p>
                    <p className='text-sm'>bergabung 2 hari yang lalu</p>
                </div>
            </div>
            <h1 className='text-lg lg:text-xl font-semibold'>Ulasan Produk Pemilik</h1>
            <div className='flex flex-col md:flex-row flex-wrap gap-5'>
                {detailProducts.reviews.map((rating) => (
                    <div className='flex items-center gap-5'>
                        <div className='flex gap-2'>
                            <Avatar className='h-14 w-14'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className='text-xs'>{moment(rating.date).fromNow()}</p>
                                <p className='text-md font-medium'>{rating.reviewerName}</p>
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
                ))}
            </div>
        </div>

    )
}
