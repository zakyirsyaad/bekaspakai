'use client'
import { useEffect, useState } from 'react';
import { MessagesSquare, ShoppingBag, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import UploadButton from '../UploadButton';
import ProfileMenu from '../ProfileMenu';
import AuthButton from '../AuthButton';

async function fetchCartData(accessToken) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/product/keranjang`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        cache: 'no-store'
    });
    const data = await response.json();
    return data.data;
}

function WebMenu({ user, accessToken, isVerified, isPenjual }) {
    const [keranjangCount, setKeranjangCount] = useState(0);

    useEffect(() => {
        if (accessToken) {
            const getCartData = async () => {
                const data = await fetchCartData(accessToken);

                // Safely check if keranjangProductData is an array and not empty
                const totalAvailableProducts = Array.isArray(data?.keranjangProductData) ?
                    data.keranjangProductData.reduce((count, item) => {
                        if (item.products) {
                            // Count only available products
                            const availableCount = item.products.filter(product => product.isAvailable).length;
                            return count + availableCount;
                        }
                        return count;
                    }, 0) : 0;

                setKeranjangCount(totalAvailableProducts);
            };

            // Fetch cart data on initial render
            getCartData();

            // Set interval to update cart data every 3 seconds
            const intervalId = setInterval(() => {
                getCartData();
            }, 3000);

            // Clean up interval on component unmount
            return () => clearInterval(intervalId);
        }
    }, [accessToken]);

    return (
        <nav className='hidden lg:flex items-center gap-5'>
            {accessToken ? (
                <>
                    <Link href={'/transaksi'}>
                        <ShoppingBag className='w-6 h-6 2xl:w-7 2xl:h-7' />
                    </Link>
                    <Link href={'/keranjang'} className='relative'>
                        <ShoppingCart className='w-6 h-6 2xl:w-7 2xl:h-7' />
                        <span className='absolute -top-1 -right-1 bg-secondary font-semibold w-4 h-4 flex items-center justify-center rounded-full text-xs'>
                            {keranjangCount}
                        </span>
                    </Link>
                    <Link href={'/chat'}>
                        <MessagesSquare className='w-6 h-6 2xl:w-7 2xl:h-7' />
                    </Link>
                </>
            ) : null}
            <UploadButton accessToken={accessToken} isPenjual={isPenjual} isVerified={isVerified} />
            {accessToken ? <ProfileMenu user={user} /> : <AuthButton />}
        </nav>
    );
}

export default WebMenu;
