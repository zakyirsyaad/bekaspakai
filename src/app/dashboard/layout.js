import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { cookies } from 'next/headers'
import ProfileDashboard from '../containers/Dashboard/ProfileDashboard'
import Sidebar from '../containers/Dashboard/Sidebar'
// import { TypeAnimation } from 'react-type-animation'
// import NameAnimation from './NameAnimation'

export default async function Layout({ children }) {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value
    let response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
        cache: 'no-store'
    })
    let data = await response.json()
    let user = data.data

    if (!user) {
        redirect('/')
    }

    return (
        <section className="flex flex-row gap-5">
            <nav className=" shadow dark:border rounded w-fit p-10 lg:flex flex-col items-start gap-5 hidden h-fit">
                <Suspense fallback={<Skeleton className="h-[250px] w-[100px] rounded-xl" />}>
                    <Sidebar />
                </Suspense>
            </nav>
            <main className="w-full">
                <div className='flex items-center justify-between mb-10'>
                    <Suspense fallback={<Skeleton className="h-[125px]  w-full rounded-xl" />}>
                        <h1 className='lg:text-2xl font-semibold'>Selamat Datang, {user.name}</h1>
                        {/* <ProfileDashboard /> */}
                    </Suspense>
                </div>
                <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
                    {children}
                </Suspense>
            </main>
        </section>
    )
}