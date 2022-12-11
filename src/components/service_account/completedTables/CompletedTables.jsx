import { useState, useEffect } from "react";
import {
  onSnapshotGetAllTables,
  // freeTable,
} from "../../../api/firebase/admin.api.ts";
// import { toast } from "react-toastify";
import FoodList from "./FoodList";
import DrinkList from "./DrinkList";

const CompletedTables = () => {
  const [allOrders, setAllOrders] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      // Get all tables with orders
      let output = response.filter((output) => output.orders);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.orders));

      // Filter orders according to state
      let finalOrders = orders.map((order) =>
        order.filter((orderObj) => orderObj.state === "PAID")
      );
      setAllOrders(finalOrders);
    });
  }, []);

  // action to free tables
  // const freeTableAction = async (order) => {
  //   console.log(order.order);
  //   try {
  //     const response = await freeTable(order.order);
  //     if (response) {
  //       setLoading(false);
  //       toast.success("Table Freed");
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error("Failed");
  //     console.error(error);
  //   }
  // };

  return (
    <div className="container service-pending-tables">
      <div className="accordion" id="accordionExample">
        <div className="pending-heading">Paid Orders</div>
        {allOrders.length > 0
          ? allOrders.map((completed) =>
              completed.map((order, index) => {
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
                        Table number {order.table.id}
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
                        {/* <button
                        className="paid-btn"
                        onClick={() => freeTableAction(order)}
                      >
                        {loading ? "Loading..." : "Free Table"}
                      </button> */}
                      </div>
                    </div>
                  </div>
                );
              })
            )
          : "No Completed Oders"}
      </div>
    </div>
  );
};

export default CompletedTables;
