'use client';
import { useState, useEffect, useCallback, useRef } from "react";
import io from "socket.io-client";
import DecodeToken from "@/hooks/decode-token";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const useSocket = (token) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!token) return;

        const newSocket = io(process.env.NEXT_PUBLIC_CHAT_URL, {
            auth: { token },
        });

        newSocket.on("connect", () => console.log("Socket connected."));
        newSocket.on("connect_error", (err) =>
            console.error("Socket connection error:", err)
        );

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
    const [sendRoomId, setSendRoomId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatText, setChatText] = useState("");
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);
    const chatEndRef = useRef(null); // Ref for auto-scrolling

    const socket = useSocket(accessToken);

    useEffect(() => {
        const decoded = DecodeToken(accessToken);
        setUserId(decoded?.id);
    }, [accessToken]);

    const fetchRooms = useCallback(async () => {
        setLoadingRooms(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/chatrooms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                cache: 'no-store',
            });
            const data = await response.json();
            setRooms(data.data.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoadingRooms(false);
        }
    }, [accessToken]);

    useEffect(() => {
        if (!socket) return;

        const handlePreviousMessages = (data) => {
            setMessages(data);
        };

        const handleMessageReceived = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("previousMessages", handlePreviousMessages);
        socket.on("messageReceived", handleMessageReceived);

        fetchRooms();

        return () => {
            socket.off("previousMessages", handlePreviousMessages);
            socket.off("messageReceived", handleMessageReceived);
        };
    }, [socket, fetchRooms]);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Trigger scroll on new messages

    const joinRoom = useCallback((targetRoomUserId, roomId) => {
        if (!socket || roomId === targetRoomUserId) return;

        setRoomId(targetRoomUserId);
        setMessages([]);
        socket.emit("joinRoom", { otherUserId: targetRoomUserId });
        setSendRoomId(roomId);

        socket.once("roomJoined", ({ roomId: joinedRoomId }) => setRoomId(joinedRoomId));
    }, [socket, roomId]);

    const sendMessage = useCallback(() => {
        if (!chatText.trim() || !socket || !roomId || !userId) return;
        socket.emit("sendMessage", { roomId: sendRoomId, senderId: userId, chatText });
        setChatText("");
    }, [chatText, socket, roomId, userId]);

    return (
        <div className="container mx-auto p-4 flex gap-4">
            <Card className="w-1/4 h-[80vh] overflow-hidden">
                <CardContent className="h-full flex flex-col">
                    <h2 className="text-lg font-bold mb-4">Rooms</h2>
                    <ScrollArea className="flex-1">
                        {loadingRooms ? (
                            <p>Loading rooms...</p>
                        ) : (
                            rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={`p-2 mb-2 rounded cursor-pointer ${roomId === (userId === room.buyerId ? room.sellerId : room.buyerId)
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                        }`}
                                    onClick={() => joinRoom(userId === room.buyerId ? room.sellerId : room.buyerId, room.id)}
                                >
                                    {userId === room.buyerId ? room.seller.username : room.buyer.username}
                                </div>
                            ))
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            <Card className="flex-1 h-[80vh]">
                <CardContent className="flex flex-col h-full">
                    {!roomId && (
                        <div className="flex-1 flex items-center justify-center">
                            <p>Select a room to start chatting!</p>
                        </div>
                    )}

                    {roomId && (
                        <>
                            {rooms.map((room) => (
                                <div key={room.id}>
                                    <p className="border p-3">{userId === room.buyerId ? room.seller.username : room.buyer.username}</p>
                                </div>
                            ))}
                            <ScrollArea className="flex-1 mb-4 p-4 rounded-md">
                                {messages.length === 0 ? (
                                    <p className="text-center text-gray-500">
                                        No messages yet. Start the conversation!
                                    </p>
                                ) : (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-2 flex ${message.senderId === userId ? "justify-end" : "justify-start"}`}
                                        >
                                            <div className={`max-w-xs p-3 rounded-lg text-sm ${message.senderId === userId
                                                ? "bg-blue-500 text-white rounded-tr-none text-end"
                                                : "bg-gray-800 text-gray-300 rounded-tl-none text-start"
                                                }`}
                                            >
                                                <p>
                                                    {message.chatText}
                                                </p>
                                                <p>
                                                    {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                                <div ref={chatEndRef}></div>
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
