import express from "express";

import {
  getPublicProfile,
  updateProfile,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public profile
router.get("/:username/profile", getPublicProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateProfile);

export default router;