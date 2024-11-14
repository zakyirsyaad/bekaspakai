'use client'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'


function AdsCarousel() {
    const imgAds1 = '/ads-carousel-1.svg'
    const imgAds2 = '/ads-carousel-2.svg'
    return (
        <section>
            <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]} >
                <CarouselContent>
                    <CarouselItem>
                        <Image src={imgAds1} alt="Foto Ads bekaspakai.com" className="object-cover w-full" width={300} height={300} priority={true}
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={imgAds2} alt="Foto Ads bekaspakai.com" className="object-cover w-full" width={300} height={300} priority={true} />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>
        </section>
    )
}

export default AdsCarousel
