import React from 'react'
import { Frown, Smile, Star } from "lucide-react";

export default function TotalRating() {
    return (
        <>
            <div className="flex items-center mb-4 justify-center">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} />
                    ))}
                </div>
                <span className="ml-2 text-lg font-medium text-gray-800">4.80</span>
            </div>

            <div className="flex gap-5 items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className='flex gap-2'>
                        <Smile color='green' />
                        <p className="text-green-500 text-lg font-semibold">96%</p>
                    </div>
                    <p className="text-sm ">Ulasan Positif</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className='flex gap-2'>
                        <Frown color='red' />
                        <p className="text-destructive text-lg font-semibold">4%</p>
                    </div>
                    <p className=" text-sm">Ulasan Negatif</p>
                </div>
            </div>
        </>
    );
}
