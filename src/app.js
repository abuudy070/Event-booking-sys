import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

// corrs
app.use(cors());

// middleware
app.use(express.json());

// routes
app.use("/api/auth", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/bookings", bookingRouter);

// database
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`App runs on port`, port);
  });
});