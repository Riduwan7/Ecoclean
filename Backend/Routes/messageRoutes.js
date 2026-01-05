import { Router } from "express";
import { sendMessage, getMessages, getSupportContact, getConversations } from "../Controllers/messageController.js";
import { Auth, isAdmin } from "../Middleware/Auth.js";

const router = Router();

router.get("/conversations", Auth, isAdmin, getConversations);
router.get("/support", Auth, getSupportContact);
router.post("/send", Auth, sendMessage);
router.get("/:userId", Auth, getMessages);

export default router;
