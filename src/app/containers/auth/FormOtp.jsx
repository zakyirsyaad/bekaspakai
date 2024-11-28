'use client'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function FormOtp({ accessToken }) {
    const [status, setStatus] = React.useState(null)
    const [error, setError] = React.useState(null)
    const { toast } = useToast()

    const router = useRouter()

    const SendOtp = async (values) => {
        setStatus('loading')
        setError(null)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                // Send the OTP as an integer
                body: JSON.stringify({ otp: parseInt(values) }), // Convert to integer
            });

            const result = await response.json();
            console.log("Response:", result); // Log the response from the server

            if (response.ok) {
                setStatus('success');
                toast({
                    title: 'Verifikasi Berhasil, silahkan login ulang.',
                    description: result.message,
                    variant: 'success',
                })
                window.location.href = '/login';
            } else {
                setStatus('error');
                setError(result.message || 'Terjadi kesalahan saat mengirim otp');
            }
        } catch (err) {
            setStatus('error');
            setError('Terjadi kesalahan saat menghubungkan ke server');
            console.error("Error:", err); // Log the error for debugging
        }
    }

    const formik = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: Yup.object({
            otp: Yup.string()
                .required('OTP is required')
                .matches(/^\d+$/, 'OTP must contain only digits')
                .max(6, 'OTP cannot exceed 6 digits')
        }),
        onSubmit: (values) => {
            console.log("Form submitted with values:", values); // Log form submission
            SendOtp(values.otp); // Ensure you're sending the OTP string
        }
    });

    const ReSendOtp = async () => {
        setStatus('loading')
        setError(null)
        // const accessToken = Cookies.get('accessToken')
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/auth/send-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('success');
                toast({
                    title: 'OTP berhasil dikirim ulang',
                    description: result.message,
                    variant: 'success',
                })
            } else {
                setStatus('error');
                setError(result.message || 'Terjadi kesalahan saat mengirim otp');
            }
        } catch (err) {
            setStatus('error');
            setError('Terjadi kesalahan saat menghubungkan ke server');
        }
    }

    return (
        <form onSubmit={formik.handleSubmit} className='space-y-4'>
            <div className='flex gap-2'>
                <Input
                    type="text"
                    name="otp"
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Masukan OTP"
                    className='w-1/2'
                    maxLength={6} // Membatasi panjang input menjadi maksimal 6 karakter
                    onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, ''); // Hanya memperbolehkan angka
                    }}
                />
                {status === 'error' && error && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={ReSendOtp}
                    >
                        Kirim Ulang
                    </Button>
                )}
            </div>
            <p className='text-sm text-red-500'>{formik.errors.otp}</p>
            {status === 'error' && error && (
                <p className='text-sm text-red-500'>Verfikasi gagal: {error}</p>
            )}

            <Button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? 'Verifikasi...' : 'Verifikasi'}
            </Button>
        </form>
    )
}