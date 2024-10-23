'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'


function AdsContent() {
    const imgAds1 = '/ads-carousel-1.svg'
    const imgAds2 = '/ads-carousel-2.svg'
    return (
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]} >
            <CarouselContent>
                <CarouselItem className="">
                    <Image src={imgAds1} alt="Image" className="object-cover w-full" width={300} height={300} />
                </CarouselItem>
                <CarouselItem>
                    <Image src={imgAds2} alt="Image" className="object-cover w-full" width={300} height={300} />
                </CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}

export default AdsContent
