import { useState, useEffect } from "react";
import {
  onSnapshotGetAllTables,
  serveOrder,
} from "../../../api/firebase/admin.api.ts";
import { toast } from "react-toastify";

const PendingDelivery = () => {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter(
        (order) => order.order && order.order.state === "ORDERED"
      );
      setPendingList(orders.reverse());
    });
  }, []);

  const servedOrder = async (order) => {
    setLoading(true);
    const user = await JSON.parse(localStorage.getItem("kitchen"));

    let userData = {
      name: user.name,
      phone: user.phone,
    };

    try {
      const response = await serveOrder(order.order, userData);
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
      <div className="pending-heading">Pending Delivery</div>
      {pendingList
        ? pendingList.map((order, index) => {
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
                    Table number {order.order.table.id}
                    {order.order.state === "ORDERED" ? (
                      <span
                        className="status"
                        style={{ backgroundColor: "yellow", color: "grey" }}
                      >
                        {order.order.state}
                      </span>
                    ) : order.order.state === "SERVED" ? (
                      <span
                        className="status"
                        style={{ backgroundColor: "blue", color: "white" }}
                      >
                        {order.order.state}
                      </span>
                    ) : (
                      <span
                        className="status"
                        style={{ backgroundColor: "green", color: "white" }}
                      >
                        {order.order.state}
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
                    <ul>
                      {order.order.food.map((item, index) => (
                        <li key={index}>
                          <span className="item">{item.itemName} Plates</span>
                          <span className="item">{item.quantity} Plates</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="paid-btn"
                      onClick={() => servedOrder(order)}
                    >
                      {loading ? "Loading..." : "SERVED"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        : "No Pending Oders"}
    </div>
  );
};

export default PendingDelivery;
