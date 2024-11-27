import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Truck } from 'lucide-react';

export default function OrderSummary({ detailProducts, productIds, couriers, destinationPostalCode, accessToken }) {
    const originPostalCode = detailProducts[0].penjual.AuthPenjual.kodePos;

    const [isFetched, setIsFetched] = useState(false); // State untuk menandai jika fetch sudah dilakukan
    const layanan = 5000; // Biaya layanan tetap
    const [pengiriman, setPengiriman] = useState(0); // Inisialisasi dengan 0
    const [shipDuration, setShipDuration] = useState(null);
    const [shipService, setShipService] = useState(null)
    const [status, setStatus] = useState(null)
    const [origin, setOrigin] = useState(null)

    // Total Barang dan Harga
    const totalBarang = detailProducts.length;
    const totalHarga = detailProducts.reduce((sum, product) => sum + product.price, 0);
    const totalPembayaran = totalHarga + pengiriman + layanan;

    useEffect(() => {
        // Cegah fetch jika kode pos tujuan atau kurir belum diisi
        if (!destinationPostalCode || !couriers) {
            setStatus('idle'); // Status idle jika belum memenuhi syarat
            setPengiriman(0); // Reset biaya pengiriman
            setShipService(null); // Reset layanan pengiriman
            setShipDuration(null); // Reset estimasi durasi
            setOrigin(null); // Reset asal pengiriman
            return; // Keluar dari useEffect
        }

        // Buat fungsi fetch dalam timeout untuk debouncing
        const debounceFetch = setTimeout(async () => {
            try {
                setStatus('loading');
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/biteship/ongkir`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        items: productIds,
                        couriers: [couriers],
                        originPostalCode,
                        destinationPostalCode
                    })
                });

                const result = await response.json();
                console.log(result);
                setStatus('success');
                setOrigin(result.data.origin.administrative_division_level_2_name);
                setShipService(result.data.pricing[0].courier_service_name);
                setShipDuration(result.data.pricing[0].shipment_duration_range);
                setPengiriman(result.data.pricing[0].price);
                setIsFetched(true);
            } catch (error) {
                setStatus('error');
                console.error(error);
            }
        }, 500);

        return () => clearTimeout(debounceFetch);
    }, [originPostalCode, destinationPostalCode, JSON.stringify(productIds), JSON.stringify([couriers])]);


    return (
        <div className='col-span-1 border p-5 rounded shadow-lg space-y-10'>
            {detailProducts.map((product) => (
                <div key={product.id} className='space-y-5'>
                    <div className='flex gap-2 items-center'>
                        <Avatar>
                            <AvatarImage src={product.penjual.profile_picture.url} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>{product.penjual.username}</p>
                    </div>
                    <div className='flex items-center gap-5'>
                        <Image
                            src={product.picture[0].url}
                            alt='Foto Keranjang'
                            className='rounded w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 2xl:w-28 2xl:h-28 object-cover'
                            width={100}
                            height={100}
                        />
                        <div className='w-40 md:w-96 lg:w-64 2xl:w-96'>
                            <p className='text-sm md:text-base truncate opacity-50'>{product.name}</p>
                            <p className='text-base md:text-lg font-medium'>Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className='space-y-2'>
                {origin ?
                    <p className='text-sm opacity-50 flex items-center gap-2'><Truck />Barang dikirim dari Kota {origin}</p>
                    : null
                }
                <Separator />
                <div className='flex justify-between'>
                    <p>Total Barang</p>
                    <p className='font-semibold'>{totalBarang} item{totalBarang !== 1 ? 's' : ''}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Pengiriman</p>
                    <div className='text-end'>
                        <p className='font-semibold'>Rp {status === 'loading' ? "loading..." : pengiriman.toLocaleString('id-ID')}</p>
                        {shipService && status !== 'idle' ? <p className='text-sm'>(<span className='font-bold'>{shipService}</span> - Estimasi pengiriman {shipDuration} hari)</p> : null}
                    </div>
                </div>
                <div className='flex justify-between'>
                    <p>Layanan</p>
                    <p className='font-semibold'>Rp {layanan.toLocaleString('id-ID')}</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-bold'>Total Pembayaran</p>
                    <p className='font-bold'>Rp {totalPembayaran.toLocaleString('id-ID')}</p>
                </div>
            </div>

        </div>
    );
}
