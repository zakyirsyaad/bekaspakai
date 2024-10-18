import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'

export default function AdsCarousel() {
    const imgAds = "https://firebasestorage.googleapis.com/v0/b/ecanteen-b8f4e.appspot.com/o/image%2014.png?alt=media&token=8b443b4a-9316-40df-ac94-cec18215168e"
    return (
        <Carousel className="w-full rounded">
            <Carousel opts={{ loop: true }} >
                <CarouselContent>
                    <CarouselItem className="flex w-full justify-center items-center">
                        <Image src={imgAds} alt="Image" className="rounded-md object-cover w-full" width={300} height={300} />
                    </CarouselItem>
                    <CarouselItem>
                        <Image src={imgAds} alt="Image" className="rounded-md object-cover w-full" width={300} height={300} />
                    </CarouselItem>
                </CarouselContent>
            </Carousel>

        </Carousel>
    )
}
