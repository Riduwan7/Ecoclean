import mongoose from "mongoose";

export default async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    throw err;
  }
}
