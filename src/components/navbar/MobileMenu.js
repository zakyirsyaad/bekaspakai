import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import Link from 'next/link'
import UploadButton from '../UploadButton'
import { Menu, MessagesSquare, ShoppingBag, ShoppingCart } from 'lucide-react'
import AuthButton from '../AuthButton'
import ProfileMenu from '../ProfileMenu'
import { cookies } from 'next/headers'
import { Separator } from '../ui/separator'

function MobileMenu() {
    const accessToken = cookies().get('accessToken')?.value

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu size={30} className='text-primary lg:hidden' />
            </SheetTrigger >
            <SheetContent className="space-y-5">
                <SheetHeader>
                    <SheetTitle>
                        {accessToken ? <ProfileMenu /> : <AuthButton />}
                    </SheetTitle>
                    <Separator />
                    <SheetDescription>
                        <UploadButton />
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col gap-5 items-start'>
                    <Link href={'/chat'} className='flex items-center gap-5'><MessagesSquare /> <span>Chat</span></Link>
                    <Separator />
                    <Link href={'/keranjang'} className='flex items-center gap-5'><ShoppingCart /> <span>Keranjang</span></Link>
                    <Separator />
                    <Link href={'/transaksi'} className='flex items-center gap-5'><ShoppingBag /> <span>Transaksi</span></Link>
                    <Separator />
                </div>
            </SheetContent>
        </Sheet >
    )
}

export default MobileMenu
