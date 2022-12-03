import React from "react";
import Sidebar from "../inventoryAccount/sidebar/Sidebar";
import Profile from "../inventoryAccount/profileIcon/Profile";

const InventoryLayout = ({ children }) => {
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

export default InventoryLayout;
