import "./CashierDashboard.css";
import { useState, useEffect } from "react";
import CashierLayout from "../../../components/cashierLayout/CashierLayout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/cashierAccount/pendingOrders/PendingOrders";
import { MdViewList } from "react-icons/md";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const CashierDashboard = () => {
  const [numberOfPending, setNumberOfPending] = useState(0);
  const [numberOfPaid, setNumberOfPaid] = useState(0);

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
          order.filter(
            (orderObj) =>
              (orderObj.state === "ORDERED") | (orderObj.state === "SERVED")
          ).length
      );

      let paid = orders.map(
        (order) => order.filter((orderObj) => orderObj.state === "PAID").length
      );

      let sumOfOrderedTables = 0;
      ordered.map((sum) => (sumOfOrderedTables += sum));
      setNumberOfPending(sumOfOrderedTables);

      let sumOfServedTables = 0;
      paid.map((sum) => (sumOfServedTables += sum));
      setNumberOfPaid(sumOfServedTables);
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
            value={formatMoney(numberOfPending)}
            bgColor="khaki"
            cardColor="orange"
          />
          <DashboardCards
            icon={<MdViewList size={35} />}
            title="Total completed orders"
            value={formatMoney(numberOfPaid)}
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
