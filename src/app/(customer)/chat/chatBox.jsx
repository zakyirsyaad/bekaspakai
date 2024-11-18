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
    const [messages, setMessages] = useState([]);
    const [chatText, setChatText] = useState("");
    const [rooms, setRooms] = useState([]);
    const [loadingRooms, setLoadingRooms] = useState(true);

    const socket = useSocket(accessToken);

    // Decode token and setup userId
    useEffect(() => {
        const decoded = DecodeToken(accessToken);
        setUserId(decoded?.id);
    }, [accessToken]);

    // Fetch available rooms
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
            setRooms(data.data.data || []); // Adjusted to handle response
        } catch (error) {
            console.error('Error fetching rooms:', error);
        } finally {
            setLoadingRooms(false);
        }
    }, [accessToken]);

    // Listen for socket events
    useEffect(() => {
        if (!socket) return;

        const handlePreviousMessages = (data) => setMessages(data);
        const handleMessageReceived = (message) => setMessages((prev) => [...prev, message]);

        socket.on("previousMessages", handlePreviousMessages);
        socket.on("messageReceived", handleMessageReceived);

        fetchRooms();

        return () => {
            socket.off("previousMessages", handlePreviousMessages);
            socket.off("messageReceived", handleMessageReceived);
        };
    }, [socket, fetchRooms]);

    const joinRoom = useCallback(() => {
        const otherUserId = document.getElementById("otherUserId").value.trim();
        const selectedRoomId = document.getElementById("chatRoomSelect").value;

        const roomData = selectedRoomId || otherUserId;

        if (!roomData) {
            alert("Please enter a User ID or select a chat room.");
            return;
        }

        socket.emit("joinRoom", { otherUserId: roomData });

        socket.once("roomJoined", (userInfo) => {
            console.log("User info received:", userInfo.message);

            if (userInfo.roomId) {
                setRoomId(userInfo.roomId);
                console.log(`Joined room ${userInfo.roomId}`);
            }

            setMessages([]); // Clear previous messages
        });

        socket.once("previousMessages", (messageHistory) => {
            console.log("Previous messages:", messageHistory);
            if (Array.isArray(messageHistory)) {
                setMessages(messageHistory);
            }
        });
    }, [socket]);

    const sendMessage = useCallback(() => {
        if (!chatText.trim() || !roomId) {
            alert("Please enter a message and join a room.");
            return;
        }

        socket.emit("sendMessage", { roomId, senderId: userId, chatText });
        setChatText("");
    }, [chatText, socket, roomId, userId]);

    return (
        <div className="container mx-auto p-4 flex gap-4">
            {/* Sidebar for room list */}
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
                                    className={`p-2 mb-2 rounded cursor-pointer ${roomId === room.id
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200"
                                        }`}
                                    onClick={() => setRoomId(room.id)}
                                >
                                    {userId === room.buyerId
                                        ? room.seller.username
                                        : room.buyer.username}
                                </div>
                            ))
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Main chat area */}
            <Card className="flex-1 h-[80vh]">
                <CardContent className="flex flex-col h-full">
                    <h1 className="text-xl font-bold mb-4">Chat Room</h1>
                    <div className="flex gap-2 mb-4">
                        <Input id="otherUserId" placeholder="Enter User ID" />
                        <select id="chatRoomSelect" className="border p-2 rounded">
                            <option value="">Select Room</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.id}
                                </option>
                            ))}
                        </select>
                        <Button onClick={joinRoom}>Join Room</Button>
                    </div>

                    {!roomId && (
                        <div className="flex-1 flex items-center justify-center">
                            <p>Select a room to start chatting!</p>
                        </div>
                    )}

                    {roomId && (
                        <>
                            <ScrollArea className="flex-1 mb-4">
                                {messages.length === 0 ? (
                                    <p className="text-center text-gray-500">
                                        No messages yet. Start the conversation!
                                    </p>
                                ) : (
                                    messages.map((message, index) => (
                                        <div
                                            key={index}
                                            className={`mb-2 p-2 rounded ${message.senderId === userId
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                                }`}
                                        >
                                            {message.chatText}
                                        </div>
                                    ))
                                )}
                            </ScrollArea>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="messageInput"
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
