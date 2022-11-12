import "./Login.css";
import { useState } from "react";
import ForgotPassword from "../../../components/auth/ForgotPassword";
import { Link } from "react-router-dom";

const Login = () => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <div className="login-wrapper">
      <div className="login-form-wrapper">
        <div className="logo">
          <img src="/images/Easy_pay.png" alt="" />
        </div>
        <h3>Easy Pay Login</h3>
        <form>
          <div className="email-div">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
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
        <p
          className="fp-link text-primary"
          onClick={() => setForgotPassword(true)}
        >
          Forgot Password?
        </p>
      </div>
      <ForgotPassword
        show={forgotPassword}
        onHide={() => setForgotPassword(false)}
      />
    </div>
  );
};

export default Login;
