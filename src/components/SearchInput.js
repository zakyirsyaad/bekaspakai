import React from 'react'
import { Input } from './ui/input'

function SearchInput() {
    return (
        <Input type="text" name="search" placeholder="Pencarian produk" className="w-full col-span-2 md:col-span-3 lg:col-span-4" />
    )
}

export default SearchInput
