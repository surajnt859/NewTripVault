import User from "../models/User.js";
import Trip from "../models/Trip.js";

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