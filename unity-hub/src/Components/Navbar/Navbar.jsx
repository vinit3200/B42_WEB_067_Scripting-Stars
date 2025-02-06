import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>SocialApp</h1>
      <div className="nav-links">
        <button className="create-group">Create Group</button>
        <a href="#">Home</a>
        <a href="#">Groups</a>
      </div>
    </nav>
  );
}

export default Navbar;