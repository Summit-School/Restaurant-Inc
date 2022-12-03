import "./RecordBoard.css";
import DashboardCards from "../../dashboardCards/DashboardCards";
import { SiIfood } from "react-icons/si";
import { useState, useEffect } from "react";
import { fetchAllOrders } from "../../../../api/firebase/admin.api.ts";

const RecordBoard = ({ phoneNumber }) => {
  const [dailyOrder, setDailyOrder] = useState([]);
  const [weeklyOrder, setWeeklyOrder] = useState([]);
  const [monthlyOrder, setMonthlyOrder] = useState([]);

  // GET THE TIMESTAMPS OF THE START AND END OF THE CURRENT DAY
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);

  // GET THE FIRST AND LAST DAY OF THE WEEK
  var today = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );
  var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()));

  // FIRST DAY AND LAST DAY OF THE CURRENT MONTH
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastDay = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  useEffect(() => {
    fetchAllOrders((response) => {
      // DAILY ORDERS
      let dailyOrders = response.filter(
        (order) =>
          order.order &&
          order.order.timestamp >= startOfToday &&
          order.order.timestamp <= endOfToday &&
          order.order.service.phone === phoneNumber
      );
      setDailyOrder(dailyOrders);

      // WEEKLY ORDERS
      let weeklyOrders = response.filter(
        (order) =>
          order.order &&
          order.order.timestamp >= lastSunday &&
          order.order.timestamp <= endOfToday &&
          order.order.service.phone === phoneNumber
      );
      setWeeklyOrder(weeklyOrders);

      // MONTHLY ORDERS
      let monthlyOrders = response.filter(
        (order) =>
          order.order &&
          order.order.timestamp >= firstDay &&
          order.order.timestamp <= lastDay &&
          order.order.service.phone === phoneNumber
      );
      setMonthlyOrder(monthlyOrders);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="waiter-record-cards">
      <DashboardCards
        title={"Daily Order(s)"}
        icon={<SiIfood size={30} />}
        bgColor="lightblue"
        value={formatMoney(dailyOrder.length)}
        className="record-card"
      />
      <DashboardCards
        title={"Weekly Order(s)"}
        icon={<SiIfood size={30} />}
        bgColor="lightgreen"
        value={formatMoney(weeklyOrder.length)}
      />
      <DashboardCards
        title={"Monthly Order(s)"}
        icon={<SiIfood size={30} />}
        bgColor="yellow"
        value={formatMoney(monthlyOrder.length)}
      />
    </div>
  );
};

export default RecordBoard;
