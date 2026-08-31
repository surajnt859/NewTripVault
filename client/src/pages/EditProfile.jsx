import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user, login, token } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Username is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.put(
        "/users/profile",
        {
          username,
          bio,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update stored user information
      login(token, {
        ...user,
        username: res.data.user.username,
        bio: res.data.user.bio,
      });

      toast.success("Profile updated successfully!");

      navigate(`/profile/${res.data.user.username}`);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />

      <main className="container py-5 flex-grow-1 d-flex justify-content-center align-items-start">

        <div
          className="glass-card p-4 p-md-5 w-100 animate-fade-in"
          style={{ maxWidth: "680px" }}
        >

          {/* Header */}
          <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-25">

            <div>
              <h1
                className="h3 fw-bold text-heading mb-1"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Edit Profile
              </h1>

              <p className="text-visible-muted small mb-0">
                Update your public profile information
              </p>
            </div>

            <Link
              to={user?.username ? `/profile/${user.username}` : "/dashboard"}
              className="btn-secondary-gradient px-3 py-2 text-decoration-none small"
            >
              ← Profile
            </Link>

          </div>

          <form onSubmit={handleSubmit}>

            {/* Username */}
            <div className="custom-input-group">
              <label className="custom-label">Username</label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="custom-input"
                placeholder="e.g. suraj123"
                minLength={3}
                required
              />

              <small className="text-visible-muted">
                Your username is used for your public profile URL.
              </small>
            </div>

            {/* Bio */}
            <div className="custom-input-group mb-4">
              <label className="custom-label">Bio</label>

              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="custom-textarea"
                placeholder="Tell people a little about yourself..."
                maxLength={300}
                rows={5}
              />

              <small className="text-visible-muted">
                {bio.length}/300 characters
              </small>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 pt-2">

              <button
                type="submit"
                className="btn-primary-gradient flex-grow-1 py-3"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>

              <button
                type="button"
                className="btn-secondary-gradient py-3 px-4"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditProfile;