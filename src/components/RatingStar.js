import { Star } from 'lucide-react';
import React from 'react';

function RatingStar({ rating }) {
    // Ensure the rating is between 0 and 5
    const ratingTotal = Math.max(0, Math.min(rating, 5));

    return (
        <div>
            <div className='flex items-center gap-1'>
                {/* Create an array of length 5 to represent 5 stars */}
                {[...Array(5)].map((_, index) => {
                    return (
                        <Star
                            key={index}
                            size={18}
                            fill={index < ratingTotal ? '#4EB3FF' : '#E0E0E0'} // Color based on rating
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RatingStar;
