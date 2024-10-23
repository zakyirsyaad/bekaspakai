import { MessagesSquare, ShoppingBag, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import UploadButton from '../UploadButton'
import ProfileMenu from '../ProfileMenu'
import AuthButton from '../AuthButton'

function WebMenu({ auth }) {
    return (
        <nav className='hidden lg:flex items-center gap-5'>
            {auth ?
                <>
                    <Link href={'/transaksi'}>
                        <ShoppingBag className='w-6 h-6 2xl:w-7 2xl:h-7' />
                    </Link>
                    <Link href={'/keranjang'}>
                        <ShoppingCart className='w-6 h-6 2xl:w-7 2xl:h-7' />
                    </Link>
                    <Link href={'/chat'}>
                        <MessagesSquare className='w-6 h-6 2xl:w-7 2xl:h-7' />
                    </Link>
                </>
                : null
            }
            <UploadButton auth={auth} />
            {auth ? <ProfileMenu auth={auth} /> : <AuthButton />}
        </nav >
    )
}

export default WebMenu
