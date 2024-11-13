'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'

function Form_Register() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const router = useRouter();
    const RegisterUser = async (values) => {
        setStatus('loading');
        setError(null);

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const result = await response.json();
            console.log('Registration response:', result); // Log the response for debugging

            if (response.ok) {
                setStatus('success');
                toast({
                    title: result.message,
                    description: "Verifikasi terlebih dahulu yaaa :)",
                });
                formik.resetForm();
                router.push('/otp');
            } else {
                setStatus('error');
                setError(result.message || 'Terjadi kesalahan saat daftar');
            }
        } catch (err) {
            console.error('Error during registration:', err); // Log any errors
            setStatus('error');
            setError('Terjadi kesalahan saat menghubungkan ke server');
        }
    };

    const formik = useFormik({
        initialValues: {
            username: '',
            // namaLengkap: '',
            email: '',
            // noHp: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username wajib di isi')
                .matches(
                    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})(?!.*[_.]{2})(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
                    "Username harus terdiri dari 8-20 karakter, hanya boleh mengandung huruf, angka, underscore, dan titik. Underscore dan titik tidak boleh di awal atau di akhir, tidak boleh bersebelahan, atau digunakan berturut-turut."
                ),
            // namaLengkap: Yup.string().required('Nama Lengkap wajib di isi').matches(
            //     /^[a-zA-Z\s]+$/,
            //     "Nama lengkap hanya boleh mengandung huruf dan spasi, tanpa angka."
            // ),
            email: Yup.string().required('Email wajib di isi').email('Email tidak valid'),
            // noHp: Yup.string().required('No Hp wajib di isi').matches(
            //     /^08[0-9]{8,11}$/,
            //     "Nomor HP harus dimulai dengan 08 dan terdiri dari 10 hingga 13 digit angka."
            // ),
            password: Yup.string().required('Password wajib di isi').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/,
                "Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial"
            ),
        }),
        onSubmit: RegisterUser,
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

            {/* <div isInvalid={formik.errors.namaLengkap} className='w-full'>
                <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                <Input name="namaLengkap" type="text" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.namaLengkap}</p>
            </div> */}

            <div isInvalid={formik.errors.email} className='w-full'>
                <Label htmlFor="email">Email</Label>
                <Input name="email" type="text" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.email}</p>
            </div>

            {/* <div isInvalid={formik.errors.noHp} className='w-full'>
                <Label htmlFor="noHp">Nomor Hp</Label>
                <Input name="noHp" type="text" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.noHp}</p>
            </div> */}

            <div isInvalid={formik.errors.password} className='w-full'>
                <Label htmlFor="password">Password</Label>
                <Input name="password" type="password" onChange={handleForm} />
                <p className='text-sm text-red-500'>{formik.errors.password}</p>
            </div>

            {status === 'error' && error && (
                <p className='text-sm text-red-500'>Login gagal: {error}</p>
            )}

            <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Daftar...' : 'Daftar'}
            </Button>
            <p>sudah memliki akun? <Link href={'/login'} className='font-bold underline'>Login</Link></p>
        </form>
    )
}

export default Form_Register
