import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ImageUp } from 'lucide-react'
import { cookies } from 'next/headers';

function UploadButton() {
    const accessToken = cookies().get('accessToken')?.value;
    return (
        <Button variant="outline" className="w-full " asChild>
            <Link Link href={accessToken ? '/dashboard/produk/tambahProduk' : '/login'} ><ImageUp /> Upload Barang</Link >
        </Button>
    )
}

export default UploadButton
