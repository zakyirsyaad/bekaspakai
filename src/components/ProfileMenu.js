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

function ProfileMenu({ user }) {
    if (!user) {
        return null;
    }
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

export default ProfileMenu;
