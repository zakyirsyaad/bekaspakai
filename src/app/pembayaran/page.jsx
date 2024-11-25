import React from 'react'
import Container from '../containers/Pembayaran/Container'
import { cookies } from 'next/headers'

export default async function page({ searchParams }) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const { id, offer } = await searchParams;
    console.log(id, offer)
    return (
        <main>
            <Container accessToken={accessToken} id={id} offer={offer} />
        </main>
    )
}
