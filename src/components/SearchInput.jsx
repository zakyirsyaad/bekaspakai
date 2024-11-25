import React from 'react'
import { Input } from './ui/input'

export default function SearchInput({ value, onChange, onKeyDown }) {
    return (
        <Input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown} // Tambahkan properti ini untuk mendukung Enter
            className="border rounded"
            placeholder="Cari produk..."
        />
    );
}

