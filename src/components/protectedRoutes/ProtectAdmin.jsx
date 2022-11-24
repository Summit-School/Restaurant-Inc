import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const admin = JSON.parse(localStorage.getItem("admin"));
const staff = JSON.parse(localStorage.getItem("staff"));

const ProtectAdmin = ({ children }) => {
  if (!admin) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

const ProtectStaff = ({ children }) => {
  if (!staff) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectAdmin;
// export default ProtectStaff
