import { Button } from "@/components/ui/button"
import SearchInput from "@/components/SearchInput"
import SearchLocate from "@/components/SearchLocate"


export default function SearchBar() {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <SearchInput />
            <div className="flex items-start gap-5">
                <SearchLocate />
                <Button className="self-start">Cari</Button>
            </div>

        </div>
    )
}