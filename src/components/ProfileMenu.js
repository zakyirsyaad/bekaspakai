import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import Link from 'next/link'

function ProfileMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center space-x-2 border-2 py-1 px-3 rounded-sm border-accent md:border-0 md:p-0 '>
                <Avatar>
                    <AvatarImage src="https://i.pinimg.com/564x/ad/95/a0/ad95a09d209bf1178d52b55e16052def.jpg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className='font-normal text-sm'>fluttershyy</p>
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
                    <Link href={'/logout'}>Logout</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileMenu
