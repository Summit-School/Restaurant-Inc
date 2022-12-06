import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import StaffLogin from "./pages/auth/staffLogin/Login";
import Dashboard from "./pages/account/dashboard/Dashboard";
import Settings from "./pages/account/settings/Settings";
import Users from "./pages/account/users/Users";
import Menu from "./pages/account/menu/Menu";
import OrderHistory from "./pages/account/history/OrderHistory";
import Attendance from "./pages/account/attendance/Attendance";

// Import For Waiters Account
import Tables from "./pages/service_account/tables/Tables";
import PendingTables from "./pages/service_account/pendingTables/PendingTables";
import ServedTables from "./pages/service_account/servedTables/ServedTables";

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

// Import For Inventory Account
import InventoryDashboard from "./pages/inventoryAccount/dashboard/InventoryDashboard";
import InitialStock from "./pages/inventoryAccount/initialStock/InitialStock";
import AddItem from "./pages/inventoryAccount/item/AddItem";
import ReleasedStock from "./pages/inventoryAccount/releasedStock/ReleasedStock";
import ReleaseStock from "./pages/inventoryAccount/releaseStock/ReleaseStock";

import PageError from "./pages/404/PageError";

// bringing in the toastify for it to work everywhere
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect } from "react";
import OneSignal from "react-onesignal";

// routes protection
import ProtectAdmin from "./components/protectedRoutes/ProtectAdmin";
import ProtectCashier from "./components/protectedRoutes/ProtectCashier";
import ProtectCounter from "./components/protectedRoutes/ProtectCounter";
import ProtectService from "./components/protectedRoutes/ProtectService";
import ProtectKitchen from "./components/protectedRoutes/ProtectKitchen";
import Print from "./components/cashierAccount/printReceipt/Print";

function App() {
  useEffect(() => {
    // OneSignal.init({
    //   appId: "f1137cf2-0598-4989-bc86-4f6e34a44242",
    // });
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* UNPROTECTED ROUTES */}
          <Route path="/admin" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectAdmin>
                <Dashboard />
              </ProtectAdmin>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectAdmin>
                <Settings />
              </ProtectAdmin>
            }
          />
          <Route
            path="/staff"
            element={
              <ProtectAdmin>
                <Users />
              </ProtectAdmin>
            }
          />
          <Route
            path="/menu"
            element={
              <ProtectAdmin>
                <Menu />
              </ProtectAdmin>
            }
          />
          <Route
            path="/order_history"
            element={
              <ProtectAdmin>
                <OrderHistory />
              </ProtectAdmin>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectAdmin>
                <Attendance />
              </ProtectAdmin>
            }
          />

          {/*  STAFF LOGIN */}
          <Route path="/" element={<StaffLogin />} />

          {/* ROUTES FOR WAITERS ACCOUNT */}
          <Route
            path="/service"
            element={
              <ProtectService>
                <Tables />
              </ProtectService>
            }
          />
          <Route
            path="/service_dashboard"
            element={
              <ProtectService>
                <Tables />
              </ProtectService>
            }
          />
          <Route
            path="/pending_tables"
            element={
              <ProtectService>
                <PendingTables />
              </ProtectService>
            }
          />
          <Route
            path="/served_tables"
            element={
              <ProtectService>
                <ServedTables />
              </ProtectService>
            }
          />

          {/* ROUTES FOR CASHIER ACCOUNT */}
          <Route
            path="/cashier"
            element={
              <ProtectCashier>
                <CashierDashboard />
              </ProtectCashier>
            }
          />
          <Route
            path="/pending_orders"
            element={
              <ProtectCashier>
                <PendingOrders />
              </ProtectCashier>
            }
          />
          <Route
            path="/completed_orders"
            element={
              <ProtectCashier>
                <PaidOrders />
              </ProtectCashier>
            }
          />
          <Route
            path="/print"
            element={
              <ProtectCashier>
                <Print />
              </ProtectCashier>
            }
          />

          {/* ROUTES FOR KITCHEN ACCOUNT */}
          <Route
            path="/kitchen"
            element={
              <ProtectKitchen>
                <KitchenDashboard />
              </ProtectKitchen>
            }
          />
          <Route
            path="/pending_delivery"
            element={
              <ProtectKitchen>
                <PendingDelivery />
              </ProtectKitchen>
            }
          />
          <Route
            path="/served"
            element={
              <ProtectKitchen>
                <Served />
              </ProtectKitchen>
            }
          />

          {/* ROUTES FOR COUNTER ACCOUNT */}
          <Route
            path="/counter"
            element={
              <ProtectCounter>
                <CounterDashboard />
              </ProtectCounter>
            }
          />
          <Route
            path="/counter_orders"
            element={
              <ProtectCounter>
                <ServedDrinks />
              </ProtectCounter>
            }
          />

          {/* ROUTES FOR INVENTORY ACCOUNT */}
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/stock" element={<InitialStock />} />
          <Route path="/add_item_to_stock" element={<AddItem />} />
          <Route path="/released_stock" element={<ReleasedStock />} />
          <Route path="/release_stock" element={<ReleaseStock />} />

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
