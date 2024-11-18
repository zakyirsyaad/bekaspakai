'use client';
import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import DecodeToken from "@/hooks/decode-token";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// Custom hook to handle Socket.IO logic
const useSocket = (token) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!token) return;

        const newSocket = io(process.env.NEXT_PUBLIC_CHAT_URL, {
            auth: { token },
        });

        newSocket.on("connect", () => console.log("Socket connected."));
        newSocket.on("connect_error", (err) => console.error("Socket connection error:", err));

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [token]);

    return socket;
};

export default function ChatBox({ accessToken }) {
    const [userId, setUserId] = useState(null);
    const [roomId, setRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatText, setChatText] = useState("");
    console.log(roomId);
    // Decode token and setup userId
    useEffect(() => {
        const decoded = DecodeToken(accessToken);
        setUserId(decoded?.id);
    }, [accessToken]);

    // Initialize socket connection
    const socket = useSocket(accessToken);

    // Listen for socket events
    useEffect(() => {
        if (!socket) return;

        const handlePreviousMessages = (data) => setMessages(data);
        const handleMessageReceived = (message) => setMessages((prev) => [...prev, message]);

        socket.on("previousMessages", handlePreviousMessages);
        socket.on("messageReceived", handleMessageReceived);

        return () => {
            socket.off("previousMessages", handlePreviousMessages);
            socket.off("messageReceived", handleMessageReceived);
        };
    }, [socket]);

    const joinRoom = useCallback((otherUserId) => {
        if (!socket) return;

        socket.emit("joinRoom", { otherUserId });
        socket.on("roomJoined", ({ roomId }) => setRoomId(roomId));
    }, [socket]);

    const sendMessage = useCallback(() => {
        if (!chatText.trim() || !socket || !roomId || !userId) return;

        socket.emit("sendMessage", { roomId, senderId: userId, chatText });
        setChatText("");
    }, [chatText, socket, roomId, userId]);

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
                            <Button className="mt-2" onClick={() => joinRoom(e.target.value)}>
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
                                        className={`mb-2 p-2 rounded ${message.senderId === userId
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200"
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
