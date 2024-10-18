'use client'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'
import { Button } from './ui/button'
import { signOut } from 'next-auth/react'

function ProfileMenu({ auth }) {
    console.log(auth)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center space-x-2 w-full'>
                <Avatar>
                    <AvatarImage src={auth.user.image} alt={auth.user.name} />
                    <AvatarFallback>{auth.user.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <p className='font-normal text-sm'>{auth.user.name}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu Akun</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href={'/profile'}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link href={'/DashboardToko'}>Dashboard Toko</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    {/* <Link href={'/logout'}>Logout</Link> */}
                    <Button onClick={() => signOut()}>Keluar</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu
