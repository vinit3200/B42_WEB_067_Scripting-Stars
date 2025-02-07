import React, { useState, useEffect, useRef } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import "./Navbar.css"; // Import CSS file

const Navbar = ({ user, setUser, setShowAuth, setShowEditProfile, setShowEditCommunity, setShowCreateCommunity }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="nav-brand">Unity Hub</div>

        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">Search</button>
        </div>

        {user ? (
          <div className="user-profile-container">
            <div className="user-profile">Welcome, {user.username}</div>

            <button className="notification-btn">
              <BellIcon className="h-7 w-7 text-gray-700" />
              <span className="notification-badge"></span>
            </button>

            <div className="dropdown" ref={menuRef}>
              <button className="menu-dots" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
              </button>

              {menuOpen && (
                <div className="dropdown-content">
                  <button onClick={() => setShowEditProfile(true)}>Edit Profile</button>
                  <button onClick={() => setShowEditCommunity(true)}>Edit Community Details</button>
                  <button onClick={() => setShowCreateCommunity(true)}>Create Community</button>
                  <button onClick={() => { /* Add delete community logic */ }}>Delete Community</button>
                  <button onClick={() => { setUser(null); setShowAuth(false); }}>Logout</button>
                  <button onClick={() => {
                    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                      localStorage.removeItem('user');
                      setUser(null);
                      setShowAuth(false);
                    }
                  }}>Delete Account</button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <button className="auth-button" onClick={() => setShowAuth(!showAuth)}>
            Register/Login
          </button>
        )}
      </nav>

      {/* Niche Navbar */}
      <nav className="niche-navbar">
        <div className="niche-scroll">
          {[
            "Technology & Innovation", "Health & Fitness", "Arts & Entertainment", "Literature & Writing",
            "Business & Finance", "Science & Education", "Gaming", "Hobbies & Crafts",
            "Lifestyle & Relationships", "Social Causes & Activism", "Automotive & Transportation",
            "Food & Beverage", "Spirituality & Religion", "Career & Professional Growth", "Miscellaneous Niches"
          ].map((niche, index) => (
            <button key={index} className="niche-item">{niche}</button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
