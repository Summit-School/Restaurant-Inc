import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/account/pendingOrders/PendingOrders";
import CompletedOrders from "../../../components/account/completedOrders/CompletedOrders";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

const Dashboard = () => {
  // const count = useSelector((state: RootState) => state.counter.value);
  // const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, []);

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
            <DashboardCards
              icon={<BiMoney size={35} />}
              title="Total number of tables"
              value={formatMoney(58)}
              bgColor="lightgrey"
              cardColor="grey"
            />
          </div>
          <div className="order-status container">
            <div className="pending-order">
              <PendingOrders />
            </div>
            <div className="completed-order">
              <CompletedOrders />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
