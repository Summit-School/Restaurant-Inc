import { useState } from "react";

const OrderHistory = () => {
  const [history] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ]);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Order History</div>
      {history
        ? history.map((history_item, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Table number 23
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p>Order sent by username on timestamp</p>
                  <ul>
                    <li>
                      <span className="item">Fried rice</span>
                      <span className="price">{formatMoney(1000)} FCFA</span>
                    </li>
                    <li>
                      <span className="item">Garri and Eru</span>
                      <span className="price">{formatMoney(1000)} FCFA</span>
                    </li>
                    <li className="mt-3 total-list">
                      <span className="total">Total price</span>
                      <span className="total-price">
                        {formatMoney(20000)} FCFA
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))
        : "<p>No History Found</p>"}
    </div>
  );
};

export default OrderHistory;
