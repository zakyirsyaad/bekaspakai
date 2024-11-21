import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator'
import CardUserProduct from './component/CardUserProduct'


function ProductProfile({ user }) {
    return (
        <Tabs defaultValue="Product" className="w-full flex flex-col items-start gap-5">
            <TabsList className="self-center">
                <TabsTrigger value="Product">Product</TabsTrigger>
                {/* <TabsTrigger value="Donasi">Donasi</TabsTrigger> */}
                <TabsTrigger value="Ulasan">Ulasan</TabsTrigger>
            </TabsList>

            <Separator />

            <TabsContent value="Product" className="space-y-5">
                <CardUserProduct user={user} />
            </TabsContent>
            <TabsContent value="Ulasan">
                <p>Halaman Ulasan</p>
            </TabsContent>
        </Tabs>

    )
}

export default ProductProfile
