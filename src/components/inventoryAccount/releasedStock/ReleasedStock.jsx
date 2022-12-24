import React from "react";
import { useState, useEffect } from "react";
import { getAllReleasedItems } from "../../../api/firebase/inventory.api.ts";

const ReleasedStock = () => {
  const [releasedStock, setReleasedStock] = useState([]);

  useEffect(() => {
    getAllReleasedItems((response) => {
      console.log(response);
      setReleasedStock(response);
    });
  }, []);

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
            <th>Quantity Released</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {releasedStock.length > 0
            ? releasedStock.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.itemName}</td>
                    <td>{item.subCategory.name}</td>
                    <td>{formatMoney(item.itemQuantity)}</td>
                    <td>{formatMoney(item.itemPrice * item.itemQuantity)}</td>
                  </tr>
                );
              })
            : "No Stock Item Found"}
        </tbody>
      </table>
    </div>
  );
};

export default ReleasedStock;
