import React from 'react'

export default function Loading() {
    return (
        <main className='absolute z-20 h-fit bg-white dark:bg-background'>
            <video autoPlay muted loop>
                <source src="/Logo-5-[remix].webm" type="video/webm" />
                Your browser does not support the video tag.
            </video>
        </main>
    )
}
