import { useState, useEffect } from "react";
import { getPaidOrders } from "../../../api/firebase/cashier.api.ts";
import FoodList from "./FoodList";
import DrinkList from "./DrinkList";

const CompletedTables = () => {
  const [allOrders, setAllOrders] = useState([]);
  console.log(allOrders);

  // GET THE TIMESTAMPS OF THE START AND END OF THE CURRENT DAY
  const startOfToday = new Date().setHours(0, 0, 0, 0);
  const endOfToday = new Date().setHours(23, 59, 59, 999);

  useEffect(() => {
    getPaidOrders((response) => {
      // Get all tables with orders
      let output = response.filter(
        (output) =>
          output.order &&
          output.order.timestamp >= startOfToday &&
          output.order.timestamp <= endOfToday
      );

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.order));
      setAllOrders(orders);
    });
  }, []);

  return (
    <div className="container service-pending-tables">
      <div className="accordion" id="accordionExample">
        <div className="pending-heading">Paid Orders</div>
        {allOrders
          ? allOrders.map((order, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapseOne${index}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Table number{" "}
                    {order.table.floor
                      ? order.table.number + " (" + order.table.floor + ")"
                      : order.table.number}
                    {order.state === "ORDERED" ? (
                      <span
                        className="status"
                        style={{ backgroundColor: "yellow", color: "grey" }}
                      >
                        {order.state}
                      </span>
                    ) : order.state === "SERVED" ? (
                      <span
                        className="status"
                        style={{ backgroundColor: "blue", color: "white" }}
                      >
                        {order.state}
                      </span>
                    ) : (
                      <span
                        className="status"
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        {order.state}
                      </span>
                    )}
                  </button>
                </h2>
                <div
                  id={`collapseOne${index}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <FoodList order={order} />
                    <DrinkList order={order} />
                  </div>
                </div>
              </div>
            ))
          : "No Completed Oders"}
      </div>
    </div>
  );
};

export default CompletedTables;
