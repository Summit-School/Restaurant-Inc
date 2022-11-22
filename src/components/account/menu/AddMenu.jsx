import "./AddMenu.css";
import { useState } from "react";

const AddMenu = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const addMenuItem = (e) => {
    e.preventDefault();
    const itemData = {
      category,
      itemName,
      quantity,
      price,
    };

    console.log(itemData);
  };
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
        required
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      {category === "food" ? (
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
        required
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button onClick={addMenuItem}>Submit</button>
    </form>
  );
};

export default AddMenu;
