import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CardDonasi_Toko from '@/components/Product by Toko/CardDonasi_Toko'
import CardJualbeli_Toko from '@/components/Product by Toko/CardJualbeli_Toko'
import { Separator } from '@/components/ui/separator'


function ProductProfile({ user }) {
    return (
        <Tabs defaultValue="JualBeli" className="w-full flex flex-col items-start gap-5">
            <TabsList className="self-center">
                <TabsTrigger value="JualBeli">Jual Beli</TabsTrigger>
                <TabsTrigger value="Donasi">Donasi</TabsTrigger>
                <TabsTrigger value="Ulasan">Ulasan</TabsTrigger>
            </TabsList>
            <Separator />
            <TabsContent value="JualBeli" className="space-y-5">
                <CardJualbeli_Toko user={user} />
            </TabsContent>
            <TabsContent value="Donasi">
                <CardDonasi_Toko user={user} />
            </TabsContent>
            <TabsContent value="Ulasan">
                <p>Halaman Ulasan</p>
            </TabsContent>
        </Tabs>

    )
}

export default ProductProfile
