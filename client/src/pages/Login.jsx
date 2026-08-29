import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      /*
       * Store JWT token and user information
       */
      login(res.data.token, res.data.user);

      // Success toast
      toast.success("Login successful!");

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card auth-card animate-fade-in">

        {/* Header */}
        <div className="text-center mb-4">

          <h1
            className="fw-bold mb-2 brand-title justify-content-center"
            style={{ fontSize: "2rem" }}
          >
            TripVault
          </h1>

          <h2
            className="fw-bold mb-1 h5 text-heading"
            style={{
              fontFamily: "var(--font-heading)",
            }}
          >
            Welcome Back
          </h2>

          <p className="text-visible-muted small">
            Login to continue planning your journeys
          </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

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
              autoComplete="email"
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
              autoComplete="current-password"
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn-primary-gradient w-100 py-3 mb-3 fs-6"
            disabled={loading}
          >

            {loading ? "Logging in..." : "Login"}

            {!loading && (
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

                <polyline
                  points="12 5 19 12 12 19"
                />
              </svg>
            )}

          </button>

        </form>

        {/* Register Link */}
        <div className="text-center mt-3">

          <p className="text-visible-muted small mb-0">

            Don't have an account?{" "}

            <Link
              to="/register"
              className="text-decoration-none fw-semibold"
              style={{ color: "#2dd4bf" }}
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;