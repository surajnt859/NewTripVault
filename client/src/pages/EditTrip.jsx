import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const res = await api.get(`/trips/${id}`);

      const fetchedTrip = res.data.trip;

      setTrip({
        title: fetchedTrip.title || "",
        destination: fetchedTrip.destination || "",
        startDate: fetchedTrip.startDate || "",
        endDate: fetchedTrip.endDate || "",
        budget: fetchedTrip.budget || "",
        description: fetchedTrip.description || "",
        rating: fetchedTrip.rating || "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load trip");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTrip({
      ...trip,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/trips/${id}`, trip);

      alert("Trip Updated Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Failed to update trip");
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
          <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">
            <div>
              <h1
                className="h3 fw-bold text-heading mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Edit Trip
              </h1>

              <p className="text-visible-muted small mb-0">
                Update your trip details and budget planning
              </p>
            </div>

            <Link
              to="/dashboard"
              className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
            >
              ← Dashboard
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border"
                style={{ color: "#2dd4bf" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>

              {/* Trip Title */}
              <div className="custom-input-group">
                <label className="custom-label">Trip Title</label>

                <input
                  type="text"
                  name="title"
                  value={trip.title}
                  onChange={handleChange}
                  placeholder="e.g. Summer Vacation in Paris"
                  className="custom-input"
                  required
                />
              </div>

              {/* Destination */}
              <div className="custom-input-group">
                <label className="custom-label">Destination</label>

                <input
                  type="text"
                  name="destination"
                  value={trip.destination}
                  onChange={handleChange}
                  placeholder="Destination"
                  className="custom-input"
                  required
                />
              </div>

              {/* Dates */}
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="custom-input-group">
                    <label className="custom-label">Start Date</label>

                    <input
                      type="date"
                      name="startDate"
                      value={trip.startDate?.substring(0, 10) || ""}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="custom-input-group">
                    <label className="custom-label">End Date</label>

                    <input
                      type="date"
                      name="endDate"
                      value={trip.endDate?.substring(0, 10) || ""}
                      onChange={handleChange}
                      className="custom-input"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="custom-input-group">
                <label className="custom-label">Budget (INR ₹)</label>

                <input
                  type="number"
                  name="budget"
                  value={trip.budget}
                  onChange={handleChange}
                  placeholder="Budget"
                  className="custom-input"
                  required
                />
              </div>

              {/* Rating */}
              <div className="custom-input-group">
                <label className="custom-label">Rating</label>

                <select
                  name="rating"
                  value={trip.rating}
                  onChange={handleChange}
                  className="custom-input"
                  required
                >
                  <option value="">Select a rating</option>
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐⭐</option>
                  <option value="3">3 ⭐⭐⭐</option>
                  <option value="4">4 ⭐⭐⭐⭐</option>
                  <option value="5">5 ⭐⭐⭐⭐⭐</option>
                </select>
              </div>

              {/* Description */}
              <div className="custom-input-group mb-4">
                <label className="custom-label">
                  Description / Itinerary Notes
                </label>

                <textarea
                  name="description"
                  value={trip.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="custom-textarea"
                />
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3 pt-2">
                <button
                  type="submit"
                  className="btn-primary-gradient flex-grow-1 py-3"
                >
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
                </button>

                <button
                  type="button"
                  className="btn-secondary-gradient py-3 px-4"
                  onClick={() => navigate("/dashboard")}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditTrip;