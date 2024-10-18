'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function FormLogin() {
    const router = useRouter()
    const loginUser = () => {
        router.push('/')
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username wajib di isi')
                .matches(
                    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})(?!.*[_.]{2})(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                    "Username harus terdiri dari 8-20 karakter, hanya boleh mengandung huruf, angka, underscore, dan titik. Underscore dan titik tidak boleh di awal atau di akhir, tidak boleh bersebelahan, atau digunakan berturut-turut."
                ),
            password: Yup.string().required('Password wajib di isi').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/,
                "Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial"
            ),
        }),
        onSubmit: loginUser,
    })

    const handleForm = (event) => {
        const { target } = event
        formik.setFieldValue(target.name, target.value)
    }

    return (
        <form className='flex flex-col space-y-2 items-start' onSubmit={formik.handleSubmit}>
            <div isInvalid={formik.errors.username} className='w-full'>
                <Label htmlFor="username">Username</Label>
                <Input name="username" type="text" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.username}</p>
            </div>

            <div isInvalid={formik.errors.password} className='w-full'>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.password}</p>
            </div>

            <Button type="submit">Login</Button>
            <p>Belum memliki akun? <Link href={'/register'} className='font-bold underline'>Daftar</Link></p>
        </form>
    )
}

export default FormLogin
