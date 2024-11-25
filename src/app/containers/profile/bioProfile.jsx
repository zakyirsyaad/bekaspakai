'use client'
import React, { Suspense } from 'react'
import { BadgeCheck, CalendarCheck2, MapPinHouse } from 'lucide-react'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import DecodeToken from '@/hooks/decodeToken'
import EditProfile from './editProfile'

function BioProfile({ user, accessToken }) {
    const { name, username, profile_picture, id, banner_profile_picture, bio, createdAt, jenisKelamin, AuthPenjual } = user

    const isUserLoggedin = DecodeToken(accessToken);
    const isVerified = DecodeToken(accessToken)

    const editProfile = () => {
        if (isUserLoggedin?.id === id && isVerified?.isVerified) {
            return <EditProfile user={user} accessToken={accessToken} jenisKelamin={jenisKelamin} />
        } else if (isUserLoggedin?.id === id && !isVerified?.isVerified) {
            return <Button variant='link' asChild><Link href={`/otp`}>Verifikasi untuk edit profile</Link></Button>
        } else {
            return null
        }
    }

    let alamatLengkap = AuthPenjual.alamat
    let alamatKota = alamatLengkap.split(' ')
    alamatKota = alamatKota[0];

    return (
        <>
            <div className='relative'>
                <Suspense fallback={<Skeleton className="w-full h-[100px] lg:h-[200px] 2xl:h-[300px]" />}>
                    <Image src={banner_profile_picture?.url || '/logo baru bg transparant v.2.png'} alt='Banner Profile Page' className='w-full h-[100px] lg:h-[200px] 2xl:h-[300px] object-cover shadow-xl rounded' width={200} height={200} />
                    <Image src={profile_picture?.url || 'https://pixabay.com/get/g021342e450816c60fb3873780f057fbdf1f5b112974f9fca7f0decb33e339e6f9b02a23939dabb1cabfeb6c010a598fc_1920.png'} alt='Banner Profile Page' className='absolute -bottom-10 left-5 2xl:-bottom-20 2xl:left-10 w-20 h-20 lg:w-32 lg:h-32 2xl:w-40 2xl:h-40 object-cover rounded-full border' width={200} height={200} />
                </Suspense>
            </div>
            <div className='space-y-3'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='text-lg 2xl:text-xl font-semibold'>{name}</h1>
                        <p className='text-sm 2xl:text-base'>@{username}</p>
                    </div>
                    {editProfile()}
                </div>
                <div className='flex gap-5'>
                    {/* <p className='flex items-center gap-2 text-sm 2xl:text-base'><MapPinHouse />{(alamat).match(/^\S+/)[0]}</p> */}
                    <p className='flex items-center gap-2 text-sm 2xl:text-base'><MapPinHouse />{alamatKota}</p>
                    <p className='flex items-center gap-2 text-sm 2xl:text-base'><BadgeCheck />{new Date(createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <p className='text-sm lg:text-base 2xl:text-lg'>{bio || 'Belum menambahkan bio'}</p>
            </div>
        </>
    )
}
export default BioProfile
