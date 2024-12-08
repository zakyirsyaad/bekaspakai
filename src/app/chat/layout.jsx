import React from 'react'
import ChatMenu from '../containers/chat/ChatMenu'
import { cookies } from 'next/headers';

export default async function layout({ children }) {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value
    return (
        <main className='grid grid-cols-12'>
            <ChatMenu accessToken={accessToken} />
            {children}
        </main>
    )
}
