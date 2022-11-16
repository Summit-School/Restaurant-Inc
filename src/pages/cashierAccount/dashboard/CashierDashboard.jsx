import React from "react";
import CashierLayout from "../../../components/cashierLayout/CashierLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/cashierAccount/pendingOrders/PendingOrders";
import { MdViewList } from "react-icons/md";

const CashierDashboard = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <CashierLayout>
      <div className="container">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total pending orders"
            value={formatMoney(10)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total completed orders"
            value={formatMoney(58)}
            bgColor="lightgrey"
            cardColor="grey"
          />
        </div>
        <div className="pending-orders">
          <PendingOrders />
        </div>
      </div>
    </CashierLayout>
  );
};

export default CashierDashboard;
