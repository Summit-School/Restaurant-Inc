import React from "react";

const PendingTables = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };
  return (
    <div className="container service-pending-tables">
      <div className="accordion" id="accordionExample">
        <div className="pending-heading">Pending Tables</div>
        <div className="accordion-item">
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
              <span
                className="status"
                style={{ backgroundColor: "yellow", color: "grey" }}
              >
                pending
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
                  <span className="total-price">{formatMoney(20000)} FCFA</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingTables;
