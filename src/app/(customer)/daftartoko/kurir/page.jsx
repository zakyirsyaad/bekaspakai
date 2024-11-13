'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
    const [courierOptions, setCourierOptions] = useState([]);
    const [selectedCouriers, setSelectedCouriers] = useState([]);
    const [status, setStatus] = useState(null);
    const { toast } = useToast();
    const accessToken = Cookies.get('accessToken');

    // Fetch courier options from API on mount
    useEffect(() => {
        const fetchCourierOptions = async () => {
            setStatus('loading data');
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/biteShip/kurir`);
                if (!response.ok) {
                    throw new Error('Failed to fetch couriers');
                }
                const data = await response.json();
                setStatus('data success');
                setCourierOptions(data.data?.datakurir || []);
            } catch (error) {
                console.error('Error fetching couriers:', error);
                toast({
                    title: "Error",
                    description: "Failed to load courier options",
                    variant: "destructive",
                });
            }
        };
        fetchCourierOptions();
    }, [toast]);

    const handleCourierSelection = (courier) => {
        setSelectedCouriers((prevSelected) => {
            const exists = prevSelected.some(
                (c) => c.courier_code === courier.courier_code &&
                    c.courier_service_code === courier.courier_service_code
            );

            if (exists) {
                return prevSelected.filter(
                    (c) => !(c.courier_code === courier.courier_code &&
                        c.courier_service_code === courier.courier_service_code)
                );
            }
            return [...prevSelected, courier];
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedCouriers.length === 0) {
            toast({
                title: "Validation Error",
                description: "Please select at least one courier",
                variant: "destructive",
            });
            return;
        }

        try {
            setStatus('loading');

            const courierData = {
                dataKurir: selectedCouriers.map((courier) => ({
                    nameCode: courier.courier_code,
                    serviceNameCode: courier.courier_service_code,
                }))
            };

            console.log('Submitting courier data:', courierData);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/kurir`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                    "Accept": "application/json"
                },
                body: JSON.stringify(courierData),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error('Error Response:', errorData);
                throw new Error(errorData?.message || "Failed to submit courier data");
            }

            setStatus('success');
            toast({
                title: "Success",
                description: "Courier selection saved successfully",
            });
            window.location.href = '/dashboard';
        } catch (error) {
            setStatus('error');
            toast({
                title: "Error",
                description: error.message || "Failed to save courier selection",
                variant: "destructive",
            });
            console.error("Error submitting data:", error);
        } finally {
            setStatus(null);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <div>
                    <Label>Pilih Kurir Pengiriman</Label>
                    <p className='text-xs flex items-center gap-2 opacity-50'>Kurir yang anda pilih tidak dapat diubah kembali</p>
                    {status === 'loading data' ?
                        <div className='space-y-2'>
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-6 w-full" />
                        </div>
                        :
                        <ScrollArea className="h-[300px] rounded-md border p-4 mt-2">
                            <div className="space-y-2">
                                {courierOptions.map((courier, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`courier-${courier.courier_code}-${courier.courier_service_code}`}
                                            checked={selectedCouriers.some(
                                                (c) => c.courier_code === courier.courier_code &&
                                                    c.courier_service_code === courier.courier_service_code
                                            )}
                                            onChange={() => handleCourierSelection(courier)}
                                            className="rounded border-gray-300"
                                        />
                                        <label
                                            htmlFor={`courier-${courier.courier_code}-${courier.courier_service_code}`}
                                            className="text-sm"
                                        >
                                            {courier.courier_name} - {courier.courier_service_name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    }
                </div>
            </div>
            <Button
                type="submit"
                className="w-full"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Loading...' : 'Simpan Pilihan Kurir'}
            </Button>
        </form>
    );
}
