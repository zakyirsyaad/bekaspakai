'use client'
import React, { useEffect, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"

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

    })
    return (
        <>
            <Carousel
                setApi={setApi}
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}>
                <CarouselContent>
                    <CarouselItem>
                        <Image src={detailProducts.images[0]} alt={detailProducts.title} className='rounded w-full lg:h-[500px] object-cover' width={300} height={300} priority={true} />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={detailProducts.images[0]} alt={detailProducts.title} className='rounded w-full lg:h-[500px] object-cover' width={300} height={300} priority={true} />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
            <p className='text-center'>Foto ke {current} dari {count}</p>
        </>

    )
}

export default ImgCarouselDetailProduct
