'use client';
import React from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

const adsImages = [
    { src: '/ads-carousel-1.svg', alt: 'Advertisement 1 for bekaspakai.com' },
    { src: '/ads-carousel-2.svg', alt: 'Advertisement 2 for bekaspakai.com' },
];

const AdsCarousel = () => {
    return (
        <section aria-label="Advertisement Carousel">
            <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 3000 })]}>
                <CarouselContent>
                    {adsImages.map((image, index) => (
                        <CarouselItem key={index}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                className="object-cover w-full"
                                width={500}
                                height={100}
                                priority={true}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </section>
    );
};

export default AdsCarousel;
