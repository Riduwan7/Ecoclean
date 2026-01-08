import { io } from "socket.io-client";

const SOCKET_URL = "https://ecocleanbackend-ddn2.onrender.com";

console.log("🔌 Attempting to connect to Socket.IO server...");

const socket = io(SOCKET_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("✅ SUCCESS: Connected to Socket.IO server!");
  socket.disconnect();
  process.exit(0);
});

socket.on("connect_error", (err) => {
  console.error("❌ ERROR: Socket connection failed:", err.message);
  process.exit(1);
});

setTimeout(() => {
  console.error("❌ ERROR: Connection timed out");
  process.exit(1);
}, 5000);
