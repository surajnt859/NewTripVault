import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const response = await api.get(`/trips/${id}`);

      setTrip(response.data.trip);
    } catch (error) {
      console.error(error);
      alert("Failed to load trip");
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />

        <main className="container py-5 text-center">
          <div
            className="spinner-border"
            style={{ color: "#2dd4bf" }}
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>
        </main>
      </div>
    );
  }

  if (!trip) {
    return null;
  }

  const formattedStartDate = trip.startDate
    ? new Date(trip.startDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const formattedEndDate = trip.endDate
    ? new Date(trip.endDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container py-5 flex-grow-1">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1
              className="h2 fw-bold text-heading mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {trip.title || "Trip Details"}
            </h1>

            <p className="text-visible-muted mb-0">
              {trip.destination}
            </p>
          </div>

          <div className="d-flex gap-2">
            <Link
              to={`/edit/${trip._id}`}
              className="btn-warning-custom text-decoration-none px-4 py-2"
            >
              Edit
            </Link>

            <Link
              to="/dashboard"
              className="btn-secondary-gradient text-decoration-none px-4 py-2"
            >
              ← Dashboard
            </Link>
          </div>
        </div>

        {/* Trip Information */}
        <div className="glass-card p-4 mb-4">
          <div className="row g-4">
            <div className="col-md-4">
              <span className="text-visible-muted small">
                Destination
              </span>

              <h5 className="text-heading mt-1 mb-0">
                📍 {trip.destination}
              </h5>
            </div>

            <div className="col-md-4">
              <span className="text-visible-muted small">
                Travel Dates
              </span>

              <h5 className="text-heading mt-1 mb-0">
                {formattedStartDate} - {formattedEndDate}
              </h5>
            </div>

            <div className="col-md-4">
              <span className="text-visible-muted small">
                Budget
              </span>

              <h5 className="text-heading mt-1 mb-0">
                ₹{Number(trip.budget).toLocaleString()}
              </h5>
            </div>
          </div>

          {trip.description && (
            <div className="mt-4 pt-4 border-top border-secondary border-opacity-25">
              <span className="text-visible-muted small">
                Description
              </span>

              <p className="text-heading mt-2 mb-0">
                {trip.description}
              </p>
            </div>
          )}

          {trip.rating && (
            <div className="mt-3">
              <span className="text-visible-muted small me-2">
                Rating:
              </span>

              <span
                style={{
                  color: "#fbbf24",
                  fontSize: "1.1rem",
                }}
              >
                {"★".repeat(Number(trip.rating))}
                {"☆".repeat(5 - Number(trip.rating))}
              </span>
            </div>
          )}
        </div>

        {/* Photo Grid */}
        <div className="glass-card p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="h4 fw-bold text-heading mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Trip Photos
              </h2>

              <p className="text-visible-muted small mb-0">
                {trip.photos?.length || 0} photo
                {trip.photos?.length === 1 ? "" : "s"} uploaded
              </p>
            </div>
          </div>

          {trip.photos && trip.photos.length > 0 ? (
            <div className="row g-3">
              {trip.photos.map((photo, index) => (
                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={`${photo}-${index}`}
                >
                  <div
                    style={{
                      height: "250px",
                      overflow: "hidden",
                      borderRadius: "12px",
                    }}
                  >
                    <img
                      src={photo}
                      alt={`${trip.title} photo ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div
                style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                }}
              >
                📷
              </div>

              <h4 className="text-heading">
                No Photos Yet
              </h4>

              <p className="text-visible-muted mb-3">
                Add a photo to this trip from the Edit Trip
                page.
              </p>

              <Link
                to={`/edit/${trip._id}`}
                className="btn-primary-gradient text-decoration-none px-4 py-2"
              >
                Add Photo
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TripDetails;