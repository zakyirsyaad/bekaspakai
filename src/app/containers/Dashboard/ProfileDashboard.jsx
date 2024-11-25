import React from 'react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LogoutButton from '@/components/LogoutButton';
// import LogoutButton from '@/components/LogoutButton';

async function ProfileDashboard() {
    const accessToken = cookies().get('accessToken')?.value;

    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store',
    });
    let data = await response.json();
    let user = data.data;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center space-x-2">
                <Avatar>
                    <AvatarImage src={user.profile_picture?.url} alt={user.username} />
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

export default ProfileDashboard;
