import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ImageUp } from 'lucide-react'

function UploadButton({ accessToken, isPenjual, isVerified }) {
    return (
        <Button variant="outline" className="w-full " asChild>
            <Link Link href={accessToken ? '/dashboard/product' : '/login'} ><ImageUp /> Upload Barang</Link >
        </Button>
    )
}

export default UploadButton
