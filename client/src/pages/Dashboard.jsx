import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import TripCard from "../components/TripCard";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [loading, setLoading] = useState(true);

  const fetchTrips = async () => {
    try {
      setLoading(true);

      const res = await api.get("/trips");

      setTrips(res.data.trips || []);
    } catch (error) {
      console.error("Failed to fetch trips:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to fetch trips"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter((trip) =>
    trip.destination
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === "budget") {
      return Number(a.budget || 0) - Number(b.budget || 0);
    }

    return (
      new Date(b.startDate) -
      new Date(a.startDate)
    );
  });

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container py-5 flex-grow-1">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

          <div>
            <h1
              className="fw-bold mb-1 display-6 text-heading"
              style={{
                fontFamily: "var(--font-heading)",
              }}
            >
              Trip Dashboard
            </h1>

            <p className="text-visible-muted small mb-0">
              Manage your saved itineraries and travel
              budgets ({trips.length}{" "}
              {trips.length === 1 ? "trip" : "trips"} total)
            </p>
          </div>

          <button
            onClick={() => navigate("/create-trip")}
            className="btn-primary-gradient align-self-start align-self-md-auto py-2.5 px-4"
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
              <line
                x1="12"
                y1="5"
                x2="12"
                y2="19"
              />

              <line
                x1="5"
                y1="12"
                x2="19"
                y2="12"
              />
            </svg>

            Create New Trip
          </button>
        </div>

        {/* Filter and Control Toolbar */}
        <div className="glass-card p-3 mb-4 d-flex flex-column flex-sm-row gap-3 align-items-center justify-content-between">

          {/* Search */}
          <div className="position-relative flex-grow-1 w-100">

            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-subtle)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
              />
            </svg>

            <input
              type="text"
              placeholder="Search destination..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="custom-input"
              style={{
                paddingLeft: "2.6rem",
              }}
            />
          </div>

          {/* Sort */}
          <div className="d-flex align-items-center gap-2 w-100 w-sm-auto justify-content-end">

            <label className="text-visible-muted small fw-bold text-nowrap">
              Sort By:
            </label>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="custom-select fw-semibold"
              style={{
                width: "170px",
              }}
            >
              <option value="latest">
                Latest Date
              </option>

              <option value="budget">
                Budget (Low to High)
              </option>
            </select>

          </div>
        </div>

        {/* Content */}
        {loading ? (

          /* Loading State */
          <div className="text-center py-5">

            <div
              className="spinner-border"
              style={{
                color: "#2dd4bf",
                width: "3rem",
                height: "3rem",
              }}
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>

            <p className="text-visible-muted mt-3">
              Loading your trips...
            </p>

          </div>

        ) : sortedTrips.length === 0 ? (

          /* Empty State */
          <div className="glass-card text-center py-5 px-4 my-4 animate-fade-in">

            <div
              className="p-4 d-inline-block rounded-circle mb-3"
              style={{
                background:
                  "rgba(13, 148, 136, 0.15)",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>

            <h3 className="h4 fw-bold text-heading mb-2">
              {search
                ? "No Trips Found"
                : "No Trips Yet"}
            </h3>

            <p className="text-visible-muted small max-w-md mx-auto mb-4">
              {search
                ? `No trips match your search term "${search}".`
                : "You haven't added any trips yet. Create your first itinerary!"}
            </p>

            {!search && (
              <button
                onClick={() =>
                  navigate("/create-trip")
                }
                className="btn-primary-gradient py-2 px-4"
              >
                + Add New Trip
              </button>
            )}

          </div>

        ) : (

          /* Trip Cards */
          <div className="trips-grid">

            {sortedTrips.map((trip) => (
              <TripCard
                key={trip._id}
                trip={trip}
                fetchTrips={fetchTrips}
              />
            ))}

          </div>
        )}

      </main>
    </div>
  );
};

export default Dashboard;