import express from "express"
import cors from "cors";
import connection from "./connection.js"
import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./Routes/authRoutes.js"
import pickupRoutes from "./Routes/pickupRoutes.js"
import adminRoutes from "./Routes/adminRoutes.js"
import staffRoutes from "./Routes/staffRoutes.js"
import complaintRoutes from "./Routes/complaintRoutes.js"
import reviewRoutes from "./Routes/reviewRoutes.js"
import messageRoutes from "./Routes/messageRoutes.js"

import dotenv from "dotenv"
dotenv.config()

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }
});

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join_chat", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined chat room`);
  });

  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.set("io", io);

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cors());

app.use(express.json({ limit: "50mb" }))

app.use("/api/auth", authRoutes)
app.use("/api/pickups", pickupRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/staff", staffRoutes)
app.use("/uploads", express.static("uploads"))
app.use("/api/complaints", complaintRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/messages", messageRoutes)

connection()
  .then(() => {
    httpServer.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.error("❌ Server startup failed:", error)
  })
