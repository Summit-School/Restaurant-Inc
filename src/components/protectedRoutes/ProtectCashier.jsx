import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const cashier = JSON.parse(localStorage.getItem("cashier"));

const ProtectCashier = ({ children }) => {
  if (!cashier) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectCashier;
