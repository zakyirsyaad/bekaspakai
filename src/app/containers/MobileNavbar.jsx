import Image from 'next/image'
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileUser, LayoutDashboard, LogOut, Menu, ShoppingBag, ShoppingCart } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'


export default function MobileNavbar({ isLoggedIn, user, version }) {
    return (
        <header className='flex justify-between items-center lg:hidden my-1'>
            <div className='space-y-2 relative'>
                <Link href={'/'}>
                    <Image
                        src={'/logo/Bekaspakai-logo-Master_Primary Black.png'}
                        alt="Bekaspakai"
                        width={150}
                        height={100}
                        priority={true}
                        className='dark:hidden'
                    />
                    <Image
                        src={'/logo/Bekaspakai-logo-Master_Primary White.png'}
                        alt="Bekaspakai"
                        width={200}
                        height={200}
                        priority={true}
                        className='hidden dark:block'
                    />
                    <Badge variant="secondary">BETA: {version}</Badge>
                </Link>
                <nav>
                    <ul className='flex items-center gap-5'>
                        <li>Jual Beli</li>
                        <li>Donasi</li>
                        <li>Kategori</li>
                    </ul>
                </nav>
            </div>
            <Sheet>
                <SheetTrigger asChild>
                    <Menu size={32} />
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>
                            {isLoggedIn ? (
                                <div className='flex items-center gap-2'>
                                    <Avatar>
                                        <AvatarImage src={user?.profile_picture?.url} />
                                        <AvatarFallback>{(user?.username)?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p>{user?.username}</p>
                                </div>
                            ) :
                                <nav>
                                    <ul className='flex items-center justify-center gap-10'>
                                        <Button variant="ghost">
                                            <Link href={'/login'}>Login</Link>
                                        </Button>
                                        <Button>
                                            <Link href={'/register'}>Register</Link>
                                        </Button>
                                    </ul>
                                </nav>
                            }
                        </SheetTitle>
                        <SheetDescription asChild>
                            <Separator />
                        </SheetDescription>
                    </SheetHeader>
                    <nav>
                        <ul className='space-y-5 mt-5'>
                            <li>
                                <Link href={'/dashboard/produk/tambahProduk'} className='font-semibold'>
                                    + Tambahkan Produk
                                </Link>
                            </li>
                            <Separator />
                            {isLoggedIn ?
                                <>
                                    <li>
                                        <Link href={'/dashboard'} className='flex items-center gap-5'><LayoutDashboard />Dashboard</Link>
                                    </li>
                                    <Separator />
                                    <li>
                                        <Link href={`/p/${user?.username}`} className='flex items-center gap-5'><FileUser />Profile</Link>
                                    </li>
                                    <Separator />
                                    <li>
                                        <Link href={'/keranjang'} className='flex items-center gap-5'><ShoppingCart />Keranjang</Link>
                                    </li>
                                    <Separator />
                                    <li>
                                        <Link href={'/transaksi'} className='flex items-center gap-5'><ShoppingBag />Transaksi</Link>
                                    </li>
                                    <Separator />
                                    <li>
                                        <Link href={'/logout'} className='flex items-center gap-5'><LogOut />Keluar</Link>
                                    </li>
                                </>
                                :
                                null
                            }
                            <li>
                                <ThemeToggle />
                            </li>
                        </ul>
                    </nav>
                </SheetContent>
            </Sheet>

        </header>
    )
}
