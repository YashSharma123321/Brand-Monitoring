import express from "express";
import { signup, login, getMe, updateUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/update", protect, updateUser);

export default router;
