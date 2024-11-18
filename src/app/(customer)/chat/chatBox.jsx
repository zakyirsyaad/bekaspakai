'use client';
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Cookies from "js-cookie";
import DecodeToken from "@/hooks/decode-token";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SERVER_URL = `${process.env.NEXT_PUBLIC_CHAT_URL}`; // Ganti dengan URL server backend Anda
let socket;

export default function chatBox({ accessToken }) {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatText, setChatText] = useState("");
    useEffect(() => {
        // Dapatkan token dari sumber autentikasi
        const fakeToken = accessToken; // Ganti dengan logika autentikasi Anda
        setToken(fakeToken);

        const decoded = DecodeToken(fakeToken);
        setUserId(decoded?.id);
        console.log("User ID:", decoded.id);
        // Hubungkan ke Socket.IO
        socket = io(SERVER_URL, {
            auth: { token: fakeToken },
        });
        console.log(SERVER_URL, { token: fakeToken });

        socket.on("connect", () => {
            console.log("Connected to server");
        });

        socket.on("userInfo", (data) => {
            console.log("User Info:", data);
        });

        socket.on("previousMessages", (data) => {
            setMessages(data);
        });

        socket.on("messageReceived", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const joinRoom = (otherUserId) => {
        socket.emit("joinRoom", { otherUserId });
        socket.on("roomJoined", ({ roomId }) => {
            setRoomId(roomId);
        });
    };

    const sendMessage = () => {
        if (chatText.trim()) {
            socket.emit("sendMessage", { roomId, senderId: userId, chatText });
            setChatText("");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="max-w-xl mx-auto">
                <CardContent>
                    <h1 className="text-xl font-bold mb-4">Chat Room</h1>

                    {!roomId && (
                        <div className="mb-4">
                            <Input
                                placeholder="Enter User ID to chat"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") joinRoom(e.target.value);
                                }}
                            />
                            <Button className="mt-2" onClick={() => joinRoom("12345")}>
                                Join Room
                            </Button>
                        </div>
                    )}

                    {roomId && (
                        <>
                            <ScrollArea className="h-64 mb-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-2 rounded ${message.senderId === userId ? "bg-blue-500 text-white" : "bg-gray-200"
                                            }`}
                                    >
                                        {message.chatText}
                                    </div>
                                ))}
                            </ScrollArea>
                            <div className="flex items-center gap-2">
                                <Input
                                    value={chatText}
                                    placeholder="Type a message"
                                    onChange={(e) => setChatText(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") sendMessage();
                                    }}
                                />
                                <Button onClick={sendMessage}>Send</Button>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
