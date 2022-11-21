import "./AddMenu.css";
import { useState } from "react";

const AddMenu = () => {
  const [showQuantity, setShowQuantity] = useState("");

  const handleChange = (e) => {
    setShowQuantity(e.target.value);
  };
  return (
    <form className="add-menu-item">
      <select onChange={(e) => handleChange(e)} className="form-control mt-2">
        <option>Select Category</option>
        <option value="food">Food</option>
        <option value="drink">Drink</option>
      </select>
      <input type="text" placeholder="Item name" className="form-control" />
      {showQuantity === "food" ? (
        ""
      ) : (
        <input type="number" placeholder="Quantity" className="form-control" />
      )}
      <input type="number" placeholder="Price" className="form-control" />

      <button>Submit</button>
    </form>
  );
};

export default AddMenu;
