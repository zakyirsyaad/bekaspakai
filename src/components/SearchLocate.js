import React from 'react'
import { MapPin } from "lucide-react"
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
function SearchLocate() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline"> <MapPin />Yogyakarta</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Pilih Lokasi</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Yogyakarta</DropdownMenuItem>
                <DropdownMenuItem>Malang</DropdownMenuItem>
                <DropdownMenuItem>Surabaya</DropdownMenuItem>
                <DropdownMenuItem>Bandung</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default SearchLocate
