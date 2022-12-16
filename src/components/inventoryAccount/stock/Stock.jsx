import "./Stock.css";
import { useState, useEffect } from "react";
import { getInventoryItems } from "../../../api/firebase/inventory.api.ts";
import ReleasedStock from "../releaseStock/ReleaseStock";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [releaseStock, setReleaseStock] = useState("");

  useEffect(() => {
    getInventoryItems((response) => {
      let sorted = response.sort();
      console.log(sorted);
      setStock(response.sort());
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
            <th>Quantity</th>
            <th>Single Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0
            ? stock.map((item, index) => (
                <tr key={index}>
                  <td>{item.itemName}</td>
                  <td>{item.subCategory?.name}</td>
                  <td>{formatMoney(item.itemQuantity)}</td>
                  <td>{formatMoney(item.itemPrice)}</td>
                  <td>{formatMoney(item.itemPrice * item.itemQuantity)}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setReleaseStock(item)}
                    >
                      Realease
                    </button>
                  </td>
                </tr>
              ))
            : "No Stock Item Found"}
        </tbody>
      </table>
      <ReleasedStock
        stock={releaseStock}
        show={!!releaseStock}
        onHide={() => setReleaseStock(false)}
      />
    </div>
  );
};

export default Stock;
