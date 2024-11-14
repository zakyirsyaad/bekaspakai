import { Separator } from '@/components/ui/separator'
import AdsCarousel from '@/app/(customer)/(home)/AdsCarousel'
import Highlight_Donasi from '@/app/(customer)/(home)/HIghlight_Donasi'
import Highlight_JualBeli from '@/app/(customer)/(home)/Highlight_JualBeli'
import Kategori from '@/app/(customer)/(home)/Kategori'
import React from 'react'

export default function Home() {
  return (
    <main className='space-y-10'>
      <AdsCarousel />
      <Kategori />
      <Highlight_JualBeli />
      <Separator />
      <Highlight_Donasi />
    </main>
  )
}


