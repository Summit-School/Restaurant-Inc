import React from "react";
import KitchenLayout from "../../../components/kitchenLayout/KitchenLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingDelivery from "../../../components/kitchenAccount/pendingDelivery/PendingDelivery";
import { MdViewList, MdPendingActions } from "react-icons/md";

const KitchenDashboard = () => {
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
          <PendingDelivery />
        </div>
      </div>
    </KitchenLayout>
  );
};

export default KitchenDashboard;
