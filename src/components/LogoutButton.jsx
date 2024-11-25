'use client'
import React from 'react'
import Link from 'next/link';

export default function LogoutButton({ children }) {
    const handleLogout = async () => {
        try {
            const res = await fetch('/api/logout', {
                method: 'POST',
            });

            if (res.ok) {
                window.location.href = '/login';
            } else {
                throw new Error('Logout failed');
            }
        } catch (err) {
            setError(err.message);
        }
    };
    return (
        <Link href={'/'} onClick={handleLogout}>{children}</Link>
    )
}
