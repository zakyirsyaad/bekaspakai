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
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button';

export default function SelectJenis({ onChange }) {
    const [status, setStatus] = useState('loading'); // Default to loading state
    const [selectedJenis, setSelectedJenis] = useState(null); // Use null initially instead of an empty array
    const [jenisOptions, setJenisOptions] = useState([]); // Store fetched data here

    // Fetch the data once on mount
    useEffect(() => {
        const fetchData = async () => {
            const accessToken = Cookies.get('accessToken');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/type`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setJenisOptions(data.data.jenisProduct); // Store fetched data
                setStatus('success');
            } catch (error) {
                console.error('Error fetching data:', error);
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    const handleSelect = (jenis) => {
        setSelectedJenis(jenis.name); // Update the selected jenis
        onChange({ target: { name: 'jenisId', value: jenis.id } }); // Pass the selected jenis ID to the parent
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
                    {selectedJenis ?? "Pilih Jenis Produk"} {/* Use nullish coalescing for default text */}
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
