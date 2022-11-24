import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginStaff } from "../../../api/firebase/staff.api.ts";
import { toast } from "react-toastify";

const Login = () => {
  const [number, setNumber] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginFunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(number, loginPassword);
      const response = await loginStaff(number, loginPassword);
      // if (response) {
      //   toast.success("Login Successful");
      //   setLoading(false);
      //   navigate("/service");
      // }
      console.log(response);
    } catch (error) {
      setLoading(false);
      toast.error("Login Failed");
      console.error(error.message);
    }
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
              placeholder="Phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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
              {loading ? "Loading..." : " Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
