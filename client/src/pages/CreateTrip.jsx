import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import Navbar from "../components/Navbar";

const CreateTrip = () => {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    startDate: "",
    endDate: "",
    budget: "",
    description: "",
    rating: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      setPreview("");
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // 1. Create the trip first
      const response = await api.post("/trips", trip);

      const createdTrip = response.data.trip;

      // 2. Upload the selected image
      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        await api.post(
          `/trips/${createdTrip._id}/upload`,
          formData
        );
      }

      toast.success("Trip created successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Create trip error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create trip"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container py-5 flex-grow-1 d-flex justify-content-center align-items-start">
        <div
          className="glass-card p-4 p-md-5 w-100 animate-fade-in"
          style={{ maxWidth: "680px" }}
        >
          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
            <div>
              <h1
                className="h3 fw-bold text-heading mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                Create New Trip
              </h1>

              <p className="text-visible-muted small mb-0">
                Fill in details to plan your upcoming
                adventure
              </p>
            </div>

            <Link
              to="/dashboard"
              className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
            >
              ← Dashboard
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Trip Title */}
            <div className="custom-input-group">
              <label className="custom-label">
                Trip Title
              </label>

              <input
                type="text"
                name="title"
                placeholder="e.g. Summer Vacation in Paris"
                value={trip.title}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>

            {/* Destination */}
            <div className="custom-input-group">
              <label className="custom-label">
                Destination
              </label>

              <input
                type="text"
                name="destination"
                placeholder="e.g. Paris, France or Bali, Indonesia"
                value={trip.destination}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>

            {/* Dates */}
            <div className="row g-3">
              <div className="col-md-6">
                <div className="custom-input-group">
                  <label className="custom-label">
                    Start Date
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={trip.startDate}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="custom-input-group">
                  <label className="custom-label">
                    End Date
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={trip.endDate}
                    onChange={handleChange}
                    className="custom-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="custom-input-group">
              <label className="custom-label">
                Budget (INR ₹)
              </label>

              <input
                type="number"
                name="budget"
                placeholder="e.g. 50000"
                value={trip.budget}
                onChange={handleChange}
                className="custom-input"
                required
              />
            </div>

            {/* Rating */}
            <div className="custom-input-group">
              <label className="custom-label">
                Rating
              </label>

              <select
                name="rating"
                value={trip.rating}
                onChange={handleChange}
                className="custom-input"
                required
              >
                <option value="">
                  Select a rating
                </option>

                <option value="1">
                  1 ⭐
                </option>

                <option value="2">
                  2 ⭐⭐
                </option>

                <option value="3">
                  3 ⭐⭐⭐
                </option>

                <option value="4">
                  4 ⭐⭐⭐⭐
                </option>

                <option value="5">
                  5 ⭐⭐⭐⭐⭐
                </option>
              </select>
            </div>

            {/* Description */}
            <div className="custom-input-group mb-4">
              <label className="custom-label">
                Description / Itinerary Notes
              </label>

              <textarea
                name="description"
                placeholder="Add notes about places to visit, hotel bookings, flight details..."
                value={trip.description}
                onChange={handleChange}
                className="custom-textarea"
              />
            </div>

            {/* Trip Cover Photo */}
            <div className="custom-input-group mb-4">
              <label className="custom-label">
                Trip Cover Photo
              </label>

              <input
                type="file"
                name="image"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                className="custom-input"
              />

              {/* Image Preview */}
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Trip preview"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary-gradient flex-grow-1 py-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>

                    Creating Trip...
                  </>
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>

                    Create Trip
                  </>
                )}
              </button>

              <button
                type="button"
                className="btn-secondary-gradient py-3 px-4"
                onClick={() =>
                  navigate("/dashboard")
                }
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateTrip;