import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const counter = JSON.parse(localStorage.getItem("counter"));

const ProtectCounter = ({ children }) => {
  if (!counter) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectCounter;
