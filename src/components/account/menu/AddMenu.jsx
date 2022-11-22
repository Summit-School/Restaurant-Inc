import "./AddMenu.css";
import { useState } from "react";

const AddMenu = () => {
  const [showQuantity, setShowQuantity] = useState("");
  const [menuItem, setMenuItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    setShowQuantity(e.target.value);
  };

  const addMenuItem = () => {};
  return (
    <form className="add-menu-item">
      <select onChange={(e) => handleChange(e)} className="form-control mt-2">
        <option>Select Category</option>
        <option value="food">Food</option>
        <option value="drink">Drink</option>
      </select>
      <input
        type="text"
        placeholder="Item name"
        className="form-control"
        value={menuItem}
        onChange={(e) => setMenuItem(e.target.value)}
      />
      {showQuantity === "food" ? (
        ""
      ) : (
        <input
          type="number"
          placeholder="Quantity"
          className="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      )}
      <input
        type="number"
        placeholder="Price"
        className="form-control"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addMenuItem}>Submit</button>
    </form>
  );
};

export default AddMenu;
