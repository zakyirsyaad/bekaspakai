'use client'
import Ekspedisi from '@/components/jenisPengiriman'
import { ListEkspedisi } from '@/components/listEkspedisi'
import { SearchArea } from '@/components/SearchArea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import { useFormik } from 'formik'
// import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from 'yup'

function UserForm() {
    // const router = useRouter()
    const pembayaran = () => {
        alert('Pembayaran Berhasil')
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            phone: '',
            address: '',
            postcode: '',
            note: '',
            courier: '',
            alamat: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Nama Lengkap wajib di isi'),
            phone: Yup.string().required('Nomor Handphone wajib di isi'),
            address: Yup.string().required('Alamat Lurator wajib di isi'),
            postcode: Yup.string().required('Kode Pos wajib di isi'),
            note: Yup.string(),
            courier: Yup.string().required('Jenis Pengiriman wajib di pilih'),
            alamat: Yup.string().required('Alamat wajib di pilih'),
        }),
        onSubmit: pembayaran,
    })

    const handleForm = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
    }

    return (
        <form className='col-span-1 space-y-5' onSubmit={formik.handleSubmit}>
            <Input type="text" name="name" placeholder="Nama Lengkap" onChange={handleForm} />
            <Input type="tel" name="phone" placeholder="Nomor Handphone Aktif" onChange={handleForm} />
            <Textarea name="address" placeholder="Alamat Lengkap" onChange={handleForm} />
            <SearchArea />
            <div className='grid grid-cols-2 2xl:grid-cols-3 gap-5 items-start '>
                <Input type="text" name="postcode" placeholder="Kode Pos" onChange={handleForm} />
                <Ekspedisi onChange={handleForm} />
                <ListEkspedisi onChange={handleForm} />
            </div>
            <Input type="text" name="note" placeholder="Catatan untuk kurir (opsional)" onChange={handleForm} />
            <Button type="submit" className="w-full">Lanjutkan Pembayaran</Button>
        </form>
    )
}

export default UserForm
