'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import SelectCategory from './SelectCategory';
import SelectJenis from './SelectJenis';
import SelectOption from './SelectOption';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';

export default function Page() {
    const [jenisId, setJenisId] = useState("");
    const [categoryProductId, setCategoryProductId] = useState("");
    const [condition, setCondition] = useState("");
    const [garansi, setGaransi] = useState(false);
    const [negoStatus, setNegoStatus] = useState(null);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const { toast } = useToast();

    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageChange = (e, index) => {
        const files = e.target.files;
        if (files && files[0]) {
            const newSelectedImages = [...selectedImages];
            newSelectedImages[index] = files[0];
            setSelectedImages(newSelectedImages);
        }
    };

    const handleRemoveImage = (index) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = undefined; // menggunakan undefined untuk menghapus gambar
        setSelectedImages(newSelectedImages);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            description: '',
            weight: '',
            volumePanjang: '',
            volumeLebar: '',
            volumeTinggi: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Nama Produk wajib di isi"),
            price: Yup.string().required("Harga Produk wajib di isi"),
            description: Yup.string().required("Deskripsi Produk wajib di isi"),
            weight: Yup.string().required("Berat Produk wajib di isi"),
            volumePanjang: Yup.string().required("Panjang Produk wajib di isi"),
            volumeLebar: Yup.string().required("Lebar Produk wajib di isi"),
            volumeTinggi: Yup.string().required("Tinggi Produk wajib di isi"),
        }),
        onSubmit: async (values) => {
            setStatus("loading");
            setError(null);

            const accessToken = Cookies.get('accessToken');
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('description', values.description);
            formData.append('weight', values.weight);
            formData.append('volumePanjang', values.volumePanjang);
            formData.append('volumeLebar', values.volumeLebar);
            formData.append('volumeTinggi', values.volumeTinggi);
            formData.append('categoryProductId', categoryProductId);
            formData.append('jenisId', jenisId);
            formData.append('condition', condition);
            formData.append('garansi', garansi);


            for (let i = 0; i < selectedImages.length; i++) {
                formData.append("files", selectedImages[i])
            }

            // console.log(formData.getAll('files'));
            // console.log(formData.getAll('name'));
            // console.log(formData.getAll('price'));
            // console.log(formData.getAll('description'));
            // console.log(formData.getAll('weight'));
            // console.log(formData.getAll('volumePanjang'));
            // console.log(formData.getAll('volumeLebar'));
            // console.log(formData.getAll('volumeTinggi'));
            // console.log(formData.getAll('categoryProductId'));
            // console.log(formData.getAll('jenisId'));
            // console.log(formData.getAll('condition'));
            // console.log(formData.getAll('garansi'));


            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`,
                    },
                    body: formData,
                });
                const result = await response.json();
                if (response.ok) {
                    setStatus("success");
                    toast({
                        title: "Success",
                        description: result.message,
                    })
                    formik.resetForm();
                    window.location.href = "/dashboard/produk";
                } else {
                    setStatus("error");
                    setError(result.message);
                    console.log("Error updating product:", result.message);
                    console.log(result);
                    toast({
                        variant: "destructive",
                        title: "Error",
                        description: result.message || "Terjadi kesalahan pada server",
                    });
                }
            } catch (error) {
                setStatus("error");
                console.log("Error updating product:", error.message);
                setError(error.message);

                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error.message || "Terjadi kesalahan pada server",
                });
            }
        },
    });


    return (
        <form className='space-y-5' onSubmit={formik.handleSubmit}>
            <section className='grid grid-cols-4 gap-5'>
                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                        {selectedImages[index] ? (
                            <div className="relative w-full h-full">
                                <Image src={URL.createObjectURL(selectedImages[index])} alt="Uploaded Banner" className="object-cover w-full h-full rounded-lg" width={200} height={200} />
                                <Button onClick={() => handleRemoveImage(index)} className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full" variant="subtle"><X strokeWidth={3} /></Button>
                            </div>
                        ) : (
                            <Label className="flex flex-col items-center justify-center w-full h-full">
                                <ImagePlus />
                                <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                                <Input type="file" name="files" className="hidden" onChange={(e) => handleImageChange(e, index)} />
                            </Label>
                        )}
                    </div>
                ))}
            </section>
            <section>
                <SelectJenis onSelectChange={setJenisId} />
            </section>

            <section className='grid grid-cols-3 gap-5'>
                <div className='col-span-2 space-y-5'>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nama Produk"
                        className="w-full"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-500">{formik.errors.name}</p>
                    )}

                    <SelectCategory onSelectChange={setCategoryProductId} />

                    <div className='flex items-center relative'>
                        <Label className='absolute left-3 font-semibold'>Rp</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Harga Produk"
                            className="w-full pl-10"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                    </div>
                    {formik.errors.price && formik.touched.price && (
                        <p className="text-red-500">{formik.errors.price}</p>
                    )}

                    <Textarea
                        name="description"
                        placeholder="Deskripsi Produk"
                        rows={12}
                        className="w-full"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    {formik.errors.description && formik.touched.description && (
                        <p className="text-red-500">{formik.errors.description}</p>
                    )}
                </div>

                <div className='col-span-1 space-y-5'>
                    <SelectOption onConditionChange={setCondition} onGaransiChange={setGaransi} onNegoChange={setNegoStatus} />

                    <div className='flex items-center relative'>
                        <Label className='absolute left-3 font-semibold'>Rp</Label>
                        <Input
                            type="text"
                            name="minimumNego"
                            placeholder="Minimum Nego"
                            className="w-full pl-10"
                            disabled={!negoStatus}
                        />
                    </div>

                    <div className='flex items-center relative'>
                        <Input
                            type="text"
                            name="weight"
                            placeholder="Berat Produk"
                            className="w-full"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                        />
                        <Label className="bg-black dark:bg-white text-primary-foreground flex items-center justify-center ml-2 p-3 w-16 absolute right-0 rounded">
                            gr
                        </Label>
                    </div>
                    {formik.errors.weight && formik.touched.weight && (
                        <p className="text-red-500">{formik.errors.weight}</p>
                    )}

                    <div className='flex items-center relative'>
                        <Input
                            type="text"
                            name="volumePanjang"
                            placeholder="Panjang Produk"
                            className="w-full"
                            value={formik.values.volumePanjang}
                            onChange={formik.handleChange}
                        />
                        <Label className="bg-black dark:bg-white text-primary-foreground flex items-center justify-center ml-2 p-3 w-16 absolute right-0 rounded">
                            cm
                        </Label>
                    </div>
                    {formik.errors.volumePanjang && formik.touched.volumePanjang && (
                        <p className="text-red-500">{formik.errors.volumePanjang}</p>
                    )}

                    <div className='flex items-center relative'>
                        <Input
                            type="text"
                            name="volumeLebar"
                            placeholder="Lebar Produk"
                            className="w-full"
                            value={formik.values.volumeLebar}
                            onChange={formik.handleChange}
                        />
                        <Label className="bg-black dark:bg-white text-primary-foreground flex items-center justify-center ml-2 p-3 w-16 absolute right-0 rounded">
                            cm
                        </Label>
                    </div>
                    {formik.errors.volumeLebar && formik.touched.volumeLebar && (
                        <p className="text-red-500">{formik.errors.volumeLebar}</p>
                    )}

                    <div className='flex items-center relative'>
                        <Input
                            type="text"
                            name="volumeTinggi"
                            placeholder="Tinggi Produk"
                            className="w-full"
                            value={formik.values.volumeTinggi}
                            onChange={formik.handleChange}
                        />
                        <Label className="bg-black dark:bg-white text-primary-foreground flex items-center justify-center ml-2 p-3 w-16 absolute right-0 rounded">
                            cm
                        </Label>
                    </div>
                    {formik.errors.volumeTinggi && formik.touched.volumeTinggi && (
                        <p className="text-red-500">{formik.errors.volumeTinggi}</p>
                    )}
                </div>
            </section>

            <div className="flex justify-end">
                {status === 'error' && error && (
                    <p className='text-sm text-red-500'>Tambah produk gagal: {error}</p>
                )}
                <Button type="submit" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Menyimpan...' : 'Tambah Produk'}
                </Button>
            </div>
        </form>
    );
}
