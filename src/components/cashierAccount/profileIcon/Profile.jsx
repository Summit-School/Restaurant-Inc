import "./Profile.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { GoSignOut } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    await localStorage.removeItem("cashier");
    navigate("/staff_login");
  };

  return (
    <div className="user-profile-icon">
      <NavDropdown
        title={
          <div className="pull-left">
            <span>Cashier Account</span>
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
