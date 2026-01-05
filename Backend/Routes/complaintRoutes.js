import { Router } from "express";
import { Auth,isAdmin } from "../Middleware/Auth.js";
import * as rh from "../Controllers/complaintController.js"

const router = Router()

router.post("/", Auth, rh.createComplaint);       
router.get("/my", Auth, rh.getUserComplaint);    

router.get("/", Auth, isAdmin, rh.getAllComplaint);  
router.patch("/:id", Auth, isAdmin, rh.updateComplaint); 


export default router;