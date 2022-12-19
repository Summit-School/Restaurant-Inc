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
      const response = await loginStaff(number, loginPassword);
      if (response) {
        toast.success("Login Successful");
        if (response.type === "CASHIER") {
          let cashier = {
            name: response.name,
            phone: response.phone,
            type: response.type,
          };
          localStorage.setItem("cashier", JSON.stringify(cashier));
          setLoading(false);
          navigate("/cashier");
        }
        if (response.type === "SERVICE") {
          let service = {
            name: response.name,
            phone: response.phone,
            type: response.type,
          };
          localStorage.setItem("service", JSON.stringify(service));
          setLoading(false);
          navigate("/service");
        }
        if (response.type === "KITCHEN") {
          let kitchen = {
            name: response.name,
            phone: response.phone,
            type: response.type,
          };
          localStorage.setItem("kitchen", JSON.stringify(kitchen));
          setLoading(false);
          navigate("/kitchen");
        }
        if (response.type === "COUNTER") {
          let counter = {
            name: response.name,
            phone: response.phone,
            type: response.type,
          };
          localStorage.setItem("counter", JSON.stringify(counter));
          setLoading(false);
          navigate("/counter");
        }
        if (response.type === "INVENTORY") {
          let inventory = {
            name: response.name,
            phone: response.phone,
            type: response.type,
          };
          localStorage.setItem("inventory", JSON.stringify(inventory));
          setLoading(false);
          navigate("/inventory");
        }
      }
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
          <img src="/images/logo.jpeg" alt="" />
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
