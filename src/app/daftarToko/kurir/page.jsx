import FormKurir from '@/app/containers/Daftar Toko/FormKurir'
import { cookies } from 'next/headers'
import React from 'react'

export default async function page() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
    return (
        <main>
            <FormKurir accessToken={accessToken} />
        </main>
    )
}
