import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const inventory = JSON.parse(localStorage.getItem("inventory"));

const ProtectInventory = ({ children }) => {
  if (!inventory) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectInventory;
