import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const PendingOrders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
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
            (orderObj.state === "ORDERED") | (orderObj.state === "SERVED")
        )
      );
      setAllOrders(finalOrders);
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Orders</div>
      {allOrders.length > 0
        ? allOrders.map((pendingList, indexKey) =>
            pendingList.map((order, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#counterOne${indexKey}`}
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
                  id={`counterOne${indexKey}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      {order.drinks.map((item, index) => (
                        <li key={index}>
                          <span className="item">{item.itemName}</span>
                          <span className="item">
                            {item.quantity} Bottle(s)
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))
          )
        : "No Pending Oders"}
    </div>
  );
};

export default PendingOrders;
