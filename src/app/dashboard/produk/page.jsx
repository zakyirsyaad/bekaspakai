import Table from '@/app/containers/Dashboard/produk/Table'
import { cookies } from 'next/headers';
import React from 'react'

export default async function page() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value
    return <Table accessToken={accessToken} />
}
