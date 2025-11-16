import express from "express";
import { addBrand, getBrands, getMentions, getAlerts } from "../controllers/brandController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addBrand);
router.get("/", protect, getBrands);
router.get("/:brandId/mentions", protect, getMentions);
router.get("/:brandId/alerts", protect, getAlerts);

export default router;
