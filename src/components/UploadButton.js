import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { ImageUp } from 'lucide-react'

function UploadButton({ auth }) {
    return (
        <Button variant="outline" className="w-full " asChild>
            <Link Link href={auth ? '/uploadproduct' : '/login'} ><ImageUp /> Upload Barang</Link >
        </Button>
    )
}

export default UploadButton
