import React, { Suspense } from 'react'
import Search from '../containers/Search/Search'

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Search />
        </Suspense>
    )
}
