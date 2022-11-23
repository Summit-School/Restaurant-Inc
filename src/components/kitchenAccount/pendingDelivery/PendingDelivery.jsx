import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const PendingDelivery = () => {
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter((order) => order.order);
      console.log(orders);
      setPendingList(orders.reverse());
    });
  }, []);

  const serveOrder = () => {};

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
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Table number {order.order.table.id}
                    <span
                      className="status"
                      style={{ backgroundColor: "yellow", color: "grey" }}
                    >
                      {order.order.state}
                    </span>
                  </button>
                </h2>
                <div
                  id="collapseOne"
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
                    <button className="paid-btn" onClick={serveOrder}>
                      SERVED
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
