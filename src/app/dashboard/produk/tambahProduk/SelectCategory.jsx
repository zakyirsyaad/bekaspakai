"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function SelectCategory({ onChange }) {
    const [status, setStatus] = useState("loading");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false);

    // Fetch data once on mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/category`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setCategoryList(data.data.result);
                setStatus("success");
            } catch (error) {
                console.error("Error fetching data:", error);
                setStatus("error");
            }
        };

        fetchData();
    }, []);

    const handleSelect = (subCategory) => {
        setSelectedCategory(subCategory.name);
        onChange({
            target: { name: "categoryProductId", value: subCategory.id },
        });
        setOpen(false);
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {selectedCategory ?? "Pilih Kategori Produk"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Cari Subkategori..." />
                    <CommandList>
                        {status === "loading" && (
                            <CommandEmpty>Memuat subkategori...</CommandEmpty>
                        )}
                        {status === "error" && (
                            <CommandEmpty>Gagal memuat subkategori.</CommandEmpty>
                        )}
                        {status === "success" && (
                            <CommandGroup>
                                {categoryList.map((category) => (
                                    <React.Fragment key={category.id}>
                                        <div className="px-3 py-2 font-semibold text-sm text-gray-700">
                                            {category.name}
                                        </div>
                                        {category.subCategories.map((subCategory) => (
                                            <CommandItem
                                                key={subCategory.id}
                                                onSelect={() => handleSelect(subCategory)}
                                            >
                                                <Check
                                                    className={`mr-2 h-4 w-4 ${selectedCategory === subCategory.name
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                        }`}
                                                />
                                                {subCategory.name}
                                            </CommandItem>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
