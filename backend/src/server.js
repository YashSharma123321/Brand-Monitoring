import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import connectDB from "./config/db.js";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 5000;

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/brand", brandRoutes);
connectDB();


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
