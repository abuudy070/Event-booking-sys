import express from "express";
import {
  createEvent,
  getEventById,
  getEvents,
  softDeleteEvent,
  updateEvent,
} from "../controllers/eventController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const eventRouter = express.Router();



eventRouter.get("/", protect, getEvents);
eventRouter.get("/:id", protect, getEventById);
eventRouter.post("/", protect, adminOnly, createEvent);
eventRouter.put("/:id", protect, adminOnly, updateEvent);
eventRouter.put("/:id/delete", protect, adminOnly, softDeleteEvent);

export default eventRouter;
