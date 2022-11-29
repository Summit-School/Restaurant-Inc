import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const service = JSON.parse(localStorage.getItem("service"));

const ProtectService = ({ children }) => {
  if (!service) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectService;
