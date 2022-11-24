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
