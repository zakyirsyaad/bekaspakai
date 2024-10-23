'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { ImagePlus, UserPen } from 'lucide-react'
import { Input } from './ui/input'
import { Label } from './ui/label'
import Image from 'next/image'

function EditProfile() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleImageChange2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage2(URL.createObjectURL(e.target.files[0]));
        }
    };
    const handleRemoveImage = () => {
        setSelectedImage(null); // Reset the image
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><UserPen /> <span className='hidden lg:inline'>Edit Profile</span></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Lakukan perubahan pada profil kamu di sini. Klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid grid-cols-2 gap-4">
                    <Label htmlFor="BannerImage">Foto Banner</Label>
                    <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 col-span-2">

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
                            <Label className="flex flex-col items-center justify-center w-full h-full">
                                <ImagePlus />
                                <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP or GIF (MAX. 800x400px)</p>
                                <Input type="file" name="BannerImage" className="hidden" onChange={handleImageChange} />
                            </Label>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor="BannerImage">Foto Profile</Label>
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 col-span-1">

                            {selectedImage2 ? (
                                <div className="relative w-full h-full">
                                    <Image src={selectedImage2} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                                    <Button
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600"
                                    >
                                        Remove
                                    </Button>
                                </div>) : (
                                <Label className="flex flex-col items-center justify-center w-full h-full text-center p-2">
                                    <ImagePlus />
                                    <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                    <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP or GIF (MAX. 400x400px)</p>
                                    <Input type="file" name="BannerImage" className="hidden" onChange={handleImageChange2} />
                                </Label>
                            )}
                        </div>
                    </div>
                    <Input type="text" name="name" placeholder="Nama Lengkap" className="col-span-2" />
                    <Input type="text" name="username" placeholder="Username" className="col-span-2" />
                    <Button type="submit" className="col-span-2 place-self-end">Simpan</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
