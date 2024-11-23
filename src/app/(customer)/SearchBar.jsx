'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button
                className="col-span-1"
                variant="secondary"
                onClick={handleSearch} // Panggil handleSearch saat tombol ditekan
            >
                Cari
            </Button>
        </div>
    );
}
