import mongoose from "mongoose";

const PickupSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    pickupType: {
      type: String,
      enum: ["household", "commercial", "bulk"],
      required: true,
    },

    wasteItems: [
      {
        category: {
          type: String,
          enum: [
            "plastic",
            "non-plastic",
            "ewaste",
            "metal",
            "glass",
            "organic",
            "paper",
            "mixed",
          ],
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    address: {
      type: String,
      required: true,
    },

    scheduledDate: {
      type: Date,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "on-the-way",
        "collected",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    staffNotes: {
      type: String,
      default: "",
    },

    proofImage: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.PickupRequest ||
  mongoose.model("PickupRequest", PickupSchema);
