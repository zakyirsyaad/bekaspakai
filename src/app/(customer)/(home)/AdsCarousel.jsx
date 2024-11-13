'use client'
import React, { Suspense } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import { Skeleton } from '@/components/ui/skeleton'


function AdsCarousel() {
    const imgAds1 = '/ads-carousel-1.svg'
    const imgAds2 = '/ads-carousel-2.svg'

    function imageLoader() {
        return <Skeleton className="h-[125px] w-[250px] rounded-xl" />
    }
    return (
        <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]} >
            <CarouselContent>
                <Suspense fallback={<Skeleton className="h-[125px] w-[250px] rounded-xl" />}>
                    <CarouselItem className="">
                        <Image src={imgAds1} alt="Image" className="object-cover w-full" width={300} height={300} loader={imageLoader} priority={true}
                        />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={imgAds2} alt="Image" className="object-cover w-full" width={300} height={300} />
                    </CarouselItem>
                </Suspense>
            </CarouselContent>
        </Carousel>
    )
}

export default AdsCarousel
