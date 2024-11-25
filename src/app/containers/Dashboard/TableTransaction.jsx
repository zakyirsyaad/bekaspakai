import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import React from 'react';
import { Badge } from "@/components/ui/badge"
import Link from "next/link";

function TableTransaction() {
    const orderData = [
        { orderId: "0123456", tanggal: "21/04/2024", namaProduk: "MacBook Pro 2019 8/256Gb", kategori: "Laptop", harga: "Rp 7.275.000", status: "Pending", aksi: "..." },
        { orderId: "0123457", tanggal: "22/04/2024", namaProduk: "iPhone 12 64Gb", kategori: "Smartphone", harga: "Rp 9.500.000", status: "Dikemas", aksi: "..." },
        { orderId: "0123458", tanggal: "23/04/2024", namaProduk: "Samsung Galaxy S21 Ultra", kategori: "Smartphone", harga: "Rp 12.300.000", status: "Dikirim", aksi: "..." },
        { orderId: "0123459", tanggal: "24/04/2024", namaProduk: "Lenovo ThinkPad X1 Carbon", kategori: "Laptop", harga: "Rp 15.000.000", status: "Dibatalkan", aksi: "..." },
        { orderId: "0123460", tanggal: "25/04/2024", namaProduk: "Sony WH-1000XM4", kategori: "Headphone", harga: "Rp 4.500.000", status: "Pending", aksi: "..." },
        { orderId: "0123461", tanggal: "26/04/2024", namaProduk: "Dell XPS 13", kategori: "Laptop", harga: "Rp 13.500.000", status: "Dikirim", aksi: "..." },
        { orderId: "0123462", tanggal: "27/04/2024", namaProduk: "Asus ROG Strix G15", kategori: "Laptop", harga: "Rp 20.000.000", status: "Selesai", aksi: "..." },
        { orderId: "0123463", tanggal: "28/04/2024", namaProduk: "Apple AirPods Pro", kategori: "Earphone", harga: "Rp 3.250.000", status: "Dikirim", aksi: "..." },
        { orderId: "0123464", tanggal: "29/04/2024", namaProduk: "Canon EOS R5", kategori: "Kamera", harga: "Rp 60.000.000", status: "Pending", aksi: "..." },
        { orderId: "0123465", tanggal: "30/04/2024", namaProduk: "GoPro HERO9 Black", kategori: "Kamera", harga: "Rp 5.400.000", status: "Dikemas", aksi: "..." },
        { orderId: "0123466", tanggal: "01/05/2024", namaProduk: "Apple Watch Series 6", kategori: "Smartwatch", harga: "Rp 7.500.000", status: "Selesai", aksi: "..." },
        { orderId: "0123467", tanggal: "02/05/2024", namaProduk: "HP Envy 13", kategori: "Laptop", harga: "Rp 11.750.000", status: "Dibatalkan", aksi: "..." },
        { orderId: "0123468", tanggal: "03/05/2024", namaProduk: "Nintendo Switch", kategori: "Konsol Game", harga: "Rp 4.300.000", status: "Refund", aksi: "..." }
    ];

    return (
        <Table>
            <TableCaption><Link href="/dashboard/transaksi">Lihat semua Transaksi</Link></TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Nama Produk</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orderData.slice(0, 5).reverse().map((order, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{order.orderId}</TableCell>
                        <TableCell>{order.namaProduk}</TableCell>
                        <TableCell>{order.kategori}</TableCell>
                        <TableCell>{order.harga}</TableCell>
                        <TableCell><Badge
                            className={
                                order.status === 'Dibatalkan' ? 'bg-red-700 w-full' :
                                    order.status === 'Dikirim' ? 'bg-green-700 w-full' :
                                        order.status === 'Refund' ? 'bg-red-700 w-full' :
                                            order.status === 'Pending' ? 'bg-yellow-700 w-full' :
                                                'secondary w-full'
                            }
                        >
                            {order.status}
                        </Badge></TableCell>
                        <TableCell>{order.tanggal}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableTransaction;
