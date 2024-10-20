import React from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { Trash, Trash2 } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

function CartProduct() {
    return (
        <div className='col-span-2 space-y-2'>
            <div className='flex items-center justify-between p-5 border rounded'>
                <div className='flex items-center'>
                    <Checkbox />
                    <Label htmlFor='checkbox' className='ml-3'>Pilih Semua</Label>
                </div>
                <Button variant="destructive" className="text-white text-xs">Hapus Semua</Button>
            </div>

            <div className=' col-span-1 flex flex-col gap-5 border rounded p-5'>
                <div className='flex items-center gap-5'>
                    <Checkbox />
                    <div className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='font-medium'>Keshyy</p>
                    </div>

                </div>
                <div className='flex flex-col gap-5'>
                    <div className='flex gap-5'>
                        <Checkbox />
                        <div className='flex gap-2'>
                            <Image src={'https://github.com/shadcn.png'} alt={'Foto Keranjang'} className='rounded w-16 h-16 md:w-20 md:h-20 object-cover' width={100} height={100} />
                            <div className='flex flex-col justify-between items-start'>
                                <div>
                                    <p className='text-sm font-medium text-slate-500 truncate w-40 md:w-full'>MacBook Pro 2019 8/256Gb</p>
                                    <p className='font-semibold'>Rp 0</p>
                                </div>
                                <Button variant="destructive" className="p-3"><Trash2 color='white' /></Button>
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className='flex gap-5'>
                        <Checkbox />
                        <div className='flex gap-2'>
                            <Image src={'https://github.com/shadcn.png'} alt={'Foto Keranjang'} className='rounded w-16 h-16 md:w-20 md:h-20 object-cover' width={100} height={100} />
                            <div className='flex flex-col justify-between items-start'>
                                <div>
                                    <p className='text-sm font-medium text-slate-500 truncate w-40 md:w-full'>MacBook Pro 2019 8/256Gb</p>
                                    <p className='font-semibold'>Rp 0</p>
                                </div>
                                <Button variant="destructive" className="p-3"><Trash2 color='white' /></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct

