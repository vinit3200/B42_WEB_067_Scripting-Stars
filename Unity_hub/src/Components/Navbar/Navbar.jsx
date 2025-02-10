import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { BellIcon, MagnifyingGlassIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import "./Navbar.css";
import EditProfile from "../Community/EditProfile";

const Navbar = ({ user, setUser, setShowAuth, setShowEditProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;
  
    try {
      const response = await fetch("https://b42-web-067-scripting-stars.onrender.com/user/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // ✅ Fixed Authorization format
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete account");
      }
  
      alert("Your account has been deleted.");
      localStorage.removeItem("user"); // ✅ Clear user data
      setUser(null);
      setShowAuth(true);
      navigate("/login"); // ✅ Redirect to login page
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account. Please try again.");
    }
    setMenuOpen(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setResults([]); // Clear results if query is too short
      setShowResults(false);
      return;
    }

    try {
      const response = await fetch(`https://b42-web-067-scripting-stars.onrender.com/user/search?name=${query}`);
      if (!response.ok) throw new Error("No results found");

      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("https://b42-web-067-scripting-stars.onrender.com/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
  
      alert("Logged out successfully.");
      localStorage.removeItem("user"); // ✅ Clear user data
      setUser(null);
      setShowAuth(true);
      navigate("/login"); // ✅ Redirect to login
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Error logging out. Please try again.");
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar fade-in">
        <div className="nav-brand">Unity Hub</div>

        {/* Search Input with Icon */}
        <div className="search-container">
      {/* <div className="search-bar"> */}
        <input
        
          type="text"
          placeholder="Search....."
          className="search-input"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <MagnifyingGlassIcon className="search-icon" />
      {/* </div> */}

      {showResults && results.length > 0 && (
        <div className="search-results">
          {results.map((community) => (
            <div key={community._id} className="search-result-item">
              <img src={community.profilePicture} alt="Profile" className="search-profile-pic" />
              <span>{community.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  


        <div className="nav-right">
          {user?.username ? (
            <span className="welcome-message">Welcome, {user.username}!</span>
          ) : (
            <button className="auth-button" onClick={() => setShowAuth(true)}>
              Register/Login
            </button>
          )}

          {/* Notification Icon */}
          <button className="notification-btn">
            <BellIcon className="notification-icon" style={{ width: "30px", height: "30px", stroke: "black", strokeWidth: "2" }} />
          </button>

          {/* 3-dot menu */}
          <div className="dropdown-container" ref={menuRef}>
            <button 
              ref={buttonRef}
              className="menu-dots"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              <EllipsisVerticalIcon className="dots-icon" style={{ width: "30px", height: "30px", stroke: "black", strokeWidth: "2" }} />
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="dropdown-content">
                <button onClick={() => { setShowEditProfile(true); setMenuOpen(false); }}>
                  Edit Profile
                </button>
                <button onClick={handleDeleteAccount} className="delete-account-btn">
                  Delete Account
                </button>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Niche Navbar (SCROLLABLE) */}
      <nav className="niche-navbar">
        <div className="niche-scroll">
          {["Technology & Innovation", "Health & Fitness", "Arts & Entertainment",
            "Literature & Writing", "Business & Finance", "Science & Education",
            "Gaming", "Hobbies & Crafts", "Lifestyle & Relationships",
            "Social Causes & Activism", "Automotive & Transportation",
            "Food & Beverage", "Spirituality & Religion",
            "Career & Professional Growth", "Miscellaneous Niches"
          ].map((niche, index) => (
            <button key={index} className="niche-item slide-up">{niche}</button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
