import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logout: contextLogout } =
    useContext(AuthContext);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "dark" ? "light" : "dark"
    );
  };

  const logout = () => {
    contextLogout();
    navigate("/");
  };

  return (
    <nav className="app-navbar py-3 px-4 shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Brand */}
        <Link
          to="/dashboard"
          className="brand-title text-decoration-none"
        >
          TripVault
        </Link>

        <div className="d-flex align-items-center gap-2 gap-md-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            title={`Switch to ${
              theme === "dark" ? "Light" : "Dark"
            } Mode`}
          >
            {theme === "dark" ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="5"
                  />

                  <line
                    x1="12"
                    y1="1"
                    x2="12"
                    y2="3"
                  />

                  <line
                    x1="12"
                    y1="21"
                    x2="12"
                    y2="23"
                  />

                  <line
                    x1="4.22"
                    y1="4.22"
                    x2="5.64"
                    y2="5.64"
                  />

                  <line
                    x1="18.36"
                    y1="18.36"
                    x2="19.78"
                    y2="19.78"
                  />

                  <line
                    x1="1"
                    y1="12"
                    x2="3"
                    y2="12"
                  />

                  <line
                    x1="21"
                    y1="12"
                    x2="23"
                    y2="12"
                  />

                  <line
                    x1="4.22"
                    y1="19.78"
                    x2="5.64"
                    y2="18.36"
                  />

                  <line
                    x1="18.36"
                    y1="5.64"
                    x2="19.78"
                    y2="4.22"
                  />
                </svg>

                <span>Light</span>
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>

                <span>Dark</span>
              </>
            )}
          </button>

          {/* Dashboard */}
          <Link
            to="/dashboard"
            className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect
                x="3"
                y="3"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="14"
                y="3"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="14"
                y="14"
                width="7"
                height="7"
                rx="1"
              />

              <rect
                x="3"
                y="14"
                width="7"
                height="7"
                rx="1"
              />
            </svg>

            Dashboard
          </Link>

          {/* My Profile */}
          {user?.username && (
            <Link
              to={`/profile/${user.username}`}
              className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
            >
              👤 My Profile
            </Link>
          )}

          {/* New Trip */}
          <Link
            to="/create-trip"
            className="btn-primary-gradient px-3 py-2 text-decoration-none small"
          >
            <svg
              width="16"
              height="16"
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

            New Trip
          </Link>

          {/* Logout */}
          <button
            className="btn-danger-custom py-2 px-3 border-0"
            onClick={logout}
            title="Logout"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />

              <polyline points="16 17 21 12 16 7" />

              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
              />
            </svg>

            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;