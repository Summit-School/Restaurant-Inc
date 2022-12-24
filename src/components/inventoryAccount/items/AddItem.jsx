import "./Item.css";
import { useState, useEffect } from "react";
import {
  addToInventory,
  getSubCategories,
} from "../../../api/firebase/inventory.api.ts";
import { toast } from "react-toastify";

const AddItem = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const [itemLoading, setItemLoading] = useState(false);

  useEffect(() => {
    getSubCategories((response) => {
      setAllCategory(response);
      setSubCategory(response.length > 0 ? response[0].id : "");
    });
  }, []);

  const addItemToStore = async (e) => {
    e.preventDefault();
    setItemLoading(true);

    const subcat = allCategory.find((catr) => {
      return catr.id === subCategory;
    });

    const itemData = {
      category: category,
      subCategory: subcat,
      itemName: itemName,
      itemPrice: itemPrice,
      itemQuantity: itemQuantity,
    };

    try {
      const response = await addToInventory(itemData);
      if (response) {
        toast.success("Item Added");
        setCategory("");
        setSubCategory("");
        setItemName("");
        setItemPrice("");
        setItemQuantity("");
        setItemLoading(false);
      }
    } catch (error) {
      setItemLoading(false);
      console.error(error);
      toast.error("Failed");
    }
  };

  return (
    <form className="add-item-to-inventory">
      <h3>Add Item To Inventory</h3>
      <div className="item-category">
        <select
          className="form-control mt-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Select Category</option>
          <option value="FOOD">Food</option>
          <option value="DRINKS">Drink</option>
        </select>

        <div className="item-category">
          <select
            className="form-control mt-2"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            {allCategory.length > 0
              ? allCategory.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })
              : "No Sub Categories Found"}
          </select>
        </div>
      </div>
      <div className="item-name">
        <input
          type="text"
          className="form-control"
          placeholder="Item name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="item-price">
        <input
          type="number"
          className="form-control"
          placeholder="Item price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
      </div>
      <div className="item-quantity">
        <input
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
      </div>
      <button className="add-item-btn" onClick={addItemToStore}>
        {itemLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddItem;
