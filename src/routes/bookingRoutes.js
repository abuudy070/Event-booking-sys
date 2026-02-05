import express from "express";
import {
  approveBooking,
  cancelBooking,
  createBooking,
  getBookings,
  rejectBooking,
} from "../controllers/bookingController.js";
import { protect, superAdminOnly } from "../middleware/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/", protect, createBooking);
bookingRouter.get("/", protect, getBookings);
bookingRouter.patch("/:id/approve", protect, superAdminOnly, approveBooking);
bookingRouter.patch("/:id/reject", protect, superAdminOnly, rejectBooking);
bookingRouter.patch("/:id/cancel", protect, cancelBooking);

export default bookingRouter;
