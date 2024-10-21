import Ekspedisi from '@/components/jenisPengiriman'
import { ListEkspedisi } from '@/components/listEkspedisi'
import { SearchArea } from '@/components/SearchArea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea"
import React from 'react'

function UserForm() {
    return (
        <form className='col-span-1 space-y-5'>
            <Input type="text" name="name" placeholder="Nama Lengkap" />
            <Input type="tel" name="phone" placeholder="Nomor Handphone Aktif" />
            <Textarea name="address" placeholder="Alamat Lengkap" />
            <SearchArea />
            <div className='grid grid-cols-2 2xl:grid-cols-3 gap-5 items-start '>
                <Input type="text" name="postcode" placeholder="Kode Pos" />
                <Ekspedisi />
                <ListEkspedisi />
            </div>
            <Input type="text" name="note" placeholder="Catatan untuk kurir (opsional)" />
            <Button type="submit" className="w-full">Lanjutkan Pembayaran</Button>
        </form>
    )
}

export default UserForm
