import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import FoodList from "./FoodList";
import DrinkList from "./DrinkList";

const PendingTables = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const service = JSON.parse(localStorage.getItem("service"));
    onSnapshotGetAllTables((response) => {
      // Get all tables with orders
      let output = response.filter((output) => output.orders);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.orders));

      // Filter orders according to state
      let finalOrders = orders.map((order) =>
        order.filter(
          (orderObj) =>
            orderObj.service.phone === service.phone &&
            (orderObj.state === "ORDERED") | (orderObj.state === "SERVED")
        )
      );
      setAllOrders(finalOrders);
    });
  }, []);

  return (
    <div className="container service-pending-tables">
      <div className="accordion" id="accordionExample">
        <div className="pending-heading">Pending Tables</div>
        {allOrders.length > 0
          ? allOrders.map((pendingList) =>
              pendingList.map((order, index) => {
                return (
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
                );
              })
            )
          : "No Pending Oders"}
      </div>
    </div>
  );
};

export default PendingTables;
