'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

function FormLogin() {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const { toast } = useToast();
    const router = useRouter()
    const loginUser = async (values) => {
        setStatus('loading');
        setError(null);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                toast({
                    title: result.message,
                    description: "Selamat berbelanja :)",
                })
                formik.resetForm();
                router.refresh();
            } else {
                setStatus('error');
                setError(result.message || 'Terjadi kesalahan saat login');
            }
        } catch (err) {
            setStatus('error');
            setError('Terjadi kesalahan saat menghubungkan ke server');
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email wajib di isi').email('Email tidak valid'),
            password: Yup.string().required('Password wajib di isi').matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])(?=.{8,})/,
                "Kata sandi harus ada huruf besar, huruf kecil, angka, dan karakter spesial"
            ),
        }),
        onSubmit: loginUser,
    });

    return (
        <form className='flex flex-col space-y-2 items-start' onSubmit={formik.handleSubmit}>
            <div className='w-full'>
                <Label htmlFor="email">Email</Label>
                <Input
                    name="email"
                    type="text"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <p className='text-sm text-red-500'>{formik.errors.email}</p>
                )}
            </div>

            <div className='w-full'>
                <Label htmlFor="password">Password</Label>
                <Input
                    name="password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                    <p className='text-sm text-red-500'>{formik.errors.password}</p>
                )}
            </div>

            {status === 'error' && error && (
                <p className='text-sm text-red-500'>Login gagal: {error}</p>
            )}

            <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Logging in...' : 'Login'}
            </Button>
            <p>Belum memiliki akun? <Link href={'/register'} className='font-semibold underline' prefetch={false}>Daftar</Link></p>
        </form>
    );
}

export default FormLogin;
