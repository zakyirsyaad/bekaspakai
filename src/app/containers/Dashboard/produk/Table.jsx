//page.jsx
'use client'
import { useEffect, useState } from "react";
import { columns } from "./columns";
import DataTable from "./data-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData(accessToken) {
    try {
        // Misalnya, fetch dari API endpoint Anda
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        }); // Ganti dengan endpoint yang sesuai
        const json = await response.json();

        // Mengambil data produk dari response dan memformatnya
        return json.data.products.map((product) => ({
            id: product.id,
            name: product.name,
            picture: product.picture,
            jenisId: product.jenisId,
            isAvailable: product.isAvailable,
            price: product.price,
        }));
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

export default function Table({ accessToken }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData(accessToken);
            setData(result);
        };
        fetchData();
    }, []);

    console.log(data)

    return (
        <div className="container">
            <Button asChild>
                <Link href={'/dashboard/produk/tambahProduk'} prefetch={false}>+ Tambah Produk</Link>
            </Button>
            <DataTable columns={columns} data={data} />
        </div>
    );
}
