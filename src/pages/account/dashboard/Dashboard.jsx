import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";

const Dashboard = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <Layout>
      <div className="dashboard-wrapper ">
        <div className="dashboard-scroller">
          <div className="dashboard-cards container">
            <DashboardCards
              icon={<FaUsers size={35} />}
              title="Total daily order"
              value={formatMoney(10265)}
              bgColor="lightgreen"
              cardColor="green"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="Total daily earnings"
              value={formatMoney(10265)}
              bgColor="cornflowerblue"
              cardColor="blue"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="Total monthly order"
              value={formatMoney(10265)}
              bgColor="darksalmon"
              cardColor="red"
            />
            <DashboardCards
              icon={<BiMoney size={35} />}
              title="Total monthly earnings"
              value={formatMoney(10265)}
              bgColor="khaki"
              cardColor="orange"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
