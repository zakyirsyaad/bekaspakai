'use client';
import React, { Suspense } from 'react';
import { BadgeCheck, CalendarCheck2, MapPinHouse } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DecodeToken from '@/hooks/decodeToken';
import EditProfile from './editProfile';

function EditProfileButton({ isUserLoggedIn, isVerified, userId, accessToken, user }) {
    if (isUserLoggedIn?.id === userId) {
        if (isVerified?.isVerified) {
            return <EditProfile user={user} accessToken={accessToken} />;
        }
        return (
            <Button variant="link" asChild>
                <Link href="/otp">Verifikasi untuk edit profile</Link>
            </Button>
        );
    }
    return null;
}

function BioProfile({ user, accessToken }) {
    const {
        name = 'Pengguna',
        username = 'unknown',
        profile_picture,
        id,
        banner_profile_picture,
        bio = 'Belum menambahkan bio',
        createdAt,
        jenisKelamin,
        AuthPenjual,
    } = user;

    const isUserLoggedIn = DecodeToken(accessToken);
    const isVerified = DecodeToken(accessToken);

    return (
        <>
            <div className="relative">
                <Suspense fallback={<Skeleton className="w-full h-[100px] lg:h-[200px] 2xl:h-[300px]" />}>
                    <Image
                        src={banner_profile_picture?.url || '/logo/Bekaspakai-logo-Master_Primary White.png'}
                        alt="Banner Profile Page"
                        className="w-full h-[100px] lg:h-[300px] 2xl:h-[400px] object-cover shadow-xl rounded"
                        width={200}
                        height={200}
                    />
                    <Image
                        src={profile_picture?.url || '/image/blank-profile-picture-973460_1280.png'}
                        alt="Profile Picture"
                        className="absolute -bottom-10 left-5 2xl:-bottom-20 2xl:left-10 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 object-cover rounded-full border"
                        width={200}
                        height={200}
                    />
                </Suspense>
            </div>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-lg 2xl:text-xl font-semibold">{name}</h1>
                        <p className="text-sm 2xl:text-base">@{username}</p>
                    </div>
                    <EditProfileButton
                        isUserLoggedIn={isUserLoggedIn}
                        isVerified={isVerified}
                        userId={id}
                        accessToken={accessToken}
                        user={user}
                    />
                </div>
                <div className="flex gap-5">
                    <p className="flex items-center gap-2 text-sm 2xl:text-base">
                        <MapPinHouse />
                        {AuthPenjual?.alamat.split(',')[0] || 'Belum Daftar Toko'}
                    </p>
                    <p className="flex items-center gap-2 text-sm 2xl:text-base">
                        <BadgeCheck />
                        {new Date(createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                        })}
                    </p>
                </div>
                <p className="text-sm lg:text-base 2xl:text-lg">{bio}</p>
            </div>
        </>
    );
}

export default BioProfile;
