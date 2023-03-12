import React from "react";
import "../css/NavBar.css";
import { NavLink, Link, Switch, Route } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>Un</span>
        <span style={{ color: "#ff6d6d" }}>Keying</span>
      </div>

      <div className="nav-items">
        <NavLink
          exact={true}
          to="/"
          className="nav-link"
          activeClassName="active"
        >
          <div className="nav-home">Home</div>
        </NavLink>
        <NavLink to="/rmbg" className="nav-link" activeClassName="active">
          <div className="nav-rmbg">Remove Background</div>
        </NavLink>
        <NavLink to="/ack" className="nav-link" activeClassName="active">
          <div className="nav-ack">Acknowledgement</div>
        </NavLink>
        <NavLink to="/sign" className="nav-link" activeClassName="active">
          <div className="nav-sign">Sign In</div>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
