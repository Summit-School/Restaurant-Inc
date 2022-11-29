import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const kitchen = JSON.parse(localStorage.getItem("kitchen"));

const ProtectKitchen = ({ children }) => {
  if (!kitchen) {
    toast.error("Inavlid User");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectKitchen;
