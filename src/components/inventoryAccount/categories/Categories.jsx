import "./Categories.css";
import { useState, useEffect } from "react";
import {
  getSubCategories,
  deleteCategory,
} from "../../../api/firebase/inventory.api.ts";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getSubCategories((response) => {
      console.log(response);
      setCategories(response);
    });
  }, []);

  const deleteCat = async (categoryID) => {
    try {
      const response = await deleteCategory(categoryID);
      if (response) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="all-inventory-categories">
      <h3>Categories</h3>
      <ul>
        {categories.length > 0
          ? categories.map((category, index) => (
              <li key={index}>
                {category.name}{" "}
                <span className="delete-cat">
                  {" "}
                  <FaTimes size={10} onClick={() => deleteCat(category.id)} />
                </span>
              </li>
            ))
          : "No Categories Found"}
      </ul>
    </div>
  );
};

export default Categories;
