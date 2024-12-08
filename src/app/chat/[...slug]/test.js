import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_BASE_URL_API; // URL backend
const AUTH_TOKEN = "YOUR_AUTH_TOKEN"; // Ganti dengan token autentikasi sebenarnya

const ChatApp = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [chatText, setChatText] = useState("");
    const [roomId, setRoomId] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        // Inisialisasi socket
        const newSocket = io(SOCKET_SERVER_URL, {
            auth: { token: AUTH_TOKEN },
            withCredentials: true,
        });

        // Event saat koneksi berhasil
        newSocket.on("connect", () => {
            console.log("Connected to the server");
        });

        // Event menerima informasi user setelah autentikasi
        newSocket.on("userInfo", (data) => {
            console.log("User Info:", data);
            setUserId(data.id);
        });

        // Event menerima pesan sebelumnya
        newSocket.on("previousMessages", (messages) => {
            setMessages(messages);
        });

        // Event menerima pesan baru
        newSocket.on("messageReceived", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        // Cleanup saat komponen unmount
        setSocket(newSocket);
        return () => newSocket.disconnect();
    }, []);

    const joinRoom = (otherUserId) => {
        socket.emit("joinRoom", { otherUserId });
        socket.on("roomJoined", ({ roomId, message }) => {
            console.log(message);
            setRoomId(roomId);
        });
    };

    const sendMessage = () => {
        if (roomId && chatText.trim()) {
            socket.emit("sendMessage", {
                roomId,
                senderId: userId,
                chatText,
            });
            setChatText("");
        }
    };

    return (
        <div>
            <h1>Chat App</h1>
            <div>
                <button onClick={() => joinRoom("OTHER_USER_ID")}>
                    Join Room with Other User
                </button>
            </div>
            <div>
                <h2>Messages</h2>
                <ul>
                    {messages.map((msg, index) => (
                        <li key={index}>
                            <strong>{msg.senderId}:</strong> {msg.chatText}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <input
                    type="text"
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatApp;
