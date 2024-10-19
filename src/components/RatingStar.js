import { Star } from 'lucide-react'
import React from 'react'

function RatingStar({ rating }) {
    const ratingTotal = rating
    return (
        <div>
            <div className='flex items-center gap-1'>
                {
                    [...Array(ratingTotal)].map((_, index) => {
                        return (
                            <Star key={index} size={18} fill='#4EB3FF' />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RatingStar
