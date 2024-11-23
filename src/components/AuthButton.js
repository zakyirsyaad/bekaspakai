import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function AuthButton({ auth }) {
    return (
        <div className='flex items-center gap-5'>
            <Button className="w-1/2" variant="ghost" asChild>
                <Link href={'/login'} prefetch={true}>Login</Link>
            </Button>
            <Button className="w-1/2" asChild>
                <Link href={'/register'} prefetch={true}>Register</Link>
            </Button>
        </div>
    )
}

export default AuthButton
