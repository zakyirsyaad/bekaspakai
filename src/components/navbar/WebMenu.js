import { MessagesSquare, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import UploadButton from '../UploadButton';
import ProfileMenu from '../ProfileMenu';
import AuthButton from '../AuthButton';
import { cookies } from 'next/headers';
import { ModeToggle } from '@/app/(customer)/ModeToggle';


export default async function WebMenu() {

    const accessToken = cookies().get('accessToken')?.value;

    return (
        <nav className='hidden lg:flex items-center gap-5'>
            {accessToken ? (
                <div className='flex items-center gap-5'>
                    <div>
                        <Link href={'/transaksi'} prefetch={false}>
                            <ShoppingBag className='w-6 h-6 2xl:w-7 2xl:h-7' />
                        </Link>
                    </div>

                    <div>
                        <Link href={'/keranjang'} className='relative' prefetch={false}>
                            <ShoppingCart className='w-6 h-6 2xl:w-7 2xl:h-7' />
                        </Link>
                    </div>

                    <div>
                        <Link href={'/chat'} prefetch={false}>
                            <MessagesSquare className='w-6 h-6 2xl:w-7 2xl:h-7' />
                        </Link>
                    </div>

                </div>
            ) : null}
            <UploadButton />
            {accessToken ? <ProfileMenu /> : <AuthButton />}
            <div>
                <ModeToggle />
            </div>
        </nav>
    );
}