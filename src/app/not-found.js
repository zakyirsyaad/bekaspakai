import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import NavbarMenu from './(customer)/NavbarMenu'

export default function NotFound() {
    return (
        <>
            <NavbarMenu />
            <div className='flex flex-col items-center justify-center h-screen overflow-hidden gap-5'>
                <Image
                    src={'/Black Exclamation Mark Document Icon.H03.2k.png'}
                    width={500}
                    height={500}
                    alt='404 Not Found Bekaspakai.com'
                    priority={true}
                />
                <div className='text-center'>
                    <h1 className='text-2xl font-semibold'>Halaman Tidak Ditemukan</h1>
                    <h2>Tidak dapat menemukan hasil yang diminta</h2>
                </div>
                <Button asChild>
                    <Link href={'/'}>Back to Home</Link>
                </Button>
            </div>
        </>
    )
}