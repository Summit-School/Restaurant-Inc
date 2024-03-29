import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../../api/firebase/auth.api.ts";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loginFunction = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await loginAdmin(email, loginPassword);
      if (response.email === email) {
        localStorage.setItem("admin", JSON.stringify(response.email));
        await navigate("/dashboard");
        setLoading(false);
        toast.success("Login Successful");
      }
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
          <img src="/images/logo.jpeg" alt="" />
        </div>
        <form>
          <div className="email-div">
            <input
              className="form-control"
              type="email"
              placeholder="Email Address"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password-div">
            <input
              className="form-control mt-2"
              type="password"
              placeholder="Password"
              autoComplete="on"
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
