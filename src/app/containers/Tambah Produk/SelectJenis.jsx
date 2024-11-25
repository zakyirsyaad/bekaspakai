'use client'
import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';

export default function SelectJenis({ onChange, accessToken }) {
    const [status, setStatus] = useState('loading');
    const [selectedJenis, setSelectedJenis] = useState(null);
    const [jenisOptions, setJenisOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/type`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    cache: 'no-store',
                });
                const data = await response.json();
                setJenisOptions(data.data.jenisProduct);
                setStatus('success');
            } catch (error) {
                console.error('Error fetching data:', error);
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    const handleSelect = (jenis) => {
        setSelectedJenis(jenis.name);
        onChange({ target: { name: 'jenisId', value: jenis.id } });
    };

    const renderSelectItems = () => {
        switch (status) {
            case 'loading':
                return <DropdownMenuItem disabled>Pilih Jenis Produk...</DropdownMenuItem>;
            case 'error':
                return <DropdownMenuItem disabled>Error fetching data</DropdownMenuItem>;
            default:
                return jenisOptions.map((jenis) => (
                    <DropdownMenuItem
                        key={jenis.id} // Use jenis.id as the key
                        onClick={() => handleSelect(jenis)}
                        className="capitalize"
                    >
                        {jenis.name}
                    </DropdownMenuItem>
                ));
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                    {selectedJenis ?? "Pilih Jenis Produk"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Jenis Produk</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {renderSelectItems()}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
