import Form from '@/app/containers/Tambah Produk/form';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';

export default async function Page() {
    const cookiesStore = await cookies();
    const accessToken = cookiesStore.get('accessToken')?.value;
    return (
        <main className='space-y-5'>
            <Button asChild>
                <Link href='/dashboard/produk'>
                    <ChevronLeft /> Kembali
                </Link>
            </Button>
            <Form accessToken={accessToken} />
        </main>
    );
}
