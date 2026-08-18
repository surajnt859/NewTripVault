import express from "express";

import {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
  uploadTripPhoto,
} from "../controllers/tripController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create a new trip
router.post("/", protect, createTrip);

router.get("/", protect, getTrips);

router.get("/:id", protect, getTripById);

router.put("/:id", protect, updateTrip);

router.delete("/:id", protect, deleteTrip);

// Week 3: Upload trip photo
router.post(
  "/:id/upload",
  protect,
  upload.single("image"),
  uploadTripPhoto
);

export default router;