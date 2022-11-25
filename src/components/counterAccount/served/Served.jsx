import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const Served = () => {
  const [pendingList, setPendingList] = useState([]);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter(
        (order) => order.order && order.order.state === "PAID"
      );
      setPendingList(orders.reverse());
    });
  }, []);

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Served</div>
      {pendingList.length > 0
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
                      {order.order.drinks.map((item, index) => (
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
            );
          })
        : "No Served Oders"}
    </div>
  );
};

export default Served;
