import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import authRoutes from "../routes/authRoutes.js";
import brandRoutes from "../routes/brandRoutes.js";
import "../scheduler.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Server running..."));
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);

export default app;
