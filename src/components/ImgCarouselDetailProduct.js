'use client'
import React, { useEffect, useState, useCallback } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from "embla-carousel-autoplay"
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

function ImgCarouselDetailProduct({ detailProducts }) {
    const [api, setApi] = useState(null)
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    // Handle carousel API updates
    const onApiReady = useCallback((apiInstance) => {
        setApi(apiInstance)
    }, [])

    // Effect for updating carousel status
    useEffect(() => {
        if (!api) return

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        const handleSelect = () => {
            setCurrent(api.selectedScrollSnap() + 1)
        }

        api.on("select", handleSelect)

        return () => {
            api.off("select", handleSelect)
        }
    }, [api])

    return (
        <section>
            <Carousel
                setApi={onApiReady}
                opts={{ loop: true }}
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}>
                <CarouselContent>
                    {detailProducts.picture.map((img) => (
                        <CarouselItem key={img.key}>
                            <Dialog>
                                <DialogTrigger className='w-full'>
                                    <Image
                                        src={img.url}
                                        alt={`Foto Detail produk ${img.key}`}
                                        className='rounded w-full lg:h-[500px] object-cover'
                                        width={300}
                                        height={300}
                                        priority
                                    />
                                </DialogTrigger>
                                <DialogContent>
                                    <Image
                                        src={img.url}
                                        alt={`Foto Detail produk ${img.key}`}
                                        className='rounded w-full lg:h-[500px] object-cover'
                                        width={300}
                                        height={300}
                                        priority
                                    />
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
