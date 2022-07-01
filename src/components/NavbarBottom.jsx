import React from "react";
import { NavLink } from "react-router-dom";

import './styles/NavbarBottom.css'

const NavbarBottom = () => {
  return (
    <div className="navbar-container">
      <nav className="navbar-bottom">
        <div className="nav-item">
          {/* className={({ isActive }) => (isActive ? "selected" : "")} */}
          <NavLink to="/">My events</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/search-events">Search events</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/create-event">Create event</NavLink>
        </div>
        <div className="nav-item">
          <NavLink to="/:username">Profile</NavLink>
        </div>
      </nav>
    </div>
  );
};

export default NavbarBottom;
