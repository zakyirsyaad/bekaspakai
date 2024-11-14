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
import { Button } from '@/components/ui/button'

export default function SelectCategory({ onChange }) {
    const [status, setStatus] = useState('loading'); // Default to loading state
    const [selectedCategory, setSelectedCategory] = useState(null); // Initially null
    const [categoryList, setCategoryList] = useState([]); // Store fetched data here

    // Fetch the data once on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setCategoryList(data.data.result); // Store fetched data
                setStatus('success');
            } catch (error) {
                console.error('Error fetching data:', error);
                setStatus('error');
            }
        };

        fetchData();
    }, []);

    const handleSelect = (categoryProductId) => {
        setSelectedCategory(categoryProductId.name); // Update selected category name
        onChange({ target: { name: 'categoryProductId', value: categoryProductId.id } }); // Pass the selected category ID to parent
    };

    const renderDropdownItems = () => {
        switch (status) {
            case 'loading':
                return <DropdownMenuItem disabled>Pilih Kategori Produk...</DropdownMenuItem>;
            case 'error':
                return <DropdownMenuItem disabled>Error fetching data</DropdownMenuItem>;
            default:
                return categoryList.map((category) => (
                    <React.Fragment key={category.id}>
                        <DropdownMenuLabel>{category.name}</DropdownMenuLabel>
                        {category.subCategories.map((subCategory) => (
                            <DropdownMenuItem
                                key={subCategory.id}
                                onClick={() => handleSelect(subCategory)} // Pass the full subCategory object
                            >
                                {subCategory.name}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                    </React.Fragment>
                ));
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex justify-start lg:w-full capitalize">
                    {selectedCategory ?? "Pilih Kategori Produk"} {/* Default placeholder if none selected */}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {renderDropdownItems()}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
