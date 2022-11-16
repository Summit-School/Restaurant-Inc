import React from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdDashboard, MdViewList } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <button
        className="sidebar-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
      >
        <HiMenuAlt1 />
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <div>
              <img src="/images/logo.jpg" className="logo" alt="logo" />
              <h5>CHEFF FOOD</h5>
            </div>
          </h5>
          <button
            type="button"
            className="btn-close text-reset btn-outline-light"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="sidebar-body">
            <li>
              <span className="icon">
                <MdDashboard size={35} />
              </span>
              <Link to="/kitchen">DASHBOARD</Link>
            </li>
            <li>
              <span className="icon">
                <MdViewList size={35} />
              </span>
              <Link to="/pending_delivery">PENDING ORDERS</Link>
            </li>
            <li>
              <span className="icon">
                <MdViewList size={35} />
              </span>
              <Link to="/served">SERVED</Link>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
