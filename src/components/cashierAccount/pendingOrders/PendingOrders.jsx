import "./PendingOrders.css";
import { useState, useEffect } from "react";
import { onSnapshotGetAllTables } from "../../../api/firebase/admin.api.ts";
import { markOrderAsPaid } from "../../../api/firebase/cashier.api.ts";
import Print from "../printReceipt/Print";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PendingOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [print, setPrint] = useState("");

  const navigate = useNavigate();

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

  const confirmPay = async (order) => {
    console.log(order);
    setLoading(true);
    const user = await JSON.parse(localStorage.getItem("cashier"));

    let userData = {
      name: user.name,
      phone: user.phone,
    };

    try {
      const response = await markOrderAsPaid(order, userData);
      if (response) {
        setLoading(false);
        toast.success("Order Paid");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed");
      console.error(error);
    }
  };
  const PrintAction = async (printDetails) => {
    console.log(printDetails);
    navigate("/print", { state: { details: printDetails } });
  };

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Pending Orders</div>
      {allOrders.length > 0
        ? allOrders.map((pendingList, indexKey) =>
            pendingList.map((order, index) => {
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
                      data-bs-target={`#collapseCashierOne${indexKey}${index}`}
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
                    id={`collapseCashierOne${indexKey}${index}`}
                    className="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <ul>
                        {order.food.length > 0
                          ? order.food.map((item, index) => (
                              <li key={index}>
                                <span className="item">{item.itemName}</span>
                                <span className="item">{item.quantity}</span>
                                <span className="price">
                                  {formatMoney(item.price * item.quantity)} FCFA
                                </span>
                              </li>
                            ))
                          : "No Order Made"}

                        <li className="mt-3 total-list">
                          <span className="total">Total price</span>
                          <span className="total-price">
                            {formatMoney(foodTotal)} FCFA
                          </span>
                        </li>
                      </ul>

                      <ul>
                        {order.drinks.length > 0
                          ? order.drinks.map((item, index) => (
                              <li key={index}>
                                <span className="item">{item.itemName}</span>
                                <span className="item">{item.quantity}</span>
                                <span className="price">
                                  {formatMoney(item.price * item.quantity)} FCFA
                                </span>
                              </li>
                            ))
                          : "No Order Made"}
                        <li className="mt-3 total-list">
                          <span className="total">Total price</span>
                          <span className="total-price">
                            {formatMoney(drinkTotal)} FCFA
                          </span>
                        </li>
                      </ul>
                      {order.state === "SERVED" ? (
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

                    <button
                      className="paid-btn m-2"
                      onClick={() =>
                        PrintAction({ order, drinkTotal, foodTotal })
                      }
                    >
                      PRINT
                    </button>
                  </div>
                </div>
              );
            })
          )
        : "No Oders Found"}
      <div className="print-component">
        <Print order={print} />
      </div>
    </div>
  );
};

export default PendingOrders;
