import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Dashboard from "./pages/account/dashboard/Dashboard";
import Settings from "./pages/account/settings/Settings";
import Users from "./pages/account/users/Users";
import Menu from "./pages/account/menu/Menu";
import OrderHistory from "./pages/account/history/OrderHistory";
import Tables from "./pages/service_account/tables/Tables";

import PageError from "./pages/404/PageError";

// bringing in the toastify for it to work everywhere
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/staff" element={<Users />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order_history" element={<OrderHistory />} />

          <Route path="/service_account" element={<Tables />} />
          <Route path="/service_dashboard" element={<Tables />} />

          {/* 404 ROUTE */}
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      {/* USING THE TOASTIFY CONTAINER */}
      <ToastContainer />
    </div>
  );
}

export default App;
