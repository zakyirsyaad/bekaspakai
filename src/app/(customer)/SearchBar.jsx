'use client';

import { useState } from "react";
import { useRouter } from "next/navigation"; // Untuk navigasi di Next.js 13+
import { Button } from "@/components/ui/button";
import SearchInput from "@/components/SearchInput";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState(""); // State untuk input pencarian
    const router = useRouter(); // Hook routing Next.js
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(); // Panggil pencarian saat tombol Enter ditekan
        }
    };

    const handleSearch = () => {
        if (searchQuery.trim() !== "") {
            // Redirect ke halaman pencarian dengan query
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state saat input berubah
                onKeyDown={handleKeyDown} // Event listener untuk menangkap Enter
            />
            <Button
                className="col-span-1"
                onClick={handleSearch} // Panggil handleSearch saat tombol ditekan
            >
                Cari
            </Button>
        </div>
    );
}
