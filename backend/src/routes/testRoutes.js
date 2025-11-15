import express from "express";
const router = express.Router();

// Test Route
router.get("/ping", (req, res) => {
  res.json({ message: "Pong! Backend is working." });
});

export default router;
