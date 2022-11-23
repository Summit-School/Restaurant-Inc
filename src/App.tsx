import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import StaffLogin from "./pages/auth/staff_login/Login";
import Dashboard from "./pages/account/dashboard/Dashboard";
import Settings from "./pages/account/settings/Settings";
import Users from "./pages/account/users/Users";
import Menu from "./pages/account/menu/Menu";
import OrderHistory from "./pages/account/history/OrderHistory";
// Import For Waiters Account
import Tables from "./pages/service_account/tables/Tables";
import PendingTables from "./pages/service_account/pendingTables/PendingTables";
// Import For Cashiers Account
import CashierDashboard from "./pages/cashierAccount/dashboard/CashierDashboard";
import PendingOrders from "./pages/cashierAccount/pendingOrders/PendingOrders";
import PaidOrders from "./pages/cashierAccount/paidOrders/PaidOrders";

// Import For Kitchen Account
import KitchenDashboard from "./pages/kitchenAccount/dashboard/KitchenDashboard";
import PendingDelivery from "./pages/kitchenAccount/pendingDelivery/PendingDelivery";
import Served from "./pages/kitchenAccount/served/Served";

// Import For Counter Account
import CounterDashboard from "./pages/counterAccount/dashboard/CounterDashboard";
import ServedDrinks from "./pages/counterAccount/served/Served";

import PageError from "./pages/404/PageError";

// bringing in the toastify for it to work everywhere
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";

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

          {/*  STAFF LOGIN */}
          <Route path="/staff_login" element={<StaffLogin />} />

          {/* ROUTES FOR WAITERS ACCOUNT */}
          <Route path="/service" element={<Tables />} />
          <Route path="/service_dashboard" element={<Tables />} />
          <Route path="/pending_tables" element={<PendingTables />} />

          {/* ROUTES FOR CASHIER ACCOUNT */}
          <Route path="/cashier" element={<CashierDashboard />} />
          <Route path="/pending_orders" element={<PendingOrders />} />
          <Route path="/completed_orders" element={<PaidOrders />} />

          {/* ROUTES FOR KITCHEN ACCOUNT */}
          <Route path="/kitchen" element={<KitchenDashboard />} />
          <Route path="/pending_delivery" element={<PendingDelivery />} />
          <Route path="/served" element={<Served />} />

          {/* ROUTES FOR COUNTER ACCOUNT */}
          <Route path="/counter" element={<CounterDashboard />} />
          <Route path="/counter_orders" element={<ServedDrinks />} />

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
