import "./Categories.css";
import { useState, useEffect } from "react";
import { getSubCategories } from "../../../api/firebase/inventory.api.ts";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getSubCategories((response) => {
      setCategories(response);
    });
  }, []);

  return (
    <div className="all-inventory-categories">
      <h3>Categories</h3>
      <ul>
        {categories.length > 0
          ? categories.map((category) => <li>{category.name}</li>)
          : "No Categories Found"}
      </ul>
    </div>
  );
};

export default Categories;
