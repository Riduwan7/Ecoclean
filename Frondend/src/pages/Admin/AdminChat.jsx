import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import { sendMessageApi, getMessagesApi } from "../../api/messageApi";

const AdminChat = () => {
    const { user } = useAuth();
    const socket = useSocket();
    const scrollRef = useRef();

    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchConversations = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get("https://ecocleanbackend-ddn2.onrender.com/api/messages/conversations", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setConversations(data);
        } catch (err) {
            console.error("Failed to load conversations", err);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    useEffect(() => {
        if (socket && user) {
            socket.emit("join_chat", user._id);
        }
    }, [socket, user]);

    useEffect(() => {
        if (!selectedUser) return;

        const loadMessages = async () => {
            setLoading(true);
            try {
                const { data } = await getMessagesApi(selectedUser._id);
                setMessages(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadMessages();
    }, [selectedUser]);

    useEffect(() => {
        if (!socket) return;

        socket.on("receive_message", (newMessage) => {
            setConversations(prev => {
                const updated = prev.map(conv => {
                    if (conv._id === newMessage.senderId || conv._id === newMessage.receiverId) {
                        return {
                            ...conv,
                            lastMessage: newMessage.message,
                            lastMessageTime: newMessage.createdAt,
                            isRead: false
                        };
                    }
                    return conv;
                });
                return updated.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
            });

            if (selectedUser && (newMessage.senderId === selectedUser._id || newMessage.receiverId === selectedUser._id)) {
                setMessages(prev => [...prev, newMessage]);
            }
        });

        return () => socket.off("receive_message");
    }, [socket, selectedUser]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!reply.trim() || !selectedUser) return;

        const messageData = {
            receiverId: selectedUser._id,
            message: reply
        };

        try {
            const { data } = await sendMessageApi(messageData);
            setMessages(prev => [...prev, data]);
            setReply("");

            setConversations(prev => {
                return prev.map(conv => conv._id === selectedUser._id ? {
                    ...conv,
                    lastMessage: reply,
                    lastMessageTime: new Date()
                } : conv).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
            });

        } catch (err) {
            console.error("Failed to send", err);
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-gray-100">
            <div className={`w-full md:w-1/3 bg-white border-r overflow-y-auto ${selectedUser ? "hidden md:block" : "block"}`}>
                <div className="p-4 border-b bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-700">Messages</h2>
                </div>
                <div>
                    {conversations.map(conv => (
                        <div
                            key={conv._id}
                            onClick={() => setSelectedUser(conv)}
                            className={`p-4 border-b cursor-pointer hover:bg-emerald-50 transition ${selectedUser?._id === conv._id ? "bg-emerald-100" : ""}`}
                        >
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-gray-800">{conv.name}</h3>
                                <span className="text-xs text-gray-500">
                                    {conv.lastMessageTime && new Date(conv.lastMessageTime).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">
                                {conv.lastMessage}
                            </p>
                        </div>
                    ))}
                    {conversations.length === 0 && (
                        <p className="p-6 text-center text-gray-500">No conversations yet.</p>
                    )}
                </div>
            </div>

            <div className={`w-full md:w-2/3 flex-col ${selectedUser ? "flex" : "hidden md:flex"}`}>
                {selectedUser ? (
                    <>
                        <div className="p-4 bg-white border-b shadow-sm flex items-center gap-3">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="md:hidden mr-2 text-gray-500 hover:text-emerald-600"
                            >
                                ← Back
                            </button>
                            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="font-bold">{selectedUser.name}</h2>
                                <p className="text-xs text-gray-500">{selectedUser.email}</p>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => {
                                const isMe = msg.senderId === user._id; // Admin is sender
                                return (
                                    <div key={idx} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                                        <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${isMe ? "bg-emerald-600 text-white rounded-tr-none" : "bg-white text-gray-800 rounded-tl-none border"
                                            }`}>
                                            <p>{msg.message}</p>
                                            <p className={`text-[10px] mt-1 text-right ${isMe ? "text-emerald-100" : "text-gray-400"}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={scrollRef} />
                        </div>

                        <form onSubmit={handleSend} className="p-4 bg-white border-t flex gap-2">
                            <input
                                type="text"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder="Type a reply..."
                                className="flex-1 border rounded-full px-4 py-2 focus:ring-2 focus:ring-emerald-500 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={!reply.trim()}
                                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 disabled:opacity-50"
                            >
                                Send
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400 flex-col">
                        <span className="text-6xl mb-4">💬</span>
                        <p>Select a conversation to start chatting</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChat;
