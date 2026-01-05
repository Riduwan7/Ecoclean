import User from "../Models/UserSchema.js";
import PickupRequest from "../Models/PickupSchema.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const removed = await User.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted", removed });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.isActive = !user.isActive;
    await user.save();

    res.status(200).json({
      message: user.isActive ? "User activated" : "User blocked",
      user,
    });
  } catch {
    res.status(500).json({ message: "Status update failed" });
  }
};

export const dashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPickups = await PickupRequest.countDocuments();
    const pendingPickups = await PickupRequest.countDocuments({
      status: "pending",
    });
    const completedPickups = await PickupRequest.countDocuments({
      status: "completed",
    });

    res.status(200).json({
      totalUsers,
      totalPickups,
      pendingPickups,
      completedPickups,
    });
  } catch {
    res.status(500).json({ message: "Stats fetch error" });
  }
};

export const assignPickupToStaff = async (req, res) => {
  try {
    const { pickupId } = req.params;
    const { staffId } = req.body;

    if (!staffId) {
      return res.status(400).json({ message: "Staff ID is required" });
    }

    const staff = await User.findById(staffId);

    if (!staff || staff.role !== "staff") {
      return res.status(404).json({ message: "Valid staff not found" });
    }

    const pickup = await PickupRequest.findById(pickupId);

    if (!pickup) {
      return res.status(404).json({ message: "Pickup not found" });
    }

    pickup.assignedTo = staffId;
    pickup.status = "assigned";

    await pickup.save();

    res.status(200).json({
      success: true,
      message: "Pickup assigned successfully",
      pickup,
    });
  } catch (error) {
    console.error("Assign Error:", error);
    res.status(500).json({ message: "Server error assigning pickup" });
  }
};
