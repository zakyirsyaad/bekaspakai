import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function EditProduk({ detailProducts }) {
    const [status, setStatus] = React.useState(null);
    const { toast } = useToast()
    let jenisId = detailProducts.jenisId !== '5e750872-0978-407c-a1eb-a4e1805ba1bc';

    async function editProduk(values) {
        const accessToken = Cookies.get('accessToken');
        console.log(values);
        try {
            setStatus('loading');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products/edit/${detailProducts.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();
            if (response.ok) {
                toast({ title: data.message });
                setStatus('success');
                window.location.reload();
            } else {
                setStatus('error');
                toast({ title: data.message, className: 'bg-destructive text-white' });
            }
        } catch (error) {
            setStatus('error');
            console.log('Terjadi kesalahan:', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: detailProducts.name || '',
            description: detailProducts.description || '',
            price: detailProducts.price || '',
            discount: detailProducts.discount || '',
            garansi: detailProducts.garansi || false,
        },
        validationSchema: Yup.object({
            name: Yup.string(),
            description: Yup.string(),
            price: Yup.number(),
            discount: Yup.number(),
            garansi: Yup.boolean(),
        }),
        onSubmit: editProduk,
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Produk</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Ubah produk</DialogTitle>
                    <DialogDescription>
                        Lakukan perubahan pada produk kamu di sini. Klik simpan setelah selesai.
                    </DialogDescription>
                </DialogHeader>
                <form className='gap-5 flex flex-col' onSubmit={formik.handleSubmit}>
                    <div>
                        <Label>Nama Produk</Label>
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nama Produk"
                            className="w-full"
                            defaultValue={detailProducts.name}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <Label>Deskripsi Produk</Label>
                        <Textarea
                            type="text"
                            name="description"
                            placeholder="Deskripsi Produk"
                            className="w-full"
                            defaultValue={detailProducts.description}
                            rows={5}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div>
                        <Label>Harga Produk</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Harga Produk"
                            className="w-full"
                            defaultValue={detailProducts.price}
                            disabled={jenisId}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div>
                            <Label>Diskon Produk</Label>
                            <div className='flex items-center relative'>
                                <Input
                                    type="text"
                                    name="discount"
                                    placeholder="Diskon Produk"
                                    defaultValue={detailProducts.discount}
                                    disabled={jenisId}
                                    value={formik.values.discount}
                                    onChange={formik.handleChange}
                                />
                                <Label className='absolute -right-1 rounded bg-foreground p-[12px] w-10 text-center text-secondary'>%</Label>
                            </div>
                        </div>
                        <Select onValueChange={value => formik.setFieldValue('garansi', value)}
                            value={formik.values.garansi}>
                            <SelectTrigger className="self-end">
                                <SelectValue placeholder={detailProducts.garansi || formik.values.garansi ? 'ON' : 'OFF'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Garansi</SelectItem>
                                <SelectItem value="false">Tidak Garansi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className='self-end' disabled={status === 'loading'}>{status === 'loading' ? 'Loading...' : 'Simpan'}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
