import Message from "../Models/MessageSchema.js";

export const sendMessage = async (req, res) => {
    try {
        const { receiverId, message } = req.body;
        const senderId = req.user.id;

        if (!receiverId || !message) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        const io = req.app.get("io");
        if (io) {
            io.to(receiverId).emit("receive_message", newMessage);
        }

        const User = (await import("../Models/UserSchema.js")).default;
        const receiver = await User.findById(receiverId);

        if (receiver && receiver.role === "admin") {
            const userMessage = message.toLowerCase();
            let botReplyText = "";

            if (userMessage.includes("hello") || userMessage.includes("hi")) {
                botReplyText = "Hello! 👋 How can we help you with your waste pickup today?";
            } else if (userMessage.includes("help")) {
                botReplyText = "Sure! You can request a pickup, check your status, or contact us here.";
            } else if (userMessage.includes("status")) {
                botReplyText = "You can check your Pickup Status in the 'My Pickups' section of your dashboard.";
            } else if (userMessage.includes("thank")) {
                botReplyText = "You're welcome! Let us know if you need anything else. ♻️";
            } else {
                botReplyText = "Thanks for reaching out! A staff member will review your message shortly.";
            }

            setTimeout(async () => {
                try {
                    const botReply = await Message.create({
                        senderId: receiverId,
                        receiverId: senderId,
                        message: botReplyText,
                    });

                    if (io) {
                        io.to(senderId).emit("receive_message", botReply);
                    }
                } catch (err) {
                    console.error("Auto-reply failed", err);
                }
            }, 1000);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending message" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { userId } = req.params;
        const myId = req.user.id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userId },
                { senderId: userId, receiverId: myId },
            ],
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages" });
    }
};

export const getSupportContact = async (req, res) => {
    try {
        const User = (await import("../Models/UserSchema.js")).default;
        const admin = await User.findOne({ role: "admin" });

        if (!admin) {
            return res.status(404).json({ message: "No support available" });
        }

        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Error fetching support contact" });
    }
};

export const getConversations = async (req, res) => {
    try {
        const adminId = req.user.id;

        const messages = await Message.find({
            $or: [{ receiverId: adminId }, { senderId: adminId }]
        }).sort({ createdAt: -1 });

        const userIds = new Set();
        messages.forEach(msg => {
            if (msg.senderId.toString() !== adminId) userIds.add(msg.senderId.toString());
            if (msg.receiverId.toString() !== adminId) userIds.add(msg.receiverId.toString());
        });

        const User = (await import("../Models/UserSchema.js")).default;
        const users = await User.find({ _id: { $in: Array.from(userIds) } }).select("name email");

        const conversations = users.map(user => {
            const lastMsg = messages.find(m =>
                (m.senderId.toString() === user._id.toString()) ||
                (m.receiverId.toString() === user._id.toString())
            );
            return {
                ...user.toObject(),
                lastMessage: lastMsg ? lastMsg.message : "",
                lastMessageTime: lastMsg ? lastMsg.createdAt : null,
                isRead: lastMsg ? (lastMsg.senderId.toString() === adminId || lastMsg.isRead) : true
            };
        });

        conversations.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching conversations" });
    }
};
