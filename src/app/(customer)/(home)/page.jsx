import { Separator } from '@/components/ui/separator'
import AdsCarousel from '@/app/(customer)/(home)/AdsCarousel'
import Highlight_Donasi from '@/app/(customer)/(home)/HIghlight_Donasi'
import Highlight_JualBeli from '@/app/(customer)/(home)/Highlight_JualBeli'
import Kategori from '@/app/(customer)/(home)/Kategori'
import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default function Home() {
  return (
    <main className='space-y-10'>
      <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
        <AdsCarousel />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
        <Kategori />
      </Suspense>

      <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
        <Highlight_JualBeli />
      </Suspense>

      <Separator />

      <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
        <Highlight_Donasi />
      </Suspense>
    </main>
  )
}
