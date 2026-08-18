import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

const PublicProfile = () => {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, [username]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get(`/users/${username}/profile`);

      setProfile(res.data.user);
      setTrips(res.data.trips || []);
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  if (error) {
    return (
      <div className="min-vh-100 d-flex flex-column">
        <Navbar />

        <main className="container py-5">
          <div className="glass-card p-5 text-center">
            <h2 className="text-heading fw-bold">
              Profile Not Found
            </h2>

            <p className="text-visible-muted">
              {error}
            </p>

            <Link
              to="/"
              className="btn-primary-gradient px-4 py-2 text-decoration-none"
            >
              Go Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container py-5 flex-grow-1">

        {/* Profile Header */}
        <div className="glass-card p-4 p-md-5 mb-4 animate-fade-in">
          <div className="d-flex flex-column flex-md-row align-items-center gap-4">

            {/* Avatar */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                minWidth: "100px",
                background:
                  "linear-gradient(135deg, #0ea5e9, #14b8a6)",
                color: "white",
                fontSize: "2.5rem",
                fontWeight: "700",
              }}
            >
              {profile?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User Info */}
            <div className="text-center text-md-start flex-grow-1">

              <h1
                className="fw-bold text-heading mb-1"
                style={{
                  fontFamily: "var(--font-heading)",
                }}
              >
                {profile.name}
              </h1>

              <p
                className="mb-2"
                style={{
                  color: "#2dd4bf",
                  fontWeight: "600",
                }}
              >
                @{profile.username}
              </p>

              <p className="text-visible-muted mb-2">
                {profile.bio ||
                  "No bio available yet."}
              </p>

              <small className="text-visible-muted d-block mb-3">
                Member since{" "}
                {formatDate(profile.createdAt)}
              </small>

              {/* Edit Profile */}
              <Link
                to="/edit-profile"
                className="btn-primary-gradient px-4 py-2 text-decoration-none d-inline-flex"
              >
                ✏️ Edit Profile
              </Link>

            </div>

            {/* Trip Count */}
            <div className="text-center">
              <div
                className="fw-bold text-heading"
                style={{ fontSize: "2rem" }}
              >
                {trips.length}
              </div>

              <div className="text-visible-muted small">
                {trips.length === 1
                  ? "Trip"
                  : "Trips"}
              </div>
            </div>

          </div>
        </div>

        {/* Trips Heading */}
        <div className="mb-4">
          <h2
            className="h3 fw-bold text-heading mb-1"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            {profile.name}'s Trips
          </h2>

          <p className="text-visible-muted">
            Explore their saved travel itineraries
          </p>
        </div>

        {/* No Trips */}
        {trips.length === 0 ? (
          <div className="glass-card p-5 text-center">
            <h3 className="text-heading fw-bold">
              No Trips Yet
            </h3>

            <p className="text-visible-muted mb-0">
              This user hasn't added any trips yet.
            </p>
          </div>
        ) : (

          /* Trips */
          <div className="row g-4">
            {trips.map((trip) => (
              <div
                className="col-md-6 col-lg-4"
                key={trip._id}
              >
                <div className="glass-card h-100 d-flex flex-column overflow-hidden">

                  {/* Cover Image */}
                  {trip.coverImage ? (
                    <img
                      src={trip.coverImage}
                      alt={trip.title}
                      style={{
                        width: "100%",
                        height: "210px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        height: "210px",
                        background:
                          "linear-gradient(135deg, #0f172a, #134e4a)",
                        fontSize: "4rem",
                      }}
                    >
                      🌍
                    </div>
                  )}

                  <div className="p-4 d-flex flex-column flex-grow-1">

                    {/* Title + Budget */}
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                      <h3
                        className="h4 fw-bold text-heading mb-0"
                        style={{
                          fontFamily:
                            "var(--font-heading)",
                        }}
                      >
                        {trip.title}
                      </h3>

                      <span className="badge-budget">
                        ₹
                        {Number(
                          trip.budget || 0
                        ).toLocaleString()}
                      </span>

                    </div>

                    {/* Dates */}
                    <span className="badge-date mb-3">
                      {formatDate(trip.startDate)} -{" "}
                      {formatDate(trip.endDate)}
                    </span>

                    {/* Destination */}
                    <h4 className="h6 fw-bold text-heading mb-3">
                      📍 {trip.destination}
                    </h4>

                    {/* Rating */}
                    <div className="mb-3">
                      <span className="text-visible-muted small fw-semibold me-2">
                        Rating:
                      </span>

                      <span
                        style={{
                          color: "#fbbf24",
                        }}
                      >
                        {"★".repeat(
                          Number(trip.rating) || 0
                        )}

                        {"☆".repeat(
                          5 -
                            (Number(trip.rating) || 0)
                        )}
                      </span>
                    </div>

                    {/* Description */}
                    <p
                      className="text-visible-muted small flex-grow-1 mb-0"
                      style={{
                        lineHeight: "1.5",
                      }}
                    >
                      {trip.description ||
                        "No description provided."}
                    </p>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
};

export default PublicProfile;