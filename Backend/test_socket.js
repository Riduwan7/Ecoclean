import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

console.log("Attempting to connect...");

socket.on("connect", () => {
    console.log("✅ SUCCESS: Connected to Socket.io server!");
    socket.disconnect();
    process.exit(0);
});

socket.on("connect_error", (err) => {
    console.error("❌ ERROR: Connection failed. Server might not be running or updated.", err.message);
    process.exit(1);
});

// Timeout after 5 seconds
setTimeout(() => {
    console.error("❌ ERROR: Connection successfully timed out.");
    process.exit(1);
}, 5000);
