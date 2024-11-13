import ReduxProvider from '@/redux/ReduxProvider'
import React from 'react'

export default function layout({ children }) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    )
}
