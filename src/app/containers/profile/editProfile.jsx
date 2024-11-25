'use client'
import React, { useState } from 'react'
import { ImagePlus, UserPen, X } from 'lucide-react'
import Image from 'next/image'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from "@/components/ui/scroll-area"

const genders = ["Laki-laki", "Perempuan"]

function EditProfile({ user, accessToken, jenisKelamin }) {
    console.log(user.jenisKelamin, user.tanggalLahir, jenisKelamin)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImage2, setSelectedImage2] = useState(null)
    const [selectedGender, setSelectedGender] = useState("")
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        bio: "",
        birthdate: "",
        phone: "",
        gender: ""
    })

    const [responseMessage, setResponseMessage] = useState("");
    const handleGenderChange = (gender) => setSelectedGender(gender)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]); // Store the actual file object
        }
    }

    const handleImageChange2 = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage2(e.target.files[0]); // Store the actual file object
        }
    }

    const handleRemoveImage = () => setSelectedImage(null)
    const handleRemoveImage2 = () => setSelectedImage2(null)

    const { toast } = useToast()
    const [status, setStatus] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        if (formData.name) formDataToSend.append("name", formData.name);
        if (formData.username) formDataToSend.append("username", formData.username);
        if (formData.bio) formDataToSend.append("bio", formData.bio);
        if (formData.birthdate) formDataToSend.append("tanggalLahir", formData.birthdate);
        if (formData.phone) formDataToSend.append("noHandphone", formData.phone);
        if (selectedGender) formDataToSend.append("jenisKelamin", selectedGender);

        if (selectedImage) formDataToSend.append("banner_profile_picture", selectedImage);
        if (selectedImage2) formDataToSend.append("profile_picture", selectedImage2);

        try {
            setStatus("loading")
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/users`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formDataToSend
            });

            const result = await response.json();
            if (response.ok) {
                setStatus("success")
                setResponseMessage(result.message);
                toast({
                    title: result.message,
                    description: "Selamat, profil kamu berhasil diubah.",
                    variant: "success"
                })
                window.location.reload()
            } else {
                alert("Failed to update profile: " + result.message);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><UserPen /> <span className='hidden lg:inline'>Edit Profile</span></Button>
            </DialogTrigger>
            <DialogContent>
                <ScrollArea className="w-full h-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Lakukan perubahan pada profil kamu di sini. Klik simpan setelah selesai.
                        </DialogDescription>
                    </DialogHeader>
                    <form className="grid grid-cols-2 gap-3" onSubmit={handleSubmit}>
                        <section className='col-span-2 space-y-3 grid-cols-subgrid'>
                            {/* Banner Image */}
                            <div className='flex flex-col gap-2'>
                                <Label htmlFor="BannerImage">Foto Banner Profile</Label>
                                <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                                    {selectedImage ? (
                                        <div className="relative w-full h-full">
                                            <Image src={URL.createObjectURL(selectedImage)} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                                            <Button onClick={handleRemoveImage} className="absolute top-2 right-2 px-3 py-1  text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                                        </div>
                                    ) : (
                                        <Label className="flex flex-col items-center justify-center w-full h-full">
                                            <ImagePlus />
                                            <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                            <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                                            <Input type="file" name="BannerImage" className="hidden" onChange={handleImageChange} />
                                        </Label>
                                    )}
                                </div>
                            </div>
                            {/* Profile Image */}
                            <div className='flex flex-col gap-2 col-span-1 items-start'>
                                <Label htmlFor="ProfileImage">Foto Profile</Label>
                                <div className="flex flex-col items-center justify-center w-1/3 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                                    {selectedImage2 ? (
                                        <div className="relative w-full h-full">
                                            <Image src={URL.createObjectURL(selectedImage2)} alt="Uploaded Profile" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                                            <Button onClick={handleRemoveImage2} className="absolute top-2 right-2 px-3 py-1  text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                                        </div>
                                    ) : (
                                        <Label className="flex flex-col items-center justify-center w-full h-full">
                                            <ImagePlus />
                                            <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                            <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                                            <Input type="file" name="ProfileImage" className="hidden" onChange={handleImageChange2} />
                                        </Label>
                                    )}
                                </div>
                            </div>
                        </section>
                        {/* Other Input Fields */}
                        <div><Label htmlFor="name">Nama Lengkap</Label><Input type="text" name="name" placeholder={user.name} onChange={handleInputChange} /></div>
                        <div><Label htmlFor="username">Username</Label><Input type="text" name="username" placeholder={user.username} onChange={handleInputChange} /></div>
                        <Textarea name="bio" placeholder={user.bio || "Tulis sesuatu tentang kamu..."} rows={5} className="col-span-2" onChange={handleInputChange} />
                        <div>
                            <Label htmlFor="birthdate">Tanggal Lahir</Label>
                            <Input type="date" name="birthdate" placeholder={user.tanggalLahir} onChange={handleInputChange} />
                        </div>
                        <div><Label htmlFor="phone">Nomor Handphone</Label><Input type="text" name="phone" placeholder={user.noHandphone} onChange={handleInputChange} /></div>
                        <div>
                            <Label htmlFor="Jenis Kelamin">Jenis Kelamin</Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild><Button variant="outline" className="flex justify-start lg:w-full">{selectedGender ? selectedGender : `${user.jenisKelamin || "Pilih Jenis Kelamin"}`}</Button></DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Jenis Kelamin</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {genders.map((gender, index) => (
                                        <DropdownMenuItem key={index} onClick={() => handleGenderChange(gender)}>{gender}</DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <Button type="submit" className="col-span-2 place-self-end" disabled={status === 'loading'}>
                            {status === "loading" ? "Loading..." : "Simpan"}
                        </Button>
                    </form>
                    {responseMessage && (
                        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">
                            <p>{responseMessage}</p>
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
