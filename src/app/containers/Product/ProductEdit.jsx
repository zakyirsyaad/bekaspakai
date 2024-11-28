'use client'
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2 } from 'lucide-react';

export default function ProductEdit({ detailProducts, accessToken }) {
    const [status, setStatus] = React.useState(null);
    const { toast } = useToast();
    const jenisId = detailProducts.JenisProduct.name === 'Jual Beli';

    async function editProduk(values) {
        try {
            setStatus('loading');
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/products/edit/${detailProducts.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify(values),
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
            toast({ title: 'Terjadi kesalahan, silakan coba lagi.', className: 'bg-destructive text-white' });
            console.log('Terjadi kesalahan:', error);
        }
    }

    const formik = useFormik({
        initialValues: {
            name: detailProducts.name || '',
            description: detailProducts.description || '',
            price: detailProducts.price || '',
            discount: detailProducts.discount || '0',
            garansi: detailProducts.garansi || false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nama produk diperlukan'),
            description: Yup.string().required('Deskripsi produk diperlukan'),
            price: Yup.number().required('Harga produk diperlukan').positive('Harga harus lebih besar dari 0'),
            discount: Yup.number().positive('Diskon harus lebih besar dari 0').max(100, 'Diskon tidak boleh lebih dari 100%'),
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
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name ? <div className="text-destructive">{formik.errors.name}</div> : null}
                    </div>
                    <div>
                        <Label>Deskripsi Produk</Label>
                        <Textarea
                            name="description"
                            placeholder="Deskripsi Produk"
                            className="w-full"
                            rows={5}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.description && formik.errors.description ? <div className="text-destructive">{formik.errors.description}</div> : null}
                    </div>
                    <div>
                        <Label>Harga Produk</Label>
                        <Input
                            type="text"
                            name="price"
                            placeholder="Harga Produk"
                            className="w-full"
                            disabled={!jenisId}
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.price && formik.errors.price ? <div className="text-destructive">{formik.errors.price}</div> : null}
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        <div>
                            <Label>Diskon Produk</Label>
                            <div className='flex items-center relative'>
                                <Input
                                    type="text"
                                    name="discount"
                                    placeholder="Diskon Produk"
                                    disabled={!jenisId}
                                    value={formik.values.discount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <Label className='absolute -right-1 rounded bg-secondary text-secondary-foreground  p-[12px] w-10 text-center'>%</Label>
                            </div>
                            {formik.touched.discount && formik.errors.discount ? <div className="text-destructive italic text-sm">{formik.errors.discount}</div> : null}
                        </div>
                        <Select onValueChange={value => formik.setFieldValue('garansi', value)}>
                            <SelectTrigger className="self-end">
                                <SelectValue placeholder={formik.values.garansi ? 'Garansi' : 'Tidak Garansi'} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="true">Garansi</SelectItem>
                                <SelectItem value="false">Tidak Garansi</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className='self-end' disabled={status === 'loading'}>
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Simpan'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
