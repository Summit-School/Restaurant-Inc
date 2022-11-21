import React from "react";
import CounterLayout from "../../../components/counterLayout/CounterLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/counterAccount/pendingOrders/PendingOrders";
import { MdViewList, MdPendingActions } from "react-icons/md";

const CounterDashboard = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <CounterLayout>
      <div className="container">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<MdPendingActions size={35} />}
            title="Total pending delivery"
            value={formatMoney(10)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total tables served"
            value={formatMoney(58)}
            bgColor="lightgrey"
            cardColor="grey"
          />
        </div>
        <div className="pending-orders">
          <PendingOrders />
        </div>
      </div>
    </CounterLayout>
  );
};

export default CounterDashboard;
