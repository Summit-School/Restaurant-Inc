import "./Tables.css";
import Layout from "../../../components/service_layout/Layout";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import Tables from "../../../components/service_account/tables/Tables";
import { FaUsers } from "react-icons/fa";

const TablesPage = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <Layout>
      <div className="container table-page-wrapper">
        <div className="dashboard-cards">
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="Total pending tables"
            value={formatMoney(10)}
            bgColor="lightgreen"
            cardColor="green"
          />
          <DashboardCards
            icon={<FaUsers size={35} />}
            title="Total waited tables"
            value={formatMoney(14)}
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
