import "./Categories.css";
import { useState } from "react";
import { addSubCategory } from "../../../api/firebase/inventory.api.ts";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [category, setCategory] = useState([]);
  const [catLoading, setCatLoading] = useState(false);

  const addCategory = async (e) => {
    e.preventDefault();
    setCatLoading(true);

    try {
      const response = await addSubCategory(category);
      if (response) {
        toast.success("Category Added");
        setCategory("");
        setCatLoading(false);
      }
    } catch (error) {
      setCatLoading(false);
      console.error(error);
      toast.error("Failed");
    }
  };
  return (
    <form className="add-cat-form">
      <div className="category-name">
        <input
          type="text"
          className="form-control"
          placeholder="Category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <button className="add-item-inventory" onClick={addCategory}>
        {catLoading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default AddCategory;
