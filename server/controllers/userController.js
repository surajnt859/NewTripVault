import User from "../models/User.js";
import Trip from "../models/Trip.js";

// Get public profile
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Find user by username
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("name username bio createdAt");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Get user's trips
    const trips = await Trip.find({
      user: user._id,
    }).select(
      "title destination startDate endDate budget description rating coverImage photos"
    );

    res.status(200).json({
      user,
      trips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Update logged-in user's profile
export const updateProfile = async (req, res) => {
  try {
    const { username, bio } = req.body;

    // Check required username
    if (!username || username.trim().length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    const normalizedUsername = username
      .trim()
      .toLowerCase();

    // Check if username is already used by another user
    const existingUser = await User.findOne({
      username: normalizedUsername,
      _id: { $ne: req.user.id },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    // Find logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Update profile
    user.username = normalizedUsername;
    user.bio = bio ? bio.trim() : "";

    const updatedUser = await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        username: updatedUser.username,
        bio: updatedUser.bio,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};