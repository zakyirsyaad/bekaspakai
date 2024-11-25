import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'

export default function ProductImage({ product }) {
    return (
        <Carousel className="rounded col-span-1 xl:col-span-2">
            <CarouselContent>
                {product.picture.map((image) => (
                    <CarouselItem key={image.url}>
                        <Image src={image.url} alt={product.name} width={400} height={400} className='aspect-square h-full w-full object-cover rounded' />
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>

    )
}
