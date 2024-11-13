//columns.jsx
import { MoreHorizontal } from "lucide-react"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Link from "next/link";

const getJenisLabel = (jenisId) => {
    switch (jenisId) {
        case "3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f":
            return "Jual Beli";
        case "9153c3c9-958b-408e-a236-b93e354f01ce":
            return "Donasi";
        default:
            return "Unknown";
    }
};


export const columns = [
    {
        accessorKey: "picture",
        header: "Foto",
        cell: ({ row }) => {
            const pictureUrl = row.original.picture?.[0]?.url;
            return pictureUrl ? <Image src={pictureUrl} alt="Product Image" className="h-20 w-20 rounded" width={100} height={100} /> : null;
        },
    },
    {
        accessorKey: "name",
        enableHiding: false,
        header: ({ column }) => (
            <Button
                variant="subtle"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Nama Produk
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "jenisId",
        header: "Jenis Produk",
        cell: ({ row }) => getJenisLabel(row.getValue("jenisId")),
    },
    {
        accessorKey: "isAvailable",
        header: "Tersedia",
        cell: ({ row }) => (row.getValue("isAvailable") ? "Ada" : "Terjual"),
    },
    {
        accessorKey: "price",
        header: "Harga Produk",
        cell: ({ row }) => {
            const price = row.getValue("price");
            const formatted = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(price);
            return <div>{formatted}</div>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy Product ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/JenisProduct/${getJenisLabel(product.jenisId).replace(/\s+/g, '-')}/${product.id}/${product.name.replace(/\s+/g, '-')}`}>
                            <DropdownMenuItem>
                                Edit
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu >
            );
        },
    },
];
