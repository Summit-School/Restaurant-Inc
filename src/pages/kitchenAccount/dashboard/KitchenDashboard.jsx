import React from "react";
import { useState, useEffect } from "react";
import KitchenLayout from "../../../components/kitchenLayout/KitchenLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingDelivery from "../../../components/kitchenAccount/pendingDelivery/PendingDelivery";
import { MdViewList, MdPendingActions } from "react-icons/md";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const KitchenDashboard = () => {
  const [pendingList, setPendingList] = useState([]);
  const [waitedList, setWaitedList] = useState([]);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter(
        (order) => order.order && order.order.state === "ORDERED"
      );
      setPendingList(orders);

      let waited = response.filter(
        (order) => order.order && order.order.state === "SERVED"
      );
      setWaitedList(waited);
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
          <PendingDelivery />
        </div>
      </div>
    </KitchenLayout>
  );
};

export default KitchenDashboard;
