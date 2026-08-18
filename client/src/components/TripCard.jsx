import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const TripCard = ({ trip, fetchTrips }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/trips/${trip._id}`);

      alert("Trip Deleted Successfully!");

      fetchTrips();
    } catch (error) {
      console.error(error);
      alert("Failed to delete trip");
    }
  };

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
    <div className="glass-card h-100 d-flex flex-column position-relative overflow-hidden animate-fade-in">
      
      {/* Cover Image */}
      {trip.coverImage && (
        <div
          style={{
            width: "100%",
            height: "220px",
            overflow: "hidden",
          }}
        >
          <img
            src={trip.coverImage}
            alt={trip.title || "Trip cover"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      <div className="p-4 d-flex flex-column flex-grow-1">

        {/* Title and Budget */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h3
              className="h4 fw-bold text-heading mb-2"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {trip.title || "Untitled Trip"}
            </h3>

            <span className="badge-date mb-2">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="18"
                  rx="2"
                />
                <line
                  x1="16"
                  y1="2"
                  x2="16"
                  y2="6"
                />
                <line
                  x1="8"
                  y1="2"
                  x2="8"
                  y2="6"
                />
                <line
                  x1="3"
                  y1="10"
                  x2="21"
                  y2="10"
                />
              </svg>

              {formattedStartDate} - {formattedEndDate}
            </span>

            <h4 className="h5 fw-bold text-heading mb-0 mt-2 d-flex align-items-center gap-2">
              <span style={{ color: "#2dd4bf" }}>📍</span>
              {trip.destination}
            </h4>
          </div>

          <div className="badge-budget ms-2">
            ₹{Number(trip.budget).toLocaleString()}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-3">
          <span className="text-visible-muted small fw-semibold me-2">
            Rating:
          </span>

          <span
            style={{
              color: "#fbbf24",
              fontSize: "1.1rem",
            }}
          >
            {"★".repeat(Number(trip.rating) || 0)}
            {"☆".repeat(
              5 - (Number(trip.rating) || 0)
            )}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-visible-muted small flex-grow-1 mb-4"
          style={{
            minHeight: "3rem",
            lineHeight: "1.5",
            fontSize: "0.925rem",
          }}
        >
          {trip.description ||
            "No description provided for this itinerary."}
        </p>

        {/* Buttons */}
        <div className="d-flex flex-column gap-2 pt-3 border-top border-secondary border-opacity-25">

          {/* View Trip */}
          <button
            className="btn-primary-gradient w-100 justify-content-center"
            onClick={() =>
              navigate(`/trip/${trip._id}`)
            }
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
              <circle
                cx="12"
                cy="12"
                r="3"
              />
            </svg>

            View Trip
          </button>

          {/* Edit + Delete */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn-warning-custom flex-grow-1 justify-content-center"
              onClick={() =>
                navigate(`/edit/${trip._id}`)
              }
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1-1 4 4-1 9.5-9.5z" />
              </svg>

              Edit
            </button>

            <button
              className="btn-danger-custom"
              onClick={handleDelete}
              title="Delete Trip"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>

              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;