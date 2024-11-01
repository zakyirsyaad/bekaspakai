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

function JenisPengiriman({ onChange }) {
    const jenis = ['JNE', 'TIKI', 'Pos Indonesia', 'SiCepat'];
    const [selectedJenis, setSelectedJenis] = useState(null); // State untuk menyimpan pilihan

    const handleSelect = (value) => {
        setSelectedJenis(value); // Update UI dengan pilihan
        onChange({ target: { name: 'courier', value } }); // Panggil onChange dari formik dengan field name dan value
    };

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
                        onClick={() => handleSelect(jenis)} // Mengatur nilai yang dipilih
                    >
                        {jenis}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default JenisPengiriman;
