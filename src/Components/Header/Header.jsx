import { Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function Header() {
  let { uLogin } = useSelector((state) => state.userReducer);

  let renderUserName = () => {
    if (uLogin != null) {
      return (
        <NavLink className="nav-link" to="/profile">
          {uLogin.name}
        </NavLink>
      );
    } else {
      // Chưa login
      return (
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      );
    }
  };

  return (
    <div className="header" style={{ background: "orange" }}>
      <Row className="header-content">
        <form action="" className="form-search">
          <Input placeholder="Search" />
        </form>
        <div className="profile">
          <li className="profile-item">{renderUserName()}</li>
        </div>
      </Row>
    </div>
  );
}
