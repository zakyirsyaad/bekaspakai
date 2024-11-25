'use client'
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { BankList } from './BankList';
import { useRouter } from 'next/navigation';

function FormToko({ users, accessToken }) {
    const [postalCode, setPostalCode] = useState('');
    const [kodePos, setKodePos] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSelectDisabled, setIsSelectDisabled] = useState(false);
    const [bankCode, setBankCode] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [nameAccount, setNameAccount] = useState("");
    const [status, setStatus] = useState(null);

    const { toast } = useToast();

    const router = useRouter()

    // Debounced postal code search
    useEffect(() => {
        if (postalCode.trim() === '' || isSelectDisabled) return;

        const fetchPostalCodes = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/biteShip/postal-code?negara=ID&input=${encodeURIComponent(postalCode)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch postal codes');
                }
                const data = await response.json();
                setSuggestions(data.data?.nameCodes || []);
            } catch (error) {
                console.error('Error fetching postal codes:', error);
                toast({
                    title: "Error",
                    description: "Failed to load postal codes",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(fetchPostalCodes, 500);
        return () => clearTimeout(debounceTimer);
    }, [postalCode, isSelectDisabled, toast]);

    const handleSelectSuggestion = (locationWithPostalCode) => {
        setPostalCode(locationWithPostalCode);
        const postalCodeMatch = locationWithPostalCode.match(/\d{5}$/);
        if (postalCodeMatch) {
            setKodePos(postalCodeMatch[0]);
        }
        setIsSelectDisabled(true);
    };

    const handleBankSelect = (selectedBankCode) => {
        setBankCode(selectedBankCode);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!bankCode || !nameAccount || !accountNumber || !postalCode || !kodePos) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields",
                variant: "destructive",
            });
            return;
        }

        try {
            setStatus('loading');
            const storeData = {
                codeBank: bankCode,
                namaRekening: nameAccount,
                nomorRekening: accountNumber,
                alamat: postalCode,
                kodePos: kodePos,
                negara: "Indonesia",
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/upgrade-customer`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
                body: JSON.stringify(storeData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit store data");
            }

            setStatus('success');
            toast({
                title: "Success",
                description: "Store information saved successfully",
            });

            // Redirect to courier selection page
            // removeToken()
            router.push('/daftar-toko/form-kurir');

        } catch (error) {
            setStatus('error');
            toast({
                title: "Error",
                description: error.message || "Failed to save store information",
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
                {/* Store Information */}
                <div>
                    <Label>Nama Toko</Label>
                    <Input
                        placeholder="Nama Toko"
                        value={users?.username || ''}
                        disabled
                    />
                </div>

                {users?.noHandphone ? (
                    <div>
                        <Label>No. Handphone</Label>
                        <Input
                            placeholder="Nomor Telepon"
                            value={users?.noHandphone || ''}
                            disabled
                        />
                    </div>
                ) : null}

                <div>
                    <Label>Email</Label>
                    <Input
                        placeholder="Email"
                        value={users?.email || ''}
                        disabled
                    />
                </div>
                <div>
                    <Label>Negara</Label>
                    <Input
                        placeholder="Negara"
                        value="Indonesia"
                        disabled
                    />
                </div>

                {/* Store Location */}
                <div className="space-y-2">
                    <Label>Lokasi Toko</Label>
                    <Input
                        placeholder="Kecamatan/Kabupaten/Provinsi"
                        value={postalCode}
                        onChange={(e) => {
                            setPostalCode(e.target.value);
                            setIsSelectDisabled(false);
                        }}
                    />
                    <Select
                        disabled={!postalCode || loading || isSelectDisabled}
                        onValueChange={handleSelectSuggestion}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={
                                loading ? 'Loading...' :
                                    isSelectDisabled ? postalCode :
                                        'Pilih Kecamatan/Kabupaten/Provinsi'
                            } />
                        </SelectTrigger>
                        <SelectContent>
                            {suggestions.map((suggestion, index) => (
                                <SelectItem key={index} value={suggestion.name}>
                                    {suggestion.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Bank Account Information */}
                <div className="space-y-2">
                    <Label>Informasi Rekening</Label>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <BankList onSelectBank={handleBankSelect} />
                        <Input
                            placeholder="Nomor Rekening"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                        <Input
                            placeholder="Nama Pemilik Rekening"
                            value={nameAccount}
                            onChange={(e) => setNameAccount(e.target.value)}
                            className="lg:col-span-2"
                        />
                    </div>
                </div>
            </div>

            <Button
                type="submit"
                className="w-full"
                disabled={status === 'loading'}
            >
                {status === 'loading' ? 'Loading...' : 'Simpan Informasi Toko'}
            </Button>
        </form>
    );
}

export default FormToko;