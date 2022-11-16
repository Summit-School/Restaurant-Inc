import React from "react";
import Sidebar from "../cashierAccount/sidebar/Sidebar";
import Profile from "../cashierAccount/profileIcon/Profile";

const CashierLayout = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="nav-bar">
        <div className="side-bar">
          <Sidebar />
        </div>
        <div className="profile-image">
          <Profile />
        </div>
      </div>
      <div className="layout-content">
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default CashierLayout;
