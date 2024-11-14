'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';


const options = {
    condition: [
        { name: "Baru dan Tersegel", value: "Baru dan Tersegel" },
        { name: "Baru Dibuka", value: "Baru Dibuka" },
        { name: "Sekali Pakai", value: "Sekali Pakai" },
        { name: "Jarang Dipakai", value: "Jarang Dipakai" },
        { name: "Pemakaian Rutin", value: "Pemakaian Rutin" },
        { name: "Sesuai Foto", value: "Sesuai Foto" },
    ],
    garansi: [
        { name: "Garansi", value: true },
        { name: "Tidak Garansi", value: false },
    ],
    nego: [
        { name: "Nego", value: true },
        { name: "Tidak Nego", value: false },
    ]
};

export default function SelectOption({ onChange }) {
    const [selectedCondition, setSelectedCondition] = React.useState('');
    const [selectedGaransi, setSelectedGaransi] = React.useState(null);
    const [selectedNego, setSelectedNego] = React.useState(null);

    const handleSelectCondition = (condition) => {
        setSelectedCondition(condition.name); // Update the selected jenis
        onChange({ target: { name: 'condition', value: condition.name } }); // Pass the selected jenis ID to the parent
    };

    const handleSelectGaransi = (garansi) => {
        setSelectedGaransi(garansi.name); // Update the selected jenis
        onChange({ target: { name: 'garansi', value: garansi.value } }); // Pass the selected jenis ID to the parent
    };
    const handleSelectNego = (nego) => {
        setSelectedNego(nego.name); // Update the selected jenis
        onChange({ target: { name: 'negoStatus', value: nego.value } }); // Pass the selected jenis ID to the parent
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                        {selectedCondition ? selectedCondition : "Pilih Kondisi Barang"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Kondisi Barang</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {options.condition.map((condition) => (
                        <DropdownMenuItem
                            key={condition.name}
                            onClick={() => handleSelectCondition(condition)}
                            value={condition.name} className="capitalize">
                            {condition.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                        {selectedGaransi ? selectedGaransi : "Pilih Garansi Barang"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Garansi Barang</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {options.garansi.map((garansi) => (
                        <DropdownMenuItem
                            key={garansi.name}
                            onClick={() =>
                                handleSelectGaransi(garansi)}
                            value={garansi.value} className="capitalize">
                            {garansi.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                        {selectedNego ? selectedNego : "Pilih Opsi Nego"}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Opsi Nego</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {options.nego.map((nego) => (
                        <DropdownMenuItem
                            key={nego.name}
                            onClick={() =>
                                handleSelectNego(nego)}
                            value={nego.value} className="capitalize">
                            {nego.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>

    )
}

