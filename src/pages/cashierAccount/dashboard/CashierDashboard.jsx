import "./CashierDashboard.css";
import { useState, useEffect } from "react";
import CashierLayout from "../../../components/cashierLayout/CashierLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/cashierAccount/pendingOrders/PendingOrders";
import { MdViewList } from "react-icons/md";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const CashierDashboard = () => {
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
    <CashierLayout>
      <div className="container">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total pending orders"
            value={formatMoney(pendingList.length)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total completed orders"
            value={formatMoney(waitedList.length)}
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
