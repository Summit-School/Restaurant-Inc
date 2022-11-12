import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <div className="logo">
          <img src="/images/logo.jpg" alt="" />
        </div>
        <form>
          <div className="email-div">
            <input
              className="form-control"
              type="number"
              placeholder="Phone Number"
            />
          </div>
          <div className="password-div">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="submit-button">
            <Link to="/dashboard">
              <button className="form-control bg-primary text-light font-weight-bold mt-4">
                Login
              </button>
            </Link>
          </div>
        </form>
        {/* <p
          className="fp-link text-primary"
          onClick={() => setForgotPassword(true)}
        >
          Forgot Password?
        </p> */}
      </div>
    </div>
  );
};

export default Login;
