import "./InitialStock.css";
import { useState, useEffect } from "react";
import { getInventoryItems } from "../../../api/firebase/inventory.api.ts";
import EditStock from "../editStock/EditStock";
import DeleteStock from "../deleteStock/DeleteStock";

const Stock = () => {
  const [stock, setStock] = useState([]);
  const [editStock, setEditStock] = useState("");
  const [deleteStock, setDeleteStock] = useState("");

  useEffect(() => {
    getInventoryItems((response) => {
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
                  <td>{formatMoney(item.initialQuantity)}</td>
                  <td>{formatMoney(item.itemPrice)}</td>
                  <td>{formatMoney(item.itemPrice * item.initialQuantity)}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => setEditStock(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => setDeleteStock(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            : "No Stock Item Found"}
        </tbody>
      </table>
      <EditStock
        stock={editStock}
        show={!!editStock}
        onHide={() => setEditStock(false)}
      />
      <DeleteStock
        stock={deleteStock}
        show={!!deleteStock}
        onHide={() => setDeleteStock(false)}
      />
    </div>
  );
};

export default Stock;
