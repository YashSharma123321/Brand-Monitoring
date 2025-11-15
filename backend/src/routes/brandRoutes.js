import express from "express";
import { addBrand, getMentions } from "../controllers/brandController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a brand (protected)
router.post("/add", protect, addBrand);

// Get mentions for a brand (protected)
router.get("/:brandId/mentions", protect, getMentions);

export default router;
