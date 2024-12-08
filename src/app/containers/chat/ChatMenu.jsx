'use client';
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { io } from 'socket.io-client';


export default function ChatMenu({ accessToken }) {
    const [rooms, setRooms] = useState([]);
    const pathname = usePathname();

    const socket = io(process.env.NEXT_PUBLIC_BASE_URL_API, {
        withCredentials: true,
        auth: {
            token: accessToken,
        },
    });


    useEffect(() => {
        // Mendengarkan daftar room dari server
        socket.on('roomList', (roomList) => {
            setRooms(roomList);
        });

        // Request daftar room saat pertama kali terhubung
        socket.emit('getRooms');

        // Cleanup listener saat komponen unmount
        return () => {
            socket.off('roomList');
        };
    }, []);

    console.log(rooms, "rooms");
    console.log(socket, "socket");

    return (
        <aside className="border col-span-3 space-y-5">
            {rooms.length > 0 ? (
                rooms.map((room) => (
                    <div key={room.id}>
                        <Link href={`/chat/${room.id}`}>
                            <div
                                className={
                                    pathname.includes(room.id)
                                        ? 'flex gap-3 items-center bg-primary text-primary-foreground p-2'
                                        : 'flex gap-3 items-center bg-secondary text-secondary-foreground p-2'
                                }
                            >
                                <Avatar>
                                    <AvatarImage src={room.avatar} />
                                    <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1 grid">
                                    <p>{room.name}</p>
                                    <p className="text-xs truncate">{room.lastMessage || "No messages yet."}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-center p-5 font-medium">Tidak ada chat</p>
            )}
        </aside>
    );
}
