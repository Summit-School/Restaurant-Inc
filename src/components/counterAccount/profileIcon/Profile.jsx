import "./Profile.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoSignOut } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await localStorage.removeItem("counter");
    navigate("/staff_login");
  };

  return (
    <div className="user-profile-icon">
      <NavDropdown
        title={
          <div className="pull-left">
            <span>Counter Account</span>
            <img
              className="thumbnail-image"
              src="/images/logo.jpeg"
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
