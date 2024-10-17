import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

function AuthButton({ auth }) {
    return (
        <div className='flex items-center gap-5'>
            <Button className="w-1/2" asChild>
                <Link href={'/login'}>Login</Link>
            </Button>
            <Button variant="secondary" className="w-1/2" asChild>
                <Link href={'/register'}>Register</Link>
            </Button>
        </div>
    )
}

export default AuthButton
