import { Router } from "express";
import { getAllUsers, deleteUser, toggleUserStatus, dashboardStats,assignPickupToStaff } from "../Controllers/adminController.js";
import { Auth, isAdmin } from "../Middleware/Auth.js";

const router = Router();

router.use(Auth, isAdmin);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/toggle/:id", toggleUserStatus);

router.get("/stats", dashboardStats);

router.patch("/assign/:pickupId", assignPickupToStaff);

export default router;
