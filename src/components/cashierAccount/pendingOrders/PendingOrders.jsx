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
    const user = await JSON.parse(localStorage.getItem("cashier"));
    console.log(user);

    let userData = {
      name: user.name,
      phone: user.phone,
    };

    console.log(userData);

    try {
      const response = await markOrderAsPaid(order.order, userData);
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

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  const PrintReceipt = () => {
    //console.log('print');
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
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
                  <div id="printablediv" className="accordion-body">
                    <ul>
                      {order.order.food.length > 0
                        ? order.order.food.map((item, index) => (
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
                      {order.order.drinks.length > 0
                        ? order.order.drinks.map((item, index) => (
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
                    <button className="paid-btn m-2" onClick={PrintReceipt}>
                      PRINT
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

export default PendingOrders;
