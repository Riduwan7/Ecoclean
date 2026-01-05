import { Router } from "express";
import { createPickup, getUserPickups, deletePickup, updatePickupStatus, getAllPickups } from "../Controllers/pickupController.js";
import { Auth, isAdmin } from "../Middleware/Auth.js";

const router = Router();

router.post("/", Auth, createPickup);
router.get("/my", Auth, getUserPickups);
router.delete("/:id", Auth, deletePickup);

router.get("/admin/all", Auth, isAdmin, getAllPickups);
router.patch("/admin/status/:id", Auth, isAdmin, updatePickupStatus);

export default router;
