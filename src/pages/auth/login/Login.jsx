import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginNumber, setLoginNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();

  const loginFunction = (e) => {
    e.preventDefault();
    const authData = {
      number: loginNumber,
      password: loginPassword,
    };

    console.log(authData);

    navigate("/dashboard");
  };
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
              value={loginNumber}
              onChange={(e) => setLoginNumber(e.target.value)}
            />
          </div>
          <div className="password-div">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="submit-button">
            <button
              className="form-control bg-primary text-light font-weight-bold mt-4"
              onClick={loginFunction}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
