import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Card_JualBeli from '@/components/Product Jual Beli/Card_JualBeli'
import Card_Donasi from '@/components/Product Jual Beli/Card_Donasi'


function ProductProfile() {
    return (
        <Tabs defaultValue="JualBeli" className="w-full">
            <TabsList>
                <TabsTrigger value="JualBeli">Jual Beli</TabsTrigger>
                <TabsTrigger value="Donasi">Donasi</TabsTrigger>
                <TabsTrigger value="Ulasan">Ulasan</TabsTrigger>
            </TabsList>
            <TabsContent value="JualBeli">
                <Card_JualBeli />
            </TabsContent>
            <TabsContent value="Donasi">
                <Card_Donasi />
            </TabsContent>
            <TabsContent value="Ulasan">
                <p>Halaman Ulasan</p>
            </TabsContent>
        </Tabs>

    )
}

export default ProductProfile
