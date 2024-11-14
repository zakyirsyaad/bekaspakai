import { Button } from "@/components/ui/button"
import SearchInput from "@/components/SearchInput"


export default function SearchBar() {
    return (
        <div className="flex items-center gap-2">
            <SearchInput />
            <Button className="col-span-1">Cari</Button>
        </div>
    )
}