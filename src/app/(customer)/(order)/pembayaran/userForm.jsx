'use client'
import JenisPengiriman from '@/components/jenisPengiriman'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import { useFormik } from 'formik'
import Cookies from 'js-cookie'
import { QRCodeCanvas } from 'qrcode.react'
// import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from 'yup'

function UserForm({ detailProducts, productIds, getCouriers, getPostalCode }) {
    const [status, setStatus] = React.useState(null)
    const [qrString, setQrString] = React.useState(null);
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    const { toast } = useToast();

    const pembayaran = async () => {
        // console.log({
        //     id_barang: productIds,
        //     shipping: {
        //         courierId: formik.values.courierId,
        //     },
        //     buyerData: {
        //         contactName: formik.values.name,
        //         contactPhone: formik.values.phone,
        //         contactEmail: formik.values.email,
        //         address: formik.values.address,
        //         postalCode: formik.values.postcode,
        //         note: formik.values.note
        //     }
        // })

        try {
            setStatus('loading')
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify({
                    id_barang: productIds,
                    shipping: {
                        courierId: formik.values.courierId,
                    },
                    buyerData: {
                        contactName: formik.values.name,
                        contactPhone: formik.values.phone,
                        contactEmail: formik.values.email,
                        address: formik.values.address,
                        postalCode: formik.values.postcode,
                        note: formik.values.note
                    }
                })
            })

            const result = await response.json()
            setStatus('success')
            toast({ title: "Silahkan Melakukan Pembayaran" })
            console.log('Pembayaran:', result)
            if (result.data.product?.qr_string) {
                setQrString(result.data.product.qr_string);
                setIsDialogOpen(true); // Automatically open the dialog
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            email: '',
            address: '',
            postcode: 0,
            note: '',
            courierId: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nama Lengkap wajib di isi'),
            phone: Yup.string().required('Nomor Handphone wajib di isi'),
            email: Yup.string().email('Email tidak valid').required('Email wajib di isi'),
            address: Yup.string().required('Alamat Lengkap wajib di isi'),
            postcode: Yup.number().required('Kode Pos wajib di isi'),
            note: Yup.string(),
            courierId: Yup.string().required('Jenis Pengiriman wajib di pilih'),
        }),
        onSubmit: pembayaran,
    })

    const handleForm = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
        getPostalCode(formik.values.postcode)
    }

    return (
        <>
            <form className='grid-cols-subgrid col-span-1 space-y-5' onSubmit={formik.handleSubmit}>
                <Input type="text" name="name" placeholder="Nama Lengkap" onChange={handleForm} />
                {formik.touched.name && formik.errors.name && <p className='text-red-500 text-sm'>{formik.errors.name}</p>}
                <Input type="text" name="phone" placeholder="Nomor Handphone Aktif" onChange={handleForm} />
                {formik.touched.phone && formik.errors.phone && <p className='text-red-500 text-sm'>{formik.errors.phone}</p>}


                <Input type="text" name="email" placeholder="Email Aktif" onChange={handleForm} />
                {formik.touched.email && formik.errors.email && <p className='text-red-500 text-sm'>{formik.errors.email}</p>}

                <Textarea name="address" placeholder="Alamat Lengkap" onChange={handleForm} />
                {formik.touched.address && formik.errors.address && <p className='text-red-500 text-sm'>{formik.errors.address}</p>}

                <div className='grid grid-cols-2 2xl:grid-cols-3 gap-5 items-start '>
                    <Input type="text" name="postcode" placeholder="Kode Pos" onChange={handleForm} />
                    {formik.touched.postcode && formik.errors.postcode && <p className='text-red-500 text-sm'>{formik.errors.postcode}</p>}

                    <JenisPengiriman onChange={handleForm} penjual={detailProducts[0].penjual} getCouriers={getCouriers} />
                    {formik.touched.courierId && formik.errors.courierId && <p className='text-red-500 text-sm'>{formik.errors.courierId}</p>}
                </div>
                <Input type="text" name="note" placeholder="Catatan untuk kurir" onChange={handleForm} />
                {formik.touched.note && formik.errors.note && <p className='text-red-500 text-sm'>{formik.errors.name}</p>}
                <Button type="submit" className="w-full" disabled={status === 'loading'} >{status === 'loading' ? 'Loading...' : 'Pembayaran'}</Button>
            </form>
            {qrString && (
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>QRIS Code untuk Pembayaran</AlertDialogTitle>
                            <AlertDialogDescription>
                                Scan the QRIS code below to complete your payment.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <div className="flex flex-col items-center gap-5 justify-center p-4">
                            <p className='font-semibold'>Scan QRIS Code</p>
                            <QRCodeCanvas value={qrString} size={150} />
                        </div>
                        <AlertDialogFooter>
                            <AlertDialogCancel
                                onClick={() => {
                                    setIsDialogOpen(false); // Close the dialog
                                    window.location.push = '/transaksi'; // Use router.push for navigation
                                }}
                            >
                                Bayar Nanti
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={() => {
                                setIsDialogOpen(false)
                                window.location.push = '/transaksi';
                            }}>Sudah Bayar</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog >
            )
            }
        </>


    )
}

export default UserForm
