import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", formData);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-card animate-fade-in">

        <div className="text-center mb-4">
          <h1
            className="fw-bold mb-2 brand-title justify-content-center"
            style={{ fontSize: "2rem" }}
          >
            TripVault
          </h1>

          <h2
            className="fw-bold mb-1 h5 text-heading"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Create Account
          </h2>

          <p className="text-visible-muted small">
            Start planning your dream journeys today
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <div className="custom-input-group">
            <label className="custom-label">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="custom-input"
              required
            />
          </div>

          {/* Username */}
          <div className="custom-input-group">
            <label className="custom-label">
              Username
            </label>

            <input
              type="text"
              name="username"
              placeholder="johndoe"
              value={formData.username}
              onChange={handleChange}
              className="custom-input"
              minLength={3}
              required
            />

            <small className="text-visible-muted">
              This will be used for your public profile.
            </small>
          </div>

          {/* Email */}
          <div className="custom-input-group">
            <label className="custom-label">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="custom-input"
              required
            />
          </div>

          {/* Password */}
          <div className="custom-input-group mb-4">
            <label className="custom-label">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="custom-input"
              minLength={6}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary-gradient w-100 py-3 mb-3 fs-6"
          >
            Create Account

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
                x1="5"
                y1="12"
                x2="19"
                y2="12"
              />

              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="text-visible-muted small mb-0">
            Already have an account?{" "}

            <Link
              to="/"
              className="text-decoration-none fw-semibold"
              style={{ color: "#2dd4bf" }}
            >
              Log In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;