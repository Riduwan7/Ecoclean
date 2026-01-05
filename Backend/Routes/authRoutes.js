import { Router } from "express";
import { register, login, getprofile } from "../Controllers/authController.js";
import { Auth } from "../Middleware/Auth.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", Auth, getprofile);

export default router;
