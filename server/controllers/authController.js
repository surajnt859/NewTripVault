import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Generate a unique username
const generateUsername = async (name) => {
  let baseUsername = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .substring(0, 15);

  // Fallback if name contains no usable characters
  if (!baseUsername) {
    baseUsername = "user";
  }

  let username;
  let exists = true;

  while (exists) {
    const randomNumber = Math.floor(
      100000 + Math.random() * 900000
    );

    username = `${baseUsername}${randomNumber}`;

    exists = await User.findOne({ username });
  }

  return username;
};


// ===============================
// REGISTER USER
// ===============================

export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER REQUEST BODY:", req.body);

    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Generate username automatically
    const username = await generateUsername(name);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      username,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
    });

    console.log("USER CREATED:", {
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// ===============================
// LOGIN USER
// ===============================

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};