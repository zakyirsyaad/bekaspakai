import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import { redirect } from 'next/navigation';
import BioProfile from '@/app/containers/profile/bioProfile';
import ProductProfile from '@/app/containers/profile/ProductProfile';
import { SkeletonBioProfile } from '@/components/Skeleton/SkeletonBioProfile';
import { SkeletonCardProduct } from '@/components/Skeleton/SkeletonCardProduct';

export async function generateMetadata({ params }, parent) {
    try {
        const username = await params?.username;

        // Fetch user data
        const userResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${username}`, {
            cache: 'no-store',
        });

        if (!userResponse.ok) {
            throw new Error('Failed to fetch user data for metadata');
        }

        const user = await userResponse.json();
        const previousImages = parent?.openGraph?.images || [];

        return {
            title: `${user.data.username} | Bekaspakai Indonesia Marketplace`,
            openGraph: {
                images: [user.data?.profile_picture?.url, ...previousImages],
            },
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'Bekaspakai | Indonesia Marketplace',
            openGraph: {
                images: [],
            },
        };
    }
}

export default async function Page({ params }) {
    const { username } = params;
    const cookiesStore = cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;

    try {
        // Fetch user data
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/${username}`, {
            headers: {
                'cache': 'no-store',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch user data:', response.statusText);
            redirect('/');
            return null;
        }

        const data = await response.json();
        const user = data?.data;

        if (!user) {
            redirect('/');
            return null;
        }

        return (
            <main className="space-y-10">
                <section className="flex flex-col gap-12 2xl:gap-24">
                    <Suspense fallback={<SkeletonBioProfile />}>
                        <BioProfile user={user} accessToken={accessToken} />
                    </Suspense>
                </section>
                <section>
                    <Suspense fallback={<SkeletonCardProduct />}>
                        <ProductProfile user={user} />
                    </Suspense>
                </section>
            </main>
        );
    } catch (error) {
        console.error('Error rendering page:', error);
        redirect('/');
        return null;
    }
}
