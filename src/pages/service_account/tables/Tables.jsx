import "./Tables.css";
import { useState, useEffect } from "react";
import Layout from "../../../components/service_layout/Layout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import Tables from "../../../components/service_account/tables/Tables";
import { AiOutlineTable } from "react-icons/ai";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import { getPaidOrders } from "../../../api/firebase/cashier.api.ts";

const TablesPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const [waitedList, setWaitedList] = useState([]);

  // GET THE TIMESTAMPS OF THE START AND END OF THE CURRENT DAY
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      // Get all tables with orders
      let output = response.filter((output) => output.orders);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.orders));

      // Filter orders according to state
      let pending = orders.map((order) =>
        order.filter(
          (orderObj) =>
            (orderObj.state === "ORDERED") | (orderObj.state === "SERVED")
        )
      );
      let numberOfPending = 0;
      pending.map((orderArr) => (numberOfPending += orderArr.length));
      setPendingList(numberOfPending);
    });

    getPaidOrders((response) => {
      // Get all tables with orders
      let output = response.filter(
        (output) =>
          output.timestamp >= startOfToday && output.timestamp <= endOfToday
      );
      setWaitedList(output);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <Layout>
      <div className="container table-page-wrapper">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<AiOutlineTable size={35} />}
            title="Total pending tables"
            value={formatMoney(pendingList)}
            bgColor="lightgreen"
            cardColor="green"
          />
          <DashboardCards
            icon={<AiOutlineTable size={35} />}
            title="Total waited tables"
            value={formatMoney(waitedList.length)}
            bgColor="cornflowerblue"
            cardColor="blue"
          />
        </div>
        <div className="table-numbers">
          <p>Select table</p>
          <Tables />
        </div>
      </div>
    </Layout>
  );
};

export default TablesPage;
