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

function JenisPengiriman({ onChange, penjual, getCouriers }) {
    const jenis = penjual.AuthPenjual.KurirPenjuals
    const [selectedJenis, setSelectedJenis] = useState(null); // State untuk menyimpan pilihan

    const handleSelect = (value) => {
        // Update UI dengan pilihan
        onChange({ target: { name: 'courierId', value } }); // Panggil onChange dari formik dengan field name dan value
    };

    const handleGetCouriers = (value) => {
        getCouriers(value)
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                    {selectedJenis ? selectedJenis : "Jenis Pengiriman"} {/* Tampilkan pilihan atau teks default */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Jenis Pengiriman</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {jenis.map((jenis, index) => (
                    <DropdownMenuItem
                        key={index}
                        onClick={() => {
                            handleSelect(jenis.id);
                            setSelectedJenis(jenis.layananKurirId);
                            handleGetCouriers(jenis.layananKurirId);
                        }}
                        className="capitalize" // Mengatur nilai yang dipilih
                    >
                        {jenis.layananKurirId}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default JenisPengiriman;
