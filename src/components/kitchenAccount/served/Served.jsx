import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";

const Served = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [numberOfServed, setNumberOfServed] = useState(0);
  console.log(numberOfServed);

  useEffect(() => {
    onSnapshotGetAllTables((response) => {
      // Get all tables with orders
      let output = response.filter((output) => output.orders);

      // Filter tables and return the orders array
      let orders = [];
      output.map((order) => orders.push(order.orders));

      // Filter orders according to state
      let finalOrders = orders.map((order) =>
        order.filter((orderObj) => orderObj.state === "SERVED")
      );
      setAllOrders(finalOrders);

      let sumOfServedTables = 0;
      finalOrders.map((sum) => (sumOfServedTables += sum));
      setNumberOfServed(sumOfServedTables);
    });
  }, []);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Served</div>
      {numberOfServed
        ? allOrders.map((served, indexKey) =>
            served.map((order, index) => {
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
                      data-bs-target={`#collapseOne${indexKey}`}
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
                    id={`collapseOne${indexKey}`}
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
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
          )
        : "No Served Oders"}
    </div>
  );
};

export default Served;
