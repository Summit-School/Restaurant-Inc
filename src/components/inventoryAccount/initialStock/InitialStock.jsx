import "./InitialStock.css";
import { useState, useEffect } from "react";
import { getInventoryItems } from "../../../api/firebase/inventory.api.ts";

const InitialStock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    getInventoryItems((response) => {
      console.log(response);
      setStock(response);
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
            <th>Initial Quantity(Creates/Bags)</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0
            ? stock.map((item, index) => (
                <tr>
                  <td>{item.itemName}</td>
                  <td>{item.subCategory?.name}</td>
                  <td>{formatMoney(item.itemQuantity)}</td>
                  <td>{formatMoney(item.itemPrice)}</td>
                </tr>
              ))
            : "No Stock Item Found"}
        </tbody>
      </table>
    </div>
  );
};

export default InitialStock;
