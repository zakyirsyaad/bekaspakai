import React, { Suspense } from 'react';

import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

// const images = [
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2F097ca615-c48f-4402-8b9a-eb4463ffe66c.webp?alt=media&token=c908aa75-6252-477a-9b1c-80502e4cdb0b",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2F2d6feb73-8b05-49cb-a489-651a1866242f.webp?alt=media&token=20089219-ff2b-4f1b-bfc3-2b9761a7574b",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2F95809573-7eaf-4638-84fd-c67c85d989e4.webp?alt=media&token=c465b7a3-f79c-4b3d-92d9-14ee171d5040",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2F963ade83-3afd-43f1-b2dd-fb08019e782a.webp?alt=media&token=b4523768-8c35-468f-a76a-ab51f003ffb6",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2F991c711a-d63a-4e9c-b7be-0ea784e8d27f.webp?alt=media&token=0741b275-0125-4792-b5ff-358078804820",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2Fbf4eee7b-1000-4b8b-ae4c-af04e6d7fa71.webp?alt=media&token=1a4d5426-aed3-47fb-b15a-82e79de24d3c",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2Fcc3e8fa6-677c-4981-b887-3f5e0af15be6.webp?alt=media&token=57a40cf4-0160-4b8e-bf13-f2836269a23f",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2Fd0349a5c-2798-4a90-8cf4-485ff6f9de6a.webp?alt=media&token=9dc8d3cd-3be2-48dd-b6d5-00f1e74d27f1",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2Fd9696901-e106-4fc3-938a-abfbbbdf9bf2.webp?alt=media&token=326c7765-483d-4b92-9ce8-a0d97ad235f6",
//     "https://firebasestorage.googleapis.com/v0/b/jekydatabase.appspot.com/o/kategori%20bekaspakai%2Fe43fcfbe-b848-41d7-a665-ec0873ab749b.webp?alt=media&token=2fc2c625-99ea-4282-a240-e98f96507f01",
// ]

export default async function Kategori() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
    });

    const data = await response.json();
    const kategori = data?.data?.result;

    return (
        <section>
            <h1 className="text-xl font-semibold mb-5">Kategori Bekaspakai</h1>
            <ScrollArea className="w-full rounded-md">
                <div className="flex w-max gap-5 p-4">
                    <Suspense fallback={<Skeleton className="h-[125px] w-full rounded-xl" />}>
                        {kategori.map((item) => {
                            // Dynamically set the image path based on the item's ID
                            const imageUrl = `/Kategori/${item.id}.webp`; // Ensure images are named after their IDs in the public folder
                            return (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-1 w-[150px]"
                                >
                                    <Link href={`/kategori/${item.name.replace(/\s+/g, '-')}`} className='place-items-center text-center'>
                                        {/* <div className="flex flex-col p-6 w-[150px] rounded"> */}
                                        <Image
                                            src={imageUrl}
                                            alt="Foto Kategori bekaspakai.com"
                                            width={125}
                                            height={125}
                                            className="rounded h-[125px] object-cover"
                                            priority={true}
                                        />
                                        <h2 className="text-sm mt-2">{item.name}</h2>
                                        {/* </div> */}
                                    </Link>
                                </div>
                            );
                        })}
                    </Suspense>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea >
        </section>
    );
}
