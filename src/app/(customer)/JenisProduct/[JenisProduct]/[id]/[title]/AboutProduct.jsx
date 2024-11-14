import ImgCarouselDetailProduct from '@/components/ImgCarouselDetailProduct'
import RatingStar from '@/components/RatingStar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import moment from 'moment';
import 'moment/locale/id';  // Import locale for Bahasa Indonesia
import Link from 'next/link'
import { MapPin, MessageSquarePlus, ReceiptText, ShieldQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AboutProduct({ detailProducts }) {
    moment.locale('id');

    // Calculate the discount price and final price
    const discountPrice = (detailProducts.price * detailProducts.discount) / 100;
    const finalPrice = detailProducts.price - discountPrice;

    // Extract seller's city from the address
    const alamatLengkap = detailProducts.penjual.AuthPenjual.alamat;
    const alamatKota = alamatLengkap.split(' ')[0];

    // Extract subcategory name
    const subCategory = detailProducts.SubCategoryProduct.name;

    return (
        <div className='col-span-2 space-y-5'>
            {/* Product Image Carousel and Details */}
            <div className='space-y-5'>
                <ImgCarouselDetailProduct detailProducts={detailProducts} />
                <div className='space-y-2'>
                    <p className='text-base lg:text-lg capitalize'>{detailProducts.name}</p>
                    {detailProducts.discount ? (
                        <>
                            <p className='text-base text-destructive line-through'>Rp {(detailProducts.price).toLocaleString('id-ID')}</p>
                            <p className='text-xl 2xl:text-2xl font-semibold'>Rp {finalPrice.toLocaleString('id-ID')}</p>
                        </>
                    ) : (
                        <p>Rp <span className='text-xl 2xl:text-2xl font-semibold truncate'>{(detailProducts.price).toLocaleString('id-ID')}</span></p>
                    )}
                </div>

                {/* Product Condition, Warranty, and Location */}
                <div className='flex flex-col gap-3 md:hidden'>
                    <div className='flex items-center gap-5'>
                        <ReceiptText />
                        <p>{detailProducts.condition}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <ShieldQuestion />
                        <p>{detailProducts.garansi ? 'Garansi ON' : 'Garansi OFF'}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <MapPin />
                        <p>Kota {alamatKota}</p>
                    </div>
                </div>

                {/* Product Description */}
                <div>
                    <p className='font-semibold text-lg'>Tentang Produk</p>
                    <p className="whitespace-pre-line text-sm lg:text-base">{detailProducts.description}</p>
                </div>
            </div>

            <Separator />

            {/* Seller Information */}
            <h1 className='text-lg lg:text-xl font-semibold'>Kenali Pemilik Barang</h1>
            <div className='flex justify-between'>
                <Link href={`/p/${detailProducts.penjual.username}`} className='flex items-center gap-3'>
                    <Avatar className='h-14 w-14'>
                        <AvatarImage src={detailProducts.penjual.profile_picture.url} />
                        <AvatarFallback>{detailProducts.penjual.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className='text-lg font-medium'>@{detailProducts.penjual.username}</p>
                    </div>
                </Link>
                <Button variant="" asChild>
                    <Link href='/chat' className='flex items-center gap-1 md:hidden'>
                        <MessageSquarePlus /> Chat
                    </Link>
                </Button>
            </div>

            <Separator />

            {/* Product Reviews */}
            <h1 className='text-lg lg:text-xl font-semibold'>Ulasan Produk @{detailProducts.penjual.username}</h1>
            <div className='grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3'>
                {detailProducts.UlasanProducts.length > 0 ? (
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

                                    {/* Image Modal for Review */}
                                    <Dialog>
                                        <DialogTrigger>
                                            <Image
                                                src={"https://github.com/shadcn.png"}
                                                alt="Image"
                                                className="rounded-md object-cover"
                                                width={150}
                                                height={150}
                                                priority={false}
                                            />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <Image
                                                src={"https://github.com/shadcn.png"}
                                                alt="Image"
                                                className="rounded-md object-cover w-full"
                                                width={150}
                                                height={150}
                                                priority={false}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className='text-sm text-destructive'>Tidak ada ulasan</p>
                )}
            </div>
        </div>
    );
}
