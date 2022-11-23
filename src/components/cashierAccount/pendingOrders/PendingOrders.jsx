import "./PendingOrders.css";
import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import { markOrderAsPaid } from "../../../api/firebase/cashier.api.ts";
import { toast } from "react-toastify";

const PendingOrders = () => {
  const [pendingList, setPendingList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      let orders = response.filter(
        (order) =>
          order.order &&
          (order.order.state === "ORDERED") | (order.order.state === "SERVED")
      );
      setPendingList(orders.reverse());
    });
  }, []);

  const confirmPay = async (order) => {
    setLoading(true);
    let user = {
      name: "Enow Divine",
      phone: 667241296,
    };

    try {
      const response = await markOrderAsPaid(order.order, user);
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

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Pending Orders</div>
      {pendingList
        ? pendingList.map((order, index) => {
            let drinkTotal = 0;
            let foodTotal = 0;
            order.order.drinks.map((drink) => {
              drinkTotal += drink.price * drink.quantity;
            });
            order.order.food.map((food) => {
              foodTotal += food.price * food.quantity;
            });
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
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <ul>
                      {order.order.food.map((item, index) => (
                        <li key={index}>
                          <span className="item">{item.itemName}</span>
                          <span className="item">{item.quantity}</span>
                          <span className="price">
                            {formatMoney(item.price * item.quantity)} FCFA
                          </span>
                        </li>
                      ))}

                      <li className="mt-3 total-list">
                        <span className="total">Total price</span>
                        <span className="total-price">
                          {formatMoney(foodTotal)} FCFA
                        </span>
                      </li>
                    </ul>

                    <ul>
                      {order.order.drinks.map((item, index) => (
                        <li key={index}>
                          <span className="item">{item.itemName}</span>
                          <span className="item">{item.quantity}</span>
                          <span className="price">
                            {formatMoney(item.price * item.quantity)} FCFA
                          </span>
                        </li>
                      ))}
                      <li className="mt-3 total-list">
                        <span className="total">Total price</span>
                        <span className="total-price">
                          {formatMoney(drinkTotal)} FCFA
                        </span>
                      </li>
                    </ul>
                    {order.order.state === "SERVED" ? (
                      <button
                        className="paid-btn"
                        onClick={() => confirmPay(order)}
                      >
                        {loading ? "Loading..." : "PAID"}
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })
        : "No Pending Oders"}
    </div>
  );
};

export default PendingOrders;
