import "./Tables.css";
import { useState, useEffect } from "react";
import Layout from "../../../components/service_layout/Layout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import Tables from "../../../components/service_account/tables/Tables";
import { AiOutlineTable } from "react-icons/ai";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const TablesPage = () => {
  const [pendingList, setPendingList] = useState([]);
  const [waitedList, setWaitedList] = useState([]);

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
      setPendingList(pending);

      let waited = orders.map(
        (order) => order.filter((orderObj) => orderObj.state === "PAID").length
      );

      let sumOfWaitedTables = 0;
      waited.map((sum) => (sumOfWaitedTables += sum));
      setWaitedList(sumOfWaitedTables);
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
            value={formatMoney(pendingList.length)}
            bgColor="lightgreen"
            cardColor="green"
          />
          <DashboardCards
            icon={<AiOutlineTable size={35} />}
            title="Total waited tables"
            value={formatMoney(waitedList)}
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
