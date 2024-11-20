'use client';

import { useSearchParams } from "next/navigation"; // Untuk mendapatkan parameter query
import { useEffect, useState } from "react";

export default function Page() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query"); // Ambil query dari URL
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL_API}/products?search=${encodeURIComponent(query)}`
                );
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Hasil Pencarian untuk: {query}</h1>
            {products.length > 0 ? (
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>Tidak ada produk ditemukan.</p>
            )}
        </div>
    );
}
