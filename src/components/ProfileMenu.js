import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { cookies } from 'next/headers';

async function ProfileMenu() {
    const accessToken = cookies().get('accessToken')?.value;
    // Lakukan fetch data user dengan token
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });

    const data = await response.json();
    const user = data.data;

    if (!user) {
        return null;
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={user.profile_picture?.url} alt={user.username} priority={toString(true)} />
                    <AvatarFallback>{(user.username)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <p className="font-normal text-sm truncate">{user.username}</p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Menu Akun</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={`/p/${(user.username)?.replace(/\s+/g, '-').toLowerCase()}`} prefetch={false}>
                    <DropdownMenuItem>
                        Profile
                    </DropdownMenuItem>
                </Link>
                <Link href={'/dashboard'} prefetch={false}>
                    <DropdownMenuItem>
                        Dashboard Toko
                    </DropdownMenuItem>
                </Link>
                <LogoutButton>
                    <DropdownMenuItem>
                        Keluar
                    </DropdownMenuItem>
                </LogoutButton>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}

export default ProfileMenu;
