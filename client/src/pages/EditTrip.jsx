import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const EditTrip = () => {
  const { id } = useParams();
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

  const [currentImage, setCurrentImage] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing trip
  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/trips/${id}`);

      const fetchedTrip = res.data.trip;

      setTrip({
        title: fetchedTrip.title || "",
        destination: fetchedTrip.destination || "",
        startDate: fetchedTrip.startDate
          ? fetchedTrip.startDate.substring(0, 10)
          : "",
        endDate: fetchedTrip.endDate
          ? fetchedTrip.endDate.substring(0, 10)
          : "",
        budget: fetchedTrip.budget || "",
        description: fetchedTrip.description || "",
        rating: fetchedTrip.rating || "",
      });

      setCurrentImage(
        fetchedTrip.coverImage || ""
      );
    } catch (error) {
      console.error("Fetch trip error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load trip"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle text inputs
  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  // Handle new photo
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

  // Clean preview URL
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // Submit changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      // 1. Update trip details
      await api.put(`/trips/${id}`, trip);

      // 2. Upload new image if selected
      if (image) {
        const formData = new FormData();

        formData.append("image", image);

        const uploadResponse = await api.post(
          `/trips/${id}/upload`,
          formData
        );

        // Update current image with uploaded image
        if (uploadResponse.data.trip?.coverImage) {
          setCurrentImage(
            uploadResponse.data.trip.coverImage
          );
        }
      }

      toast.success("Trip updated successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Update trip error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update trip"
      );
    } finally {
      setSaving(false);
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
                Edit Trip
              </h1>

              <p className="text-visible-muted small mb-0">
                Update your trip details and cover photo
              </p>
            </div>

            <Link
              to="/dashboard"
              className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
            >
              ← Dashboard
            </Link>

          </div>

          {/* Loading */}
          {loading ? (

            <div className="text-center py-5">

              <div
                className="spinner-border"
                style={{ color: "#2dd4bf" }}
                role="status"
              >
                <span className="visually-hidden">
                  Loading...
                </span>
              </div>

              <p className="text-visible-muted mt-3 mb-0">
                Loading trip...
              </p>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              {/* Trip Title */}
              <div className="custom-input-group">

                <label className="custom-label">
                  Trip Title
                </label>

                <input
                  type="text"
                  name="title"
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
              <div className="custom-input-group">

                <label className="custom-label">
                  Description / Itinerary Notes
                </label>

                <textarea
                  name="description"
                  value={trip.description}
                  onChange={handleChange}
                  className="custom-textarea"
                  placeholder="Add notes about your trip..."
                  rows={5}
                />

              </div>

              {/* Current / New Cover Photo */}
              <div className="custom-input-group mb-4">

                <label className="custom-label">
                  Trip Cover Photo
                </label>

                {/* Current image */}
                {currentImage && !preview && (
                  <div className="mb-3">

                    <p className="text-visible-muted small mb-2">
                      Current photo
                    </p>

                    <img
                      src={currentImage}
                      alt="Current trip cover"
                      style={{
                        width: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />

                  </div>
                )}

                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="custom-input"
                />

                <small className="text-visible-muted">
                  Select a new photo to replace the
                  current cover image.
                </small>

                {/* New image preview */}
                {preview && (
                  <div className="mt-3">

                    <p className="text-visible-muted small mb-2">
                      New photo preview
                    </p>

                    <img
                      src={preview}
                      alt="New trip preview"
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
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                        aria-hidden="true"
                      />

                      Saving...
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

                      Update Trip
                    </>
                  )}

                </button>

                <button
                  type="button"
                  className="btn-secondary-gradient py-3 px-4"
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  disabled={saving}
                >
                  Cancel
                </button>

              </div>

            </form>

          )}

        </div>

      </main>
      <Footer />
    </div>
  );
};

export default EditTrip;