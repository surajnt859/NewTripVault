import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: [true, "Trip title is required"],
      trim: true,
    },

    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },

    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },

    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },

    budget: {
      type: Number,
      required: [true, "Budget is required"],
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    // Week 3: Cloudinary image fields
    coverImage: {
      type: String,
      default: "",
    },

    photos: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;