'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect } from 'react';

export default function AddImage({ onImagesChange }) {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [selectedImage2, setSelectedImage2] = React.useState(null);
    const [selectedImage3, setSelectedImage3] = React.useState(null);
    const [selectedImage4, setSelectedImage4] = React.useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleImageChange2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage2(e.target.files[0]);
        }
    };

    const handleImageChange3 = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage3(e.target.files[0]);
        }
    };

    const handleImageChange4 = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage4(e.target.files[0]);
        }
    };

    const handleRemoveImage = () => setSelectedImage(null);
    const handleRemoveImage2 = () => setSelectedImage2(null);
    const handleRemoveImage3 = () => setSelectedImage3(null);
    const handleRemoveImage4 = () => setSelectedImage4(null);

    // useEffect untuk mengirim array gambar yang tidak null ke parent
    useEffect(() => {
        const selectedImagesArray = [selectedImage, selectedImage2, selectedImage3, selectedImage4].filter(files => files !== null);
        onImagesChange(selectedImagesArray); // Kirim hanya gambar yang dipilih ke parent
    }, [selectedImage, selectedImage2, selectedImage3, selectedImage4]); // Hanya memasukkan gambar sebagai dependensi


    return (
        <>
            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                {selectedImage ? (
                    <div className="relative w-full h-full">
                        <Image src={URL.createObjectURL(selectedImage)} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                        <Button onClick={handleRemoveImage} className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                    </div>
                ) : (
                    <Label className="flex flex-col items-center justify-center w-full h-full">
                        <ImagePlus />
                        <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                        <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                        <Input type="file" name="files" className="hidden" onChange={handleImageChange} />
                    </Label>
                )}
            </div>

            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                {selectedImage2 ? (
                    <div className="relative w-full h-full">
                        <Image src={URL.createObjectURL(selectedImage2)} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                        <Button onClick={handleRemoveImage2} className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                    </div>
                ) : (
                    <Label className="flex flex-col items-center justify-center w-full h-full">
                        <ImagePlus />
                        <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                        <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                        <Input type="file" name="files" className="hidden" onChange={handleImageChange2} />
                    </Label>
                )}
            </div>

            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                {selectedImage3 ? (
                    <div className="relative w-full h-full">
                        <Image src={URL.createObjectURL(selectedImage3)} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                        <Button onClick={handleRemoveImage3} className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                    </div>
                ) : (
                    <Label className="flex flex-col items-center justify-center w-full h-full">
                        <ImagePlus />
                        <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                        <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                        <Input type="file" name="files" className="hidden" onChange={handleImageChange3} />
                    </Label>
                )}
            </div>

            <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                {selectedImage4 ? (
                    <div className="relative w-full h-full">
                        <Image src={URL.createObjectURL(selectedImage4)} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                        <Button onClick={handleRemoveImage4} className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                    </div>
                ) : (
                    <Label className="flex flex-col items-center justify-center w-full h-full">
                        <ImagePlus />
                        <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                        <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                        <Input type="file" name="files" className="hidden" onChange={handleImageChange4} />
                    </Label>
                )}
            </div>
        </>
    );
}
