import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
      Read the actual values from the form.

      This also handles cases where the browser autofills
      the fields without properly updating React state.
    */
    const form = e.currentTarget;
    const formDataFromForm = new FormData(form);

    const name = formDataFromForm.get("name")?.toString().trim();
    const email = formDataFromForm.get("email")?.toString().trim();
    const password = formDataFromForm.get("password")?.toString();

  if (!name || !email || !password) {
  console.log("FRONTEND VALUES:", {
    name,
    email,
    password,
  });

  toast.error("Frontend received empty values");
  return;
}

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      console.log("Registration response:", res.data);

      toast.success("Registration successful!");

      // Go to login page after successful registration
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);

      toast.error(
        err.response?.data?.message ||
          "Registration failed"
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
            Create Account
          </h2>

          <p className="text-visible-muted small">
            Start planning your dream journeys today
          </p>

        </div>

        {/* Registration Form */}
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
              autoComplete="name"
              required
            />

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
              autoComplete="new-password"
              minLength={6}
              required
            />

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-primary-gradient w-100 py-3 mb-3 fs-6"
            disabled={loading}
          >

            {loading ? "Creating Account..." : "Create Account"}

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

        {/* Login Link */}
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