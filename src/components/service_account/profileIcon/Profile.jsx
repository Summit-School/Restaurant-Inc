import "./Profile.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoSignOut } from "react-icons/go";
import { Link } from "react-router-dom";

const Profile = () => {
  const handleLogout = (e) => {
    e.preventDefault();

    console.lgo("logout");
  };

  return (
    <div className="user-profile-icon">
      <NavDropdown
        title={
          <div className="pull-left">
            <span>Service name</span>
            <img
              className="thumbnail-image"
              src="/images/logo.jpg"
              alt="user pic"
            />
          </div>
        }
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item className="menu-item text-danger">
          <Link to="#" className="signout-link" onClick={handleLogout}>
            <GoSignOut className="m-1" />
            Sign Out
          </Link>
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
};

export default Profile;
