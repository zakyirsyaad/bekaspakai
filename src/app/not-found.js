import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <>
            <div className='flex flex-col items-center justify-center overflow-hidden gap-5'>
                <Image
                    src={'/image/Black Exclamation Mark Document Icon.H03.2k.png'}
                    width={400}
                    height={400}
                    alt='Halaman tidak di temukan bekaspakai.com'
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