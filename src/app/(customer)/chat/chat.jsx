// 'use client'
// import { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const useSocket = (token) => {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         if (!token) return;

//         const newSocket = io(process.env.NEXT_PUBLIC_CHAT_URL, {
//             auth: { token },
//         });

//         newSocket.on("connect", () => console.log("Socket connected."));
//         newSocket.on("connect_error", (err) =>
//             console.error("Socket connection error:", err)
//         );

//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, [token]);

//     return socket;
// };

// const Chat = () => {
//     // State to store the messages
//     const [messages, setMessages] = useState([]);
//     // State to store the current message
//     const [currentMessage, setCurrentMessage] = useState('');

//     const [userId, setUserId] = useState(null);
//     const [loadingRooms, setLoadingRooms] = useState(true);

//     const socket = useSocket();

//     useEffect(() => {
//         const decoded = DecodeToken(accessToken);
//         setUserId(decoded?.id);
//     }, [accessToken]);

//     useEffect(() => {
//         // Fetch available rooms
//         // Fetch available rooms
//         const fetchRooms = useCallback(async () => {
//             setLoadingRooms(true);
//             try {
//                 const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_API}/chatrooms`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${accessToken}`,
//                     },
//                     cache: 'no-store',
//                 });
//                 const data = await response.json();
//                 console.log(data);
//                 setRooms(data.data.data); // Adjusted to set the correct `data.data`
//             } catch (error) {
//                 console.error('Error fetching rooms:', error);
//             } finally {
//                 setLoadingRooms(false);
//             }
//         }, [accessToken]);

//         fetchRooms();
//     }, [accessToken]);

//     useEffect(() => {
//         // Create a socket connection
//         const socket = io();

//         // Listen for incoming messages
//         socket.on('previousMessages', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         // Clean up the socket connection on unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const sendMessage = () => {
//         // Send the message to the server
//         socket.emit('message', currentMessage);
//         // Clear the currentMessage state
//         setCurrentMessage('');
//     };

//     return (
//         <div>
//             {/* Display the messages */}
//             {messages.map((message, index) => (
//                 <p key={index}>{message}</p>
//             ))}

//             {/* Input field for sending new messages */}
//             <input
//                 type="text"
//                 value={currentMessage}
//                 onChange={(e) => setCurrentMessage(e.target.value)}
//             />

//             {/* Button to submit the new message */}
//             <button onClick={sendMessage}>Send</button>
//         </div>
//     );
// };

// export default Chat;

import React from 'react'

export default function Chat() {
    return (
        <div>
            <p>Chat</p>
        </div>
    )
}
