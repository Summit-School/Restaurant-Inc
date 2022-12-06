import React from "react";
import { useState, useEffect } from "react";

const ReleasedStock = () => {
  const [stock, setStock] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
  ]);

  const formatMoney = (amount) => {
    let dollarUSLocale = Intl.NumberFormat("en-US");
    return dollarUSLocale.format(amount);
  };

  return (
    <div className="stock-table">
      <table id="stock-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Initial Quantity(Creates/Bags)</th>
            <th>Total Price</th>
            <th>Final Quantity(Creates/Bags)</th>
            <th>Amount Sold</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0
            ? stock.map((item, index) => (
                <tr>
                  <td>Fanta</td>
                  <td>Juice</td>
                  <td>{formatMoney(30000)}</td>
                  <td>{formatMoney(30000)}</td>
                  <td>{formatMoney(30000)}</td>
                  <td>{formatMoney(30000)}</td>
                </tr>
              ))
            : "No Stock Item Found"}
        </tbody>
      </table>
    </div>
  );
};

export default ReleasedStock;
