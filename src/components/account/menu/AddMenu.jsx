import "./AddMenu.css";
import { useState } from "react";
import { addItemToMenu } from "../../../api/firebase/menu.api.ts";
import { toast } from "react-toastify";

const AddMenu = () => {
  const [category, setCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [inventory, setInventory] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const addMenuItem = async (e) => {
    e.preventDefault();
    setLoading(true);
    const itemData = {
      category,
      itemName,
      inventory,
      price,
    };

    try {
      const response = await addItemToMenu(itemData);
      if (response) {
        toast.success("Menu Item Added");
        setItemName("");
        setInventory("");
        setPrice("");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed");
      console.error(error);
    }
  };
  return (
    <form className="add-menu-item">
      <select onChange={(e) => handleChange(e)} className="form-control mt-2">
        <option>Select Category</option>
        <option value="FOOD">Food</option>
        <option value="DRINKS">Drink</option>
      </select>
      <input
        type="text"
        placeholder="Item name"
        className="form-control"
        required
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      {category === "FOOD" ? (
        ""
      ) : (
        <input
          type="number"
          placeholder="Quantiy In Stock"
          className="form-control"
          value={inventory}
          onChange={(e) => setInventory(e.target.value)}
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

      <button onClick={addMenuItem}>{loading ? "Loading..." : "Submit"}</button>
    </form>
  );
};

export default AddMenu;
