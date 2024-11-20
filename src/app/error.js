'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex flex-col items-center justify-center gap-2 h-screen'>
            <h2>Something went wrong!</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
            >
                Try again
            </Button>
        </div>
    )
}