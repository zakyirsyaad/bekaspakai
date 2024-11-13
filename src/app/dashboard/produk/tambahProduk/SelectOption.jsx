'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const options = {
    kondisiBarang: [
        { name: "Baru dan Tersegel", value: "Baru dan Tersegel" },
        { name: "Baru Dibuka", value: "Baru Dibuka" },
        { name: "Sekali Pakai", value: "Sekali Pakai" },
        { name: "Jarang Dipakai", value: "Jarang Dipakai" },
        { name: "Pemakaian Rutin", value: "Pemakaian Rutin" },
        { name: "Sesuai Foto", value: "Sesuai Foto" },
    ],
    garansiStatus: [
        { name: "OFF", value: false },
        { name: "ON", value: true },
    ],
    negoStatus: [
        { name: "Nego", value: true },
        { name: "Tidak Nego", value: false },
    ]
};

const SelectList = ({ options, placeholder, onSelect, onChange }) => (
    <Select onChange={onSelect}>
        <SelectTrigger>
            <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
            {options.map((item) => (
                <SelectItem key={item.id || item.name} value={item.name} onClick={() => onSelect(item.value)}>
                    {item.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
);

export default function SelectOption({ onConditionChange, onGaransiChange, onNegoChange }) {

    return (
        <>
            <SelectList options={options.kondisiBarang} placeholder="Pilih Kondisi Barang" onSelect={onConditionChange} />
            <SelectList options={options.garansiStatus} placeholder="Opsi Garansi Barang" onSelect={onGaransiChange} />
            <SelectList options={options.negoStatus} placeholder="Opsi Nego Barang" onSelect={onNegoChange} />
        </>
    );
}

