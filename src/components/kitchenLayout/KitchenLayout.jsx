import React from "react";
import Sidebar from "../kitchenAccount/sidebar/Sidebar";
import Profile from "../kitchenAccount/profileIcon/Profile";

const KitchenLayout = ({ children }) => {
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

export default KitchenLayout;
