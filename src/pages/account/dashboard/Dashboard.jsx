import "./Dashboard.css";
import Layout from "../../../components/layout/Layout";
import { FaUsers } from "react-icons/fa";
import { BiMoney } from "react-icons/bi";
import { AiOutlineTransaction } from "react-icons/ai";
import DashboardCards from "../../../components/account/dashboardCards/DashboardCards";
import PendingOrders from "../../../components/account/pendingOrders/PendingOrders";
// import CompletedOrders from "../../../components/account/completedOrders/CompletedOrders";
import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import { getPaidOrders } from "../../../api/firebase/cashier.api.ts";

const Dashboard = () => {
  const [dailyOrder, setDailyOrder] = useState([]);
  const [dailyEarnings, setDailyEarnings] = useState(0);
  const [monthlyOrder, setMonthlyOrder] = useState([]);
  const [monthlyEarnings, setMonthlyEarnings] = useState(0);
  const [numberOfTables, setNumberOfTables] = useState([]);

  // GET THE TIMESTAMPS OF THE START AND END OF THE CURRENT DAY
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);

  // FIRST DAY AND LAST DAY OF THE CURRENT MONTH
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  useEffect(() => {
    getPaidOrders((response) => {
      // DAILY ORDERS
      let dailyOrders = response.filter(
        (order) =>
          order.timestamp >= startOfToday && order.timestamp <= endOfToday
      );
      setDailyOrder(dailyOrders);
      // GET DAILY PRICE
      let drinksPrice = 0;
      let foodPrice = 0;
      dailyOrders.map((order, index) => {
        order.drinks.map((drink) => {
          drinksPrice += drink.price * drink.quantity;
        });
        order.food.map((food) => {
          foodPrice += food.price * food.quantity;
        });
      });
      setDailyEarnings(drinksPrice + foodPrice);

      // MONTHLY ORDERS
      let monthlyOrders = response.filter(
        (order) => order.timestamp >= firstDay && order.timestamp <= lastDay
      );
      setMonthlyOrder(monthlyOrders);
      // GET MONTHLY PRICE
      let monthlyDrinksPrice = 0;
      let monthlyFoodPrice = 0;
      monthlyOrders.map((order, index) => {
        order.drinks.map((drink) => {
          monthlyDrinksPrice += drink.price * drink.quantity;
        });
        order.food.map((food) => {
          monthlyFoodPrice += food.price * food.quantity;
        });
      });
      setMonthlyEarnings(monthlyDrinksPrice + monthlyFoodPrice);

      // GET ALL TABLES
      onSnapshotGetAllTables((response) => {
        setNumberOfTables(response);
      });
    });
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
              value={formatMoney(dailyOrder.length)}
              bgColor="lightgreen"
              cardColor="green"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="Total daily earnings"
              value={formatMoney(dailyEarnings)}
              bgColor="cornflowerblue"
              cardColor="blue"
            />
            <DashboardCards
              icon={<AiOutlineTransaction size={35} />}
              title="Total monthly order"
              value={formatMoney(monthlyOrder.length)}
              bgColor="darksalmon"
              cardColor="red"
            />
            <DashboardCards
              icon={<BiMoney size={35} />}
              title="Total monthly earnings"
              value={formatMoney(monthlyEarnings)}
              bgColor="khaki"
              cardColor="orange"
            />
            <DashboardCards
              icon={<BiMoney size={35} />}
              title="Total number of tables"
              value={formatMoney(numberOfTables.length)}
              bgColor="lightgrey"
              cardColor="grey"
            />
          </div>
          <div className="order-status container">
            <div className="pending-order">
              <PendingOrders />
            </div>
            {/* <div className="completed-order">
              <CompletedOrders />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
