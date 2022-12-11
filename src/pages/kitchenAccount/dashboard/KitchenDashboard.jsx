import React from "react";
import { useState, useEffect } from "react";
import KitchenLayout from "../../../components/kitchenLayout/KitchenLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingDelivery from "../../../components/kitchenAccount/pendingDelivery/PendingDelivery";
import { MdViewList, MdPendingActions } from "react-icons/md";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const KitchenDashboard = () => {
  const [numberOfOrdered, setNumberOfOrdered] = useState(0);
  const [numberOfServed, setNumberOfServed] = useState(0);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      // Get all tables with orders
      let output = response.filter((output) => output.orders);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.orders));

      // Filter orders according to state
      let ordered = orders.map(
        (order) =>
          order.filter((orderObj) => orderObj.state === "ORDERED").length
      );

      let served = orders.map(
        (order) =>
          order.filter((orderObj) => orderObj.state === "SERVED").length
      );

      let sumOfOrderedTables = 0;
      ordered.map((sum) => (sumOfOrderedTables += sum));
      setNumberOfOrdered(sumOfOrderedTables);

      let sumOfServedTables = 0;
      served.map((sum) => (sumOfServedTables += sum));
      setNumberOfServed(sumOfServedTables);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <KitchenLayout>
      <div className="container">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<MdPendingActions size={35} />}
            title="Total pending delivery"
            value={formatMoney(numberOfOrdered)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total tables served"
            value={formatMoney(numberOfServed)}
            bgColor="lightgrey"
            cardColor="grey"
          />
        </div>
        <div className="pending-orders">
          <PendingDelivery />
        </div>
      </div>
    </KitchenLayout>
  );
};

export default KitchenDashboard;
