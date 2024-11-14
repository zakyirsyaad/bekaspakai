'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

function ImgCarouselDetailProduct({ detailProducts }) {
    const [api, setApi] = useState()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });

    }, [api])
    return (
        <section>
            <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 2000,

                    }),
                ]}>
                <CarouselContent>
                    {detailProducts.picture.reverse().map((img) => (
                        <CarouselItem key={img.key}>
                            <Dialog>
                                <DialogTrigger className='w-full'>
                                    <Image src={img.url} alt='Foto Detail produk bekaspakai.com' className='rounded w-full lg:h-[500px] object-cover' width={300} height={300} priority={true} />
                                </DialogTrigger>
                                <DialogContent>
                                    <Image src={img.url} alt='Foto Detail produk bekaspakai.com' className='rounded w-full lg:h-[500px] object-cover' width={300} height={300} priority={true} />
                                </DialogContent>
                            </Dialog>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <p className='text-center text-sm'>Foto ke {current} dari {count}</p>
        </section>

    )
}

export default ImgCarouselDetailProduct
