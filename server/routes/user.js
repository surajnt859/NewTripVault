import express from "express";
import { getPublicProfile } from "../controllers/userController.js";

const router = express.Router();

// Public profile
router.get("/:username/profile", getPublicProfile);

export default router;