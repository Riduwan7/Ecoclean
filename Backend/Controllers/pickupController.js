import PickupRequest from "../Models/PickupSchema.js";
import User from "../Models/UserSchema.js";

export const createPickup = async (req, res) => {
  try {
    if (!req.user?.id)
      return res.status(401).json({ message: "Unauthorized" });

    const { pickupType, wasteItems, address, scheduledDate, notes } = req.body;

    if (!pickupType || !wasteItems || !address || !scheduledDate)
      return res.status(400).json({ message: "Missing required fields" });

    const staff = await User.findOne({ role: "staff", isActive: true });

    if (!staff)
      return res.status(400).json({ message: "No staff available" });

    const pickup = await PickupRequest.create({
      userId: req.user.id,
      pickupType,
      wasteItems,
      address,
      scheduledDate,
      notes,
      assignedTo: staff._id,
      status: "assigned",
    });

    res.status(201).json({
      message: "Pickup created & assigned",
      pickup,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Pickup create error" });
  }
};


export const getUserPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
};


export const getAllPickups = async (req, res) => {
  try {
    const pickups = await PickupRequest.find()
      .populate("userId", "name email phone")
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all pickups" });
  }
};


export const updatePickupStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = [
      "pending",
      "assigned",
      "on-the-way",
      "collected",
      "completed",
      "cancelled",
    ];

    if (!allowed.includes(status))
      return res.status(400).json({ message: "Invalid status" });

    const pickup = await PickupRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!pickup)
      return res.status(404).json({ message: "Pickup not found" });

    // Real-time update
    const io = req.app.get("io");
    io.emit("pickup_updated", {
      pickupId: id,
      status,
      updatedPickup: pickup,
    });

    res.status(200).json({
      message: "Pickup status updated",
      pickup,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating status" });
  }
};


export const deletePickup = async (req, res) => {
  try {
    const { id } = req.params;

    const pickup = await PickupRequest.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!pickup)
      return res
        .status(404)
        .json({ message: "Pickup not found or not authorized" });

    res.status(200).json({
      message: "Pickup deleted",
      pickup,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting pickup" });
  }
};
