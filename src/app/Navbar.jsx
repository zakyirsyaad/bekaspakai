import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, ShoppingBag, ShoppingCart, FileUser, LayoutDashboard, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNavbar from './containers/MobileNavbar'
import { cookies } from 'next/headers'
import LogoutButton from '@/components/LogoutButton'
import { ThemeToggle } from '@/components/ThemeToggle'


export default async function Navbar() {
    const cookieStore = await cookies()
    const isLoggedIn = cookieStore.has('accessToken');
    const accessToken = cookieStore.get('accessToken')?.value;

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    });

    const data = await response.json();
    const user = data.data;

    return (
        <>
            <MobileNavbar isLoggedIn={isLoggedIn} user={user} />
            <header className='hidden lg:flex justify-between items-center'>
                <ThemeToggle />
                <nav>
                    <ul className='flex items-center gap-5'>
                        <li>
                            <Link href={'/type/jual-beli'}>Jual Beli</Link>
                        </li>
                        <li>
                            <Link href={'/type/Donasi'}>Donasi</Link>
                        </li>
                        <li>Kategori</li>
                    </ul>
                </nav>
                <div>
                    <Link href={'/'}>
                        <Image
                            src={'/logo/Bekaspakai-logo-Master_Primary Black.png'}
                            alt="Bekaspakai"
                            width={175}
                            height={175}
                            priority={true}
                            className='dark:hidden'
                        />
                        <Image
                            src={'/logo/Bekaspakai-logo-Master_Primary White.png'}
                            alt="Bekaspakai"
                            width={175}
                            height={175}
                            priority={true}
                            className='hidden dark:block'
                        />
                    </Link>
                </div>
                {isLoggedIn ?
                    <nav className='flex gap-5 items-center'>
                        <ul className='flex gap-5 items-center'>
                            <li>
                                <Button variant="outline">
                                    <Link href={'/dashboard/produk/tambahProduk'}>
                                        + Tambahkan Produk
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Link href={'/keranjang'}> <ShoppingCart /></Link>
                            </li>
                            <li>
                                <Link href={'/transaksi'}> <ShoppingBag /></Link>
                            </li>
                            <li>
                                <Link href={'/chat'}> <MessageSquare /></Link>
                            </li>

                        </ul>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user.profile_picture?.url} />
                                    <AvatarFallback>{(user.username)?.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem asChild>
                                    <Link href={'/dashboard'} className='flex items-center gap-5 text-lg'><LayoutDashboard />Dashboard</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/p/${user.username}`} className='flex items-center gap-5 text-lg'><FileUser />Profile</Link>
                                </DropdownMenuItem>
                                <LogoutButton>
                                    <DropdownMenuItem className='flex items-center gap-5  text-sm' >
                                        <LogOut />Keluar
                                    </DropdownMenuItem>
                                </LogoutButton>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                    :
                    <nav>
                        <ul className='flex gap-5'>
                            <Button variant="ghost">
                                <Link href={'/login'}>Login</Link>
                            </Button>
                            <Button>
                                <Link href={'/register'}>Register</Link>
                            </Button>
                        </ul>
                    </nav>
                }
            </header>
        </>
    )
}
