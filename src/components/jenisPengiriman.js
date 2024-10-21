'use client'

import React, { useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from './ui/button'

function JenisPengiriman() {
    const jenis = ['JNE', 'TIKI', 'Pos Indonesia', 'SiCepat'];
    const [selectedJenis, setSelectedJenis] = useState(null); // State untuk menyimpan pilihan

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-start lg:w-full">
                    {selectedJenis ? selectedJenis : "Jenis Pengiriman"} {/* Tampilkan pilihan atau teks default */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Jenis Pengiriman</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {jenis.map((jenis, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => setSelectedJenis(jenis)} // Mengatur nilai yang dipilih
                    >
                        {jenis}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default JenisPengiriman;
