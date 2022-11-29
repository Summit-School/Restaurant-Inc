import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const admin = JSON.parse(localStorage.getItem("admin"));

const ProtectAdmin = ({ children }) => {
  if (!admin) {
    toast.error("Inavlid User");
    return <Navigate to="/admin" />;
  }
  return <>{children}</>;
};

export default ProtectAdmin;
