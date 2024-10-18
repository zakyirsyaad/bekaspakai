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
                        <ShoppingBag size={35} />
                    </Link>
                    <Link href={'/keranjang'}>
                        <ShoppingCart size={35} />
                    </Link>
                    <Link href={'/chat'}>
                        <MessagesSquare size={35} />
                    </Link>
                </>
                : null}
            <UploadButton auth={auth} />
            {auth ? <ProfileMenu auth={auth} /> : <AuthButton />}
        </nav >
    )
}

export default WebMenu
