import { Separator } from '@/components/ui/separator'
import AdsCarousel from '@/containers/Homepage/AdsCarousel'
import Highlight_Donasi from '@/containers/Homepage/HIghlight_Donasi'
import Highlight_JualBeli from '@/containers/Homepage/Highlight_JualBeli'
import Kategori from '@/containers/Homepage/Kategori'
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
