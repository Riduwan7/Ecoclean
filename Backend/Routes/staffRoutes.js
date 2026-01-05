import { Router } from "express";
import { Auth, staffOnly } from "../Middleware/Auth.js";
import { 
  getAssignedPickups,
  updatePickupStatus,
  uploadProof
} from "../Controllers/staffController.js";

const router = Router();

router.use(Auth, staffOnly);

router.get("/pickups", getAssignedPickups);

router.patch("/pickups/:pickupId/status", updatePickupStatus);

router.post("/pickups/:pickupId/proof", uploadProof);

export default router;
