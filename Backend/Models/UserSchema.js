import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: { 
      type: String, 
      required: true 
    },

    role: {
      type: String,
      enum: ["user", "staff", "admin"],
      default: "user",
      required: true,
    },

    address: { 
      type: String, 
      required: true 
    },

    isActive: { 
      type: Boolean, 
      default: true 
    },

    assignedPickups: [
      { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "PickupRequest" 
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
