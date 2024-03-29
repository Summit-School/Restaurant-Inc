import { useState, useEffect } from "react";
import {
  onSnapshotGetAllTables,
  serveOrder,
} from "../../../api/firebase/admin.api.ts";
import { toast } from "react-toastify";

const PendingOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);

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
            orderObj.drinks.length > 0 &&
            (orderObj.state === "ORDERED") | (orderObj.state === "SERVED")
        )
      );
      setAllOrders(finalOrders);
    });
  }, []);

  const servedOrder = async (order) => {
    console.log(order);
    setLoading(true);
    const user = await JSON.parse(localStorage.getItem("kitchen"));

    let userData = {
      name: user.name,
      phone: user.phone,
    };

    try {
      const response = await serveOrder(order, userData);
      if (response) {
        setLoading(false);
        toast.success("Order Served");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed");
      console.error(error);
    }
  };

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
                    data-bs-target={`#counterOne${indexKey}${index}`}
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Table number{" "}
                    {order.table.floor
                      ? order.table.number + " (" + order.table.floor + ")"
                      : order.table.number}
                    {/* {order.state === "ORDERED" ? (
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
                    )} */}
                  </button>
                </h2>
                <div
                  id={`counterOne${indexKey}${index}`}
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
                    {order.food.length <= 0 ? (
                      <button
                        className="paid-btn"
                        onClick={() => servedOrder(order)}
                      >
                        {loading ? "Loading..." : "SERVED"}
                      </button>
                    ) : (
                      ""
                    )}
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
