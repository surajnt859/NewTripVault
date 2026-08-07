import express from "express";
import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
} from "../controllers/tripController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new trip
router.post("/", protect, createTrip);
router.get("/", protect, getTrips);
router.get("/:id", protect, getTripById);
router.put("/:id", protect, updateTrip);
router.delete("/:id", protect, deleteTrip);

export default router;