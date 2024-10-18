import { Button } from "@/components/ui/button"
import SearchInput from "@/components/SearchInput"
import SearchLocate from "@/components/SearchLocate"


export default function SearchBar() {
    return (
        <div className="flex items-center gap-5">
            <SearchInput />
            <SearchLocate />
            <Button>Cari</Button>
        </div>
    )
}