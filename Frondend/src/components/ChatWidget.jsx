import React, { useState, useEffect, useRef } from "react";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";
import { sendMessageApi, getMessagesApi } from "../api/messageApi";
import axios from "axios";

const ChatWidget = () => {
    const { user } = useAuth();
    const socket = useSocket();
    const scrollRef = useRef();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [supportId, setSupportId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSupport = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("https://ecocleanbackend-ddn2.onrender.com/api/messages/support", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSupportId(data._id);
            } catch (err) {
                console.error("Failed to find support contact", err);
            }
        };
        fetchSupport();
    }, []);

    useEffect(() => {
        if (!supportId || !isOpen || !user) return;

        socket.emit("join_chat", user._id);

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const { data } = await getMessagesApi(supportId);
                setMessages(data);
            } catch (err) {
                console.error("Failed to load history", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [supportId, isOpen, user, socket]);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive_message", (message) => {
            if (
                (message.senderId === supportId && message.receiverId === user?._id) ||
                (message.senderId === user?._id && message.receiverId === supportId)
            ) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => socket.off("receive_message");
    }, [socket, supportId, user]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !supportId) return;

        const messageData = {
            receiverId: supportId,
            message: newMessage,
        };

        try {
            const { data } = await sendMessageApi(messageData);
            setMessages((prev) => [...prev, data]);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send", err);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-all transform hover:scale-105"
                >
                    <span className="text-2xl">💬</span>
                </button>
            )}

            {isOpen && (
                <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-125">
                    <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">🤖</span>
                            <div>
                                <h3 className="font-bold text-sm">EcoClean Support</h3>
                                <p className="text-xs opacity-80">We reply instantly</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-200 text-xl font-bold px-2"
                        >
                            ×
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3">
                        {loading ? (
                            <p className="text-center text-gray-400 text-xs mt-10">Loading chat...</p>
                        ) : messages.length === 0 ? (
                            <div className="text-center mt-20 opacity-50">
                                <p className="text-4xl mb-2">👋</p>
                                <p className="text-sm">Say hello to support!</p>
                            </div>
                        ) : (
                            messages.map((msg, idx) => {
                                const isMe = msg.senderId === user?._id;
                                return (
                                    <div
                                        key={idx}
                                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe
                                                    ? "bg-emerald-500 text-white rounded-tr-none"
                                                    : "bg-white text-gray-800 border rounded-tl-none"
                                                }`}
                                        >
                                            <p>{msg.message}</p>
                                            <p
                                                className={`text-[10px] mt-1 text-right ${isMe ? "text-emerald-100" : "text-gray-400"
                                                    }`}
                                            >
                                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                        <div ref={scrollRef} />
                    </div>

                    <form onSubmit={handleSend} className="p-3 bg-white border-t flex gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || !supportId}
                            className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5 pl-0.5"
                            >
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;
