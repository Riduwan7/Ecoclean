import express from "express";
import cors from "cors";
import connection from "./connection.js";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

import authRoutes from "./Routes/authRoutes.js";
import pickupRoutes from "./Routes/pickupRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import staffRoutes from "./Routes/staffRoutes.js";
import complaintRoutes from "./Routes/complaintRoutes.js";
import reviewRoutes from "./Routes/reviewRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";

dotenv.config();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "https://ecocleanfrontend.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "50mb" }));

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`⚡ Socket connected: ${socket.id}`);

  socket.on("join_chat", (userId) => {
    socket.join(userId);
    console.log(`👤 User joined room: ${userId}`);
  });

  socket.on("disconnect", () => {
    console.log("🔥 Socket disconnected");
  });
});

app.set("io", io);

app.use("/api/auth", authRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/complaints", complaintRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5000;

connection()
  .then(() => {
    httpServer.listen(PORT, () => {
      console.log(`🚀 ECOCLEAN Backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Server startup failed:", error);
  });
