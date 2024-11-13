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

export default function SelectCategory({ onSelectChange }) {
    const [status, setStatus] = React.useState(null);
    const [category, setCategory] = React.useState(null);

    useEffect(() => {
        setStatus('loading');
        let accessToken = Cookies.get('accessToken')
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setCategory(data.data.result);
                setStatus('success');
            })
    }, [])

    const handleSelect = (categoryId) => {
        onSelectChange(categoryId);
    }
    return (
        <Select>
            <SelectTrigger className="col-span-2">
                <SelectValue placeholder={status === 'loading' ? 'Loading...' : 'Pilih Kategori Produk'} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {category?.map((item) => (
                        <React.Fragment key={item.id}>
                            <SelectLabel>{item.name}</SelectLabel>
                            {item.subCategories.map((sub) => (
                                <SelectItem key={sub.id} value={sub.id} onClick={() => handleSelect(sub.id)}>
                                    {sub.name}
                                </SelectItem>
                            ))}
                        </React.Fragment>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
