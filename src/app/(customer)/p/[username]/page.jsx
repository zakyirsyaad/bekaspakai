import { SkeletonBioProfile } from '@/components/Skeleton/SkeletonBioProfile';
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct';
import BioProfile from '@/app/(customer)/p/[username]/bioProfile'
import ProductProfile from '@/app/(customer)/p/[username]/ProductProfile'
import { cookies } from 'next/headers';
import React, { Suspense } from 'react'
import { redirect } from 'next/navigation';


export default async function page({ params }) {
    const { username } = params
    const accessToken = cookies().get('accessToken')?.value;

    // Lakukan fetch data user dengan token
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${username}`, {
        headers: {
            'cache': 'no-store',
        },
    });

    const data = await response.json();
    const user = data.data;
    if (!user) {
        redirect('/')
    }

    return (
        <main className='space-y-10'>
            <section className='flex flex-col gap-12 2xl:gap-24'>
                <Suspense fallback={<SkeletonBioProfile />}>
                    <BioProfile user={user} accessToken={accessToken} />
                </Suspense>
            </section>
            <section>
                <Suspense fallback={<SkeletonCardProduct />}>
                    <ProductProfile user={user} />
                </Suspense>
            </section>
        </main >
    )
}
