'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import ReactStars from 'react-stars'
import Image from 'next/image'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ImagePlus } from 'lucide-react'
import { Input } from '@/components/ui/input'


function SelesaikanTransaksi() {
    const [rating, setRating] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
    };

    const valueRating = (newRating) => {
        setRating(newRating);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Selesaikan Transaksi</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Seberapa puas dengan barang anda?</DialogTitle>
                    <DialogDescription>Berikan penilaian untuk barang anda</DialogDescription>
                </DialogHeader>
                <form className='space-y-3'>
                    <ReactStars count={5} size={35} color2={'#4EB3FF'} value={rating} onChange={valueRating} />
                    <Textarea placeholder="Komentar" name="komentar" />
                    {selectedImage ? (
                        <div className="relative w-full h-full">
                            <Image src={selectedImage} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                            <Button
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                            >
                                Remove
                            </Button>
                        </div>
                    ) : (
                        <Label className="flex flex-row items-center gap-3 border p-2 rounded w-fit">
                            <ImagePlus />
                            <p className="text-sm text-gray-400">Tambahkan Foto (JPG, JPEG, PNG)</p>
                            <Input type="file" name="BannerImage" className="hidden" onChange={handleImageChange} />
                        </Label>
                    )}
                    <Button type="submit">Selesaikan</Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default SelesaikanTransaksi
