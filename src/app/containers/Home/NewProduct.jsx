import NewCardProduct from '@/components/NewCardProduct'
import { Button } from '@/components/ui/button'
import Link from 'next/link';
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight } from 'lucide-react';

export default function NewProduct() {
    return (
        <Tabs defaultValue="jualBeli">
            <div className='flex flex-col xl:flex-row justify-between items-center gap-5'>
                <h1 className='text-xl font-bold'>Produk Terbaru Bekaspakai</h1>
                <TabsList className="bg-transparent space-x-5">
                    <TabsTrigger
                        value="jualBeli"
                        className="px-10 py-3 data-[state=active]:bg-primary data-[state=active]:text-white text-secondary"
                    >
                        Jual Beli
                    </TabsTrigger>
                    <TabsTrigger
                        value="donasi"
                        className="px-10 py-3 data-[state=active]:bg-primary data-[state=active]:text-white text-secondary"
                    >
                        Donasi
                    </TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value="jualBeli">
                <NewCardProduct value="Jual Beli" />
                <div className='flex items-center justify-center lg:justify-end gap-5 mt-5'>
                    <p className='text-gray-500 italic'>Lihat semua produk Jual Beli Bekaspakai?</p>
                    <Button asChild>
                        <Link href={`/type/jual-beli`} prefetch={false}>Lihat Semua <ChevronRight /></Link>
                    </Button>
                </div>
            </TabsContent>
            <TabsContent value="donasi">
                <NewCardProduct value="Donasi" />
                <div className='flex items-center justify-center lg:justify-end gap-5 mt-5'>
                    <p className='text-gray-500 italic'>Lihat semua produk Donasi Bekaspakai?</p>
                    <Button asChild>
                        <Link href={`/type/Donasi`} prefetch={false}>Donasi <ChevronRight /></Link>
                    </Button>
                </div>
            </TabsContent>
        </Tabs>

    )
}
