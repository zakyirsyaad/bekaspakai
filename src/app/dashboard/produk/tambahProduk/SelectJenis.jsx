'use client'
import React, { useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Cookies from 'js-cookie';
export default function SelectJenis({ onSelectChange }) {
    const [status, setStatus] = React.useState(null);
    const [jenis, setJenis] = React.useState(null);

    useEffect(() => {
        let accessToken = Cookies.get('accessToken')
        setStatus('loading');
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/type`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setJenis(data.data.jenisProduct);
                setStatus('success');
            })
    }, [])
    const handleSelect = (jenisId) => {
        onSelectChange(jenisId);
    }
    return (
        <Select>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={status === 'loading' ? 'Loading...' : 'Pilih Jenis Produk'} />
            </SelectTrigger>
            <SelectContent>
                {jenis?.map((item) => (
                    <SelectItem key={item.id} value={item.id} onClick={() => handleSelect(item.id)}>{item.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
