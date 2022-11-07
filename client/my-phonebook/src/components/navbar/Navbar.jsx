import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../logout/Logout";

import "./Navbar.css";

const Navbar = ({ user }) => {
  console.log(user);
  return (
    <div className="navbar-container">

    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      {user && (
        <>
          <div className="logout-button-container">
            <Logout />
          </div>
        </>
      )}
    </nav>
      </div>
  );
};

export default Navbar;
