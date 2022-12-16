import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink to="/home">Board</NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink to="/project-management">Project Management</NavLink>
        </li>
        {/* <li className="sidebar-item">
          <NavLink to="/login">Login</NavLink>
        </li> */}
      </ul>
    </div>
  );
}
