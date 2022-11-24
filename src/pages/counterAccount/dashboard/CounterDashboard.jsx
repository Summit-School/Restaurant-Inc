import React from "react";
import CounterLayout from "../../../components/counterLayout/CounterLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/counterAccount/pendingOrders/PendingOrders";
import { MdViewList, MdPendingActions } from "react-icons/md";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import { useState, useEffect } from "react";

const CounterDashboard = () => {
  const [pendingList, setPendingList] = useState([]);
  const [waitedList, setWaitedList] = useState([]);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter(
        (order) =>
          order.order &&
          (order.order.state === "ORDERED") | (order.order.state === "SERVED")
      );
      setPendingList(orders);

      let waited = response.filter(
        (order) => order.order && order.order.state === "PAID"
      );
      setWaitedList(waited);
    });
  }, []);

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
            value={formatMoney(pendingList.length)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total tables served"
            value={formatMoney(waitedList.length)}
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
