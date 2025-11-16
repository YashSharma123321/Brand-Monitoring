import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import "./scheduler.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());

app.get("/", (req, res) => res.send("Server running..."));
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
