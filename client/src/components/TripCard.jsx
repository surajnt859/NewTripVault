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
    <div className="glass-card h-100 d-flex flex-column p-4 position-relative overflow-hidden animate-fade-in">
      <div className="d-flex justify-content-between align-items-start mb-3">
        <div>
          <span className="badge-date mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            {formattedStartDate} - {formattedEndDate}
          </span>
          <h3 className="h4 fw-bold text-heading mb-0 d-flex align-items-center gap-2">
            <span style={{ color: "#2dd4bf" }}>📍</span>
            {trip.destination}
          </h3>
        </div>
        <div className="badge-budget ms-2">
          ₹{Number(trip.budget).toLocaleString()}
        </div>
      </div>

      <p className="text-visible-muted small flex-grow-1 mb-4" style={{ minHeight: "3rem", lineHeight: "1.5", fontSize: "0.925rem" }}>
        {trip.description || "No description provided for this itinerary."}
      </p>

      <div className="d-flex align-items-center gap-2 pt-3 border-top border-secondary border-opacity-25">
        <button
          className="btn-warning-custom flex-grow-1 justify-content-center"
          onClick={() => navigate(`/edit/${trip._id}`)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit
        </button>

        <button
          className="btn-danger-custom"
          onClick={handleDelete}
          title="Delete Trip"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TripCard;