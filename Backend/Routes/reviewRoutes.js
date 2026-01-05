import { Router } from "express";
import { Auth,isAdmin } from "../Middleware/Auth.js";
import * as rh from "../Controllers/reviewController.js"

const router = Router()

router.post("/", Auth, rh.createReview);
router.get("/my", Auth, rh.getMyReview);

router.get("/", rh.getAllReviews);
router.get("/average", rh.getAverageRating);

export default router;

