import PickupRequest from "../Models/PickupSchema.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

export const getAssignedPickups = async (req, res) => {
  const pickups = await PickupRequest.find({
    assignedTo: req.user.id
  })
    .populate("userId", "name email phone")
    .sort({ createdAt: -1 });

  res.json(pickups);
};

export const updatePickupStatus = async (req, res) => {
  const { pickupId } = req.params;
  const { status } = req.body;

  const valid = [
    "assigned",
    "on-the-way",
    "collected",
    "completed"
  ];

  if (!valid.includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const pickup = await PickupRequest.findOne({
    _id: pickupId,
    assignedTo: req.user.id
  });

  if (!pickup)
    return res.status(404).json({ message: "Pickup not found" });

  pickup.status = status;
  await pickup.save();

  res.json({ message: "Status updated", pickup });
};

export const uploadProof = [
  upload.single("proofImage"),
  async (req, res) => {
    const { pickupId } = req.params;

    const pickup = await PickupRequest.findOne({
      _id: pickupId,
      assignedTo: req.user.id
    });

    if (!pickup)
      return res.status(404).json({ message: "Pickup not found" });

    pickup.proofImage = req.file.path;
    await pickup.save();

    res.json({ message: "Proof uploaded" });
  }
];
