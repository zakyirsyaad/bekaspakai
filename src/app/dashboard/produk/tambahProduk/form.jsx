import React from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Image from 'next/image';
import { ImagePlus, X } from 'lucide-react';
import SelectJenis from './SelectJenis';
import SelectCategory from './SelectCategory';
import SelectOption from './SelectOption';
import Cookies from 'js-cookie';
import { useToast } from '@/hooks/use-toast';


export default function Form() {
    const [status, setStatus] = React.useState(null);

    const [files, setFiles] = React.useState([null, null, null, null]); // Initialize state with empty slots

    const { toast } = useToast();

    const handleImageChange = (e, index) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles((prevFiles) => {
                const newFiles = [...prevFiles];
                newFiles[index] = file;
                return newFiles;
            });
        }
    };

    const handleRemoveImage = (index) => {
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            newFiles[index] = null; // Clear the file
            return newFiles;
        });
    };


    const addProduct = async () => {
        // console.log("addProduct",
        //     {
        //         condition: formik.values.condition,
        //         garansi: formik.values.garansi,
        //         description: formik.values.description,
        //         price: formik.values.price,
        //         minimumPrice: formik.values.minimumPrice,
        //         weight: formik.values.weight,
        //         volumePanjang: formik.values.volumePanjang,
        //         volumeLebar: formik.values.volumeLebar,
        //         volumeTinggi: formik.values.volumeTinggi,
        //         jenisId: formik.values.jenisId,
        //         categoryProductId: formik.values.categoryProductId,
        //         name: formik.values.name,
        //         files: files
        //     }
        // )

        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i])
        }

        formData.append("condition", formik.values.condition)
        formData.append("garansi", formik.values.garansi)
        formData.append("description", formik.values.description)
        formData.append("price", formik.values.price)
        formData.append("minimumPrice", formik.values.minimumPrice)
        formData.append("weight", formik.values.weight)
        formData.append("volumePanjang", formik.values.volumePanjang)
        formData.append("volumeLebar", formik.values.volumeLebar)
        formData.append("volumeTinggi", formik.values.volumeTinggi)
        formData.append("jenisId", formik.values.jenisId)
        formData.append("categoryProductId", formik.values.categoryProductId)
        formData.append("name", formik.values.name)


        try {
            setStatus('loading')
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: formData
            })

            const result = await response.json()
            setStatus('success')
            toast({
                title: "Produk berhasil ditambahkan",
            })
            history.back()
        }
        catch (error) {
            console.log(error)
        }
    }



    const formik = useFormik({
        initialValues: {
            condition: '',
            garansi: false,
            description: '',
            price: 0,
            minimumPrice: 0,
            negoStatus: false,
            weight: 0,
            volumePanjang: 0,
            volumeLebar: 0,
            volumeTinggi: 0,
            jenisId: '',
            categoryProductId: '',
            name: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            condition: Yup.string().required('Condition is required'),
            description: Yup.string().required('Description is required'),
            price: Yup.number(),
            minimumPrice: Yup.number(),
            negoStatus: Yup.boolean().required('Negotiable is required'),
            weight: Yup.number().required('Weight is required'),
            volumePanjang: Yup.number().required('Panjang is required'),
            volumeLebar: Yup.number().required('Lebar is required'),
            volumeTinggi: Yup.number().required('Tinggi is required'),
            jenisId: Yup.string().required('Jenis is required'),
            categoryProductId: Yup.string().required('Category is required'),
            garansi: Yup.boolean().required('Garansi is required'),
        }),
        onSubmit: addProduct,
    })

    const handleForm = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
    }

    // console.log(formik.values)

    return (
        <form className='space-y-5' onSubmit={formik.handleSubmit}>
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                    >
                        {file ? (
                            <div className="relative w-full h-full">
                                <Image
                                    src={URL.createObjectURL(file)}
                                    alt="Uploaded Image"
                                    className="object-cover w-full h-full rounded-lg"
                                    width={200}
                                    height={200}
                                />
                                <Button
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-2 right-2 px-3 py-1 text-white text-xs rounded-full"
                                    variant="subtle"
                                >
                                    <X strokeWidth={3} />
                                </Button>
                            </div>
                        ) : (
                            <Label className="flex flex-col items-center justify-center w-full h-full">
                                <ImagePlus />
                                <p className="text-sm text-gray-400 mt-2">Click to browse</p>
                                <p className="text-xs text-gray-400">JPG, JPEG, PNG, WEBP</p>
                                <Input
                                    type="file"
                                    name={`file-${index}`}
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/jpg, image/webp"
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                            </Label>
                        )}
                    </div>
                ))}
            </section>
            <section className='grid grid-cols-2 lg:grid-cols-4'>
                <SelectJenis onChange={handleForm} />
            </section>

            <section className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
                <div className='col-span-1 lg:col-span-2 space-y-5'>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Nama Produk"
                        className="w-full"
                        value={formik.values.name}
                        onChange={handleForm}
                    />
                    {formik.errors.name && formik.touched.name && (
                        <p className="text-red-500">{formik.errors.name}</p>
                    )}

                    <SelectCategory onChange={handleForm} />

                    <div className='flex items-center relative'>
                        <Label className='absolute left-3 font-semibold'>Rp</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Harga Produk"
                            className="w-full pl-10"
                            value={formik.values.price}
                            onChange={handleForm}
                            disabled={formik.values.jenisId !== '3f3c9ef1-067f-4137-9deb-5e4ba9b12e5f'}
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
                        onChange={handleForm}
                    />
                    {formik.errors.description && formik.touched.description && (
                        <p className="text-red-500">{formik.errors.description}</p>
                    )}
                </div>

                <div className='col-span-1 space-y-5'>
                    <SelectOption onChange={handleForm} />

                    <div className='flex items-center relative'>
                        <Label className='absolute left-3 font-semibold'>Rp</Label>
                        <Input
                            type="text"
                            name="minimumPrice"
                            placeholder="Minimum Nego"
                            className="w-full pl-10"
                            disabled={!formik.values.negoStatus}
                            value={formik.values.minimumPrice}
                            onChange={handleForm}
                        />
                    </div>

                    <div className='flex items-center relative'>
                        <Input
                            type="text"
                            name="weight"
                            placeholder="Berat Produk"
                            className="w-full"
                            value={formik.values.weight}
                            onChange={handleForm}
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
                            onChange={handleForm}
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
                            onChange={handleForm}
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
                            onChange={handleForm}
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
    )
}
