import "./CompletedOrders.css";

const CompletedOrders = () => {
  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="accordion" id="accordionExample">
      <div className="pending-heading">Completed Orders</div>
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
            Table number 13
            <span
              className="status"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Paid
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
                <span className="total-price">{formatMoney(20000)} FCFA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Table number 45
            <span
              className="status"
              style={{ backgroundColor: "green", color: "white" }}
            >
              Paid
            </span>
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
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
                <span className="total-price">{formatMoney(20000)} FCFA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Table number 42
            <span
              className="status"
              style={{ backgroundColor: "green", color: "white" }}
            >
              paid
            </span>
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
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
                <span className="total-price">{formatMoney(20000)} FCFA</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedOrders;
