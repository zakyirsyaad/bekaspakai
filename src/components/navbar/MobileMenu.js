import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import Link from 'next/link'
import UploadButton from '../UploadButton'
import { Menu, MessagesSquare, ShoppingBag, ShoppingCart } from 'lucide-react'
import AuthButton from '../AuthButton'
import ProfileMenu from '../ProfileMenu'
import { ThemeMode } from '../ThemeMode'

function MobileMenu({ auth }) {
    return (
        <Sheet>
            <SheetTrigger SheetTrigger>
                <Menu size={30} className='text-primary lg:hidden' />
            </SheetTrigger >
            <SheetContent className="space-y-5">
                <SheetHeader>
                    <SheetTitle>
                        {auth ? <ProfileMenu /> : <AuthButton />}
                    </SheetTitle>
                    <SheetDescription>
                        <UploadButton />
                    </SheetDescription>
                </SheetHeader>
                <div className='flex flex-col gap-2 items-start'>
                    {auth ?
                        <>
                            <Button asChild>
                                <Link href={'/uploadproduct'} className='space-x-5'><MessagesSquare /> <span>Chat</span></Link>
                            </Button>
                            <Button asChild>
                                <Link href={'/uploadproduct'} className='space-x-5'><ShoppingCart /> <span>Keranjang</span></Link>
                            </Button>
                            <Button asChild>
                                <Link href={'/uploadproduct'} className='space-x-5'><ShoppingBag /> <span>Transaksi</span></Link>
                            </Button>
                        </>
                        : null}
                </div>
                <div className='absolute z-10 bottom-5 right-5'>
                    <ThemeMode />
                </div>
            </SheetContent>
        </Sheet >
    )
}

export default MobileMenu
