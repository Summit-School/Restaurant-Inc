import { useState, useEffect } from "react";
import Moment from "react-moment";
import { getPaidOrders } from "../../../api/firebase/cashier.api.ts";

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    getPaidOrders((response) => {
      console.log(response);
      // Get all tables with orders
      let output = response.filter((output) => output.order);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.order));
      setAllOrders(orders);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Order History</div>
      {allOrders.length > 0
        ? allOrders.map((order, index) => {
            let drinkTotal = 0;
            let foodTotal = 0;
            order.drinks.map((drink) => {
              drinkTotal += drink.price * drink.quantity;
            });
            order.food.map((food) => {
              foodTotal += food.price * food.quantity;
            });
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
                    <p>
                      Order From {order.service.name} on{" "}
                      <Moment format="HH:mm - DD:MM:YYYY ">
                        {order.timestamp}
                      </Moment>
                    </p>
                    <ul>
                      {order.food.map((item, index) => (
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
                      {order.drinks.map((item, index) => (
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
                  </div>
                </div>
              </div>
            );
          })
        : "No Oders History"}
    </div>
  );
};

export default OrderHistory;
