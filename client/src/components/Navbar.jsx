import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout: contextLogout } = useContext(AuthContext);

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const logout = () => {
    setMenuOpen(false);
    contextLogout();
    navigate("/");
  };

  const SunIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );

  const MoonIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

  const DashboardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );

  const PlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );

  return (
    <nav className="app-navbar py-3 px-4 shadow-sm" ref={menuRef}>
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Brand */}
        <Link to="/dashboard" className="brand-title text-decoration-none">
          TripVault
        </Link>

        {/* Desktop Nav Links */}
        <div className="navbar-desktop-links d-flex align-items-center gap-2 gap-md-3">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <><SunIcon /><span>Light</span></> : <><MoonIcon /><span>Dark</span></>}
          </button>

          {/* Dashboard */}
          <Link to="/dashboard" className="btn-secondary-gradient px-3 py-2 text-decoration-none small">
            <DashboardIcon /> Dashboard
          </Link>

          {/* My Profile */}
          {user?.username && (
            <Link to={`/profile/${user.username}`} className="btn-secondary-gradient px-3 py-2 text-decoration-none small">
              👤 My Profile
            </Link>
          )}

          {/* New Trip */}
          <Link to="/create-trip" className="btn-primary-gradient px-3 py-2 text-decoration-none small">
            <PlusIcon /> New Trip
          </Link>

          {/* Logout */}
          <button className="btn-danger-custom py-2 px-3 border-0" onClick={logout} title="Logout">
            <LogoutIcon /> Logout
          </button>

        </div>

        {/* Mobile: Theme toggle + Hamburger */}
        <div className="navbar-mobile-controls d-flex align-items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-theme-toggle"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
            <span className={`hamburger-line ${menuOpen ? "open" : ""}`}></span>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-inner">

          <Link to="/dashboard" className="mobile-menu-item btn-secondary-gradient text-decoration-none">
            <DashboardIcon /> Dashboard
          </Link>

          {user?.username && (
            <Link to={`/profile/${user.username}`} className="mobile-menu-item btn-secondary-gradient text-decoration-none">
              👤 My Profile
            </Link>
          )}

          <Link to="/create-trip" className="mobile-menu-item btn-primary-gradient text-decoration-none">
            <PlusIcon /> New Trip
          </Link>

          <button className="mobile-menu-item btn-danger-custom border-0 w-100 justify-content-center" onClick={logout}>
            <LogoutIcon /> Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;