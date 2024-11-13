import { ScrollArea } from "@/components/ui/scroll-area"
import React from 'react'
import Image from "next/image"
import { Badge } from "./ui/badge"

export default function OrderHistory() {
    const transaksi = true
    return (
        <ScrollArea className="h-96 w-full">

            {transaksi ?
                <div className="space-y-5">
                    <div className="flex flex-col justify-between border p-2 rounded gap-3">
                        <div className="flex lg:flex-col gap-2 items-start 2xl:flex-row justify-between">
                            <div className="gap-2">
                                <p className="text-sm font-bold">#0001</p>
                                <Badge variant="secondary">Pending</Badge>
                            </div>

                            <p className="text-xs font-medium opacity-50">18 Januari 2023 14.00 WIB</p>
                        </div>
                        <div className="flex gap-2">
                            <Image src="https://github.com/shadcn.png" alt="Logo" className="rounded object-cover w-14 h-14 2xl:w-16 2xl:h-16" width={70} height={70} />
                            <div className="flex flex-col">
                                <p className="text-sm font-medium truncate">MacBook Pro 2019 8/256G sssssssssssssb</p>
                                <p className="text-sm opacity-50 w-32 md:w-64 lg:w-32 truncate">Rp 1.000.000</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between border p-2 rounded gap-3">
                        <div className="flex lg:flex-col gap-2 items-start 2xl:flex-row justify-between">
                            <div className="gap-2">
                                <p className="text-sm font-bold">#0002</p>
                                <Badge variant="secondary">Pending</Badge>
                            </div>

                            <p className="text-xs font-medium opacity-50">18 Januari 2023 14.00 WIB</p>
                        </div>
                        <div className="flex gap-2">
                            <Image src="https://github.com/shadcn.png" alt="Logo" className="rounded object-cover w-14 h-14 2xl:w-16 2xl:h-16" width={70} height={70} />                        <div className="flex flex-col">
                                <p className="text-sm font-medium truncate">MacBook Pro 2019 8/256G sssssssssssssb</p>
                                <p className="text-sm opacity-50 w-32 md:w-64 lg:w-32 truncate">Rp 1.000.000</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between border p-2 rounded gap-3">
                        <div className="flex lg:flex-col gap-2 items-start 2xl:flex-row justify-between">
                            <div className="gap-2">
                                <p className="text-sm font-bold">#0003</p>
                                <Badge variant="secondary">Pending</Badge>
                            </div>

                            <p className="text-xs font-medium opacity-50">18 Januari 2023 14.00 WIB</p>
                        </div>
                        <div className="flex gap-2">
                            <Image src="https://github.com/shadcn.png" alt="Logo" className="rounded object-cover w-14 h-14 2xl:w-16 2xl:h-16" width={70} height={70} />                        <div className="flex flex-col">
                                <p className="text-sm font-medium truncate">MacBook Pro 2019 8/256G sssssssssssssb</p>
                                <p className="text-sm opacity-50 w-32 md:w-64 lg:w-32 truncate">Rp 1.000.000</p>
                            </div>
                        </div>
                    </div>
                </div>
                : 'Belum ada transaksi'}

        </ScrollArea>
    )
}
