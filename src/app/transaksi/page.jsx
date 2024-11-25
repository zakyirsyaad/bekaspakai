import React, { Suspense } from 'react'
import TransaksiPage from '../containers/Transaksi/TransaksiPage'

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TransaksiPage />
        </Suspense>
    )
}
