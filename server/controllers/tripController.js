import Trip from "../models/Trip.js";

export const createTrip = async (req, res) => {
  try {
    const {
      destination,
      startDate,
      endDate,
      budget,
      description,
    } = req.body;

    if (!destination || !startDate || !endDate || !budget) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const trip = await Trip.create({
      user: req.user.id,
      destination,
      startDate,
      endDate,
      budget,
      description,
    });

    res.status(201).json({
      message: "Trip created successfully",
      trip,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Trips fetched successfully",
      trips,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    res.status(200).json({
      message: "Trip fetched successfully",
      trip,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Trip updated successfully",
      trip: updatedTrip,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!trip) {
      return res.status(404).json({
        message: "Trip not found",
      });
    }

    await Trip.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Trip deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};